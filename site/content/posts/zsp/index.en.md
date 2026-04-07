---
title: "npm install is an act of blind trust. I tried to do without it."
date: 2026-04-04
draft: true
description: "Every time you run npm install, you're entrusting your system to thousands of strangers. I built ZSP, a zero-dependency Node.js framework, to see if I could do without it."
images:
  - hero.png
---

When you run `npm install` in a modern project, you're doing something extraordinary: **you're entrusting your computer — and often your users' data — to thousands of strangers.**

It's an act of collective trust on an industrial scale. A 20-line "utility" library brings with it 15 transitive dependencies. Each one maintained by someone you don't know. And before you can use it, its code runs on your system with the same privileges as your scripts.

Remember what happened with [event-stream](https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident)? A single compromised package stole bitcoin from production applications. [left-pad](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm)? 11 lines of removed code broke thousands of builds. [colors.js](https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/)? A maintainer inserted infinite glitches into production logs.

These aren't exceptions. They're symptoms of a structural problem: **every dependency is a potential attack vector.**

This led me to a question: how much could I do with Node.js without installing anything from npm?

## The Experiment

One day, eager to test my JavaScript knowledge, drawn to the ever-increasing built-in features of Node and inspired by challenge videos like [this one](https://www.youtube.com/watch?v=b_WGoPaNPMY&t=65s), I asked myself: would it be possible to create a complete backend framework using **only** the native `http` module?

No Express. No Fastify. No external dependencies of any kind.

The answer is yes. And so [**ZSP**](https://www.npmjs.com/package/@roberto286/zsp) (Zero Spaccato - "Absolute Zero") was born: a backend framework with routing, body parsing, validation, and dynamic parameters — all built from scratch using only the APIs that Node.js already provides.

## What does ZSP do?

ZSP extends the [Server](https://nodejs.org/api/http.html#class-httpserver) class from Node.js's native `http` module, adding a thin layer of abstraction to handle what you need in a modern API.

Here's how you use it:

```javascript
import { getServer } from '@roberto286/zsp';

const app = getServer();

// Simple GET
app.get('/hello', (req, res) => {
  res.send({ message: 'Hello from the dependency-free world!' });
});

// Dynamic parameters
app.get('/users/:id', (req, res) => {
  res.send({ userId: req.params.id });
});

// POST with automatic body parsing
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.send({ created: true, name, email }, 201);
});

// With schema validation
app.post('/register', (req, res) => {
  res.send({ registered: true });
}, {
  schema: {
    username: 'string',
    password: 'string',
    age: 'number'
  }
});

app.listen(3000);
```

The API feels familiar if you've used Express, but the implementation is completely different: every feature is built using only native Node.js.

The result? A `package.json` that contains exactly this:

```json
{
  "dependencies": {
    "@roberto286/zsp": "^1.0.0"
  }
}
```

Just one entry. No hidden dependency tree.

## How it works under the hood

### The Router: Map + Regex

ZSP's routing uses a `Map` to store routes and native regex for matching:

```javascript
import * as url from "node:url";

export class Router {
  static routes = new Map();

  static register(path, method, handler, options) {
    const parts = path.split("/").filter(Boolean);
    const params = Router.extractParams(path);
    const regex = new RegExp(
      "^" +
        parts
          .map((part) => (part.startsWith(":") ? "([^/]+)" : part))
          .join("/") +
        "$",
    );

    Router.routes.set(`${method}:${path}`, {
      method,
      regex,
      params,
      handler,
      path,
      options,
    });
  }

  static extractParams(path) {
    const params = [];
    const parts = path.split("/").filter(Boolean);
    parts.forEach((part, index) => {
      if (part.startsWith(":")) {
        params.push({
          name: part.slice(1),
          index,
        });
      }
    });
    return params;
  }

  static findRoute(req) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname.substring(1);
    const method = req.method;

    for (const [_, route] of Router.routes) {
      if (route.method === method) {
        const match = path.match(route.regex);
        if (match) {
          const params = Router.extractParams(route.path, path);
          for (const param of params) {
            req.params = req?.params || {};
            req.params[param.name] = match[1];
          }
          return route;
        }
      }
    }
  }
}
```

Patterns are converted to regex at registration time. When a request arrives, the router iterates through the `Map` and finds the first match. Dynamic parameters (like `:id`) are extracted and populated into `req.params`.

### The Body Parser: native Buffers

Instead of `body-parser`, ZSP implements its own parser using Node's native streams:

```javascript
export const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = [];
        req.on('error', reject)
           .on('data', chunk => body.push(chunk))
           .on('end', () => {
               body = Buffer.concat(body).toString();
               try {
                   resolve(JSON.parse(body));
               }catch(e) {
                   resolve(body);
               }
           });
    });
}
```

It accumulates chunks in an array, concatenates them with `Buffer.concat()`, and attempts JSON parsing. If it fails, it returns the body as a raw string.

### Response Helper: native extension

The `res.send()` method is added directly to Node's response object:

```javascript
export const enhanceResponse = (res) => {
    res.send = (data, statusCode = 200) => {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    };
}
```

A single function that sets the header, status code, and serializes the JSON.

### Validation: minimalist schema

The validator checks that the body matches the defined schema:

```javascript
import { Types } from "../../enums/types.enum.js";

export const validateSchema = (body, schema) => {
  for (const key of Object.keys(body)) {
    if (typeof schema === Types.OBJECT && !Object.hasOwn(schema, key)) {
      return false;
    }

    const instance = new schema();
    if (
      !Object.getOwnPropertyNames(instance).every((k) =>
        Object.keys(body).includes(k)
      )
    ) {
      return false;
    }

    if (
      instance[key] === Types.OBJECT ||
      typeof instance[key] === Types.FUNCTION
    ) {
      return validateSchema(body[key], instance[key]);
    }
  }
  return true;
};
```

If validation fails, ZSP automatically responds with 400 Bad Request before your handler is executed.

### The Server: all together

The heart of ZSP is a class that extends `http.Server`:

```javascript
import { Server } from "http";
import { Router } from "./router.js";
import { HttpMethods } from "../../enums/http-methods.enum.js";
import { parseBody } from "./body-parser.js";
import { enhanceResponse } from "./response-enhancer.js";
import { validateSchema } from "./schema-validator.js";

class CustomServer extends Server {
  async #handleRequest(req, res) {
    try {
      await this.#applyMiddlewares(req, res);
      const { handler, options = {} } = Router.findRoute(req) || {};
      const { schema } = options;

      if (schema && !validateSchema(req.body, schema)) {
        return res.send("Bad request", 400);
      }

      if (handler) {
        await handler(req, res);
      } else {
        res.send("Resource not found", 404);
      }
    } catch (error) {
      console.error(error);
      res.send("Internal server error", 500);
    }
  }

  async #applyMiddlewares(req, res) {
    enhanceResponse(res);
    req.body = await parseBody(req);
  }

  #registerHttpMethods() {
    Object.values(HttpMethods).forEach((method) => {
      this[method.toLowerCase()] = (path, handler, schema) => {
        Router.register(path, method, handler, schema);
      };
    });
  }
}
```

For each request: apply middleware (response enhancer + body parser), find the route, validate schema if present, execute the handler.

## Why all this matters

I'm not saying you should use ZSP in production (though it would work). I'm saying that maybe, the next time you add a dependency, you should ask yourself: *"Do I really need this? Can I make do with what I already have?"*

The truth is that Node.js has become incredibly powerful. `fetch` is native since Node 18. `fs/promises` handles files without callback hell. Web Streams are stabilized. Yet we keep adding layers of abstraction out of habit, not necessity.

In fintech, healthcare, the public sector — contexts where software supply chain should be treated with the same attention as physical security — we import code from maintainers we don't know, with licenses we don't read.

ZSP is a practical demonstration: **less code means less attack surface.**

## The standard library we don't have

There's a historical reason we've reached this point. JavaScript was born for the browser, with an intentionally minimal standard library. Node.js inherited this philosophy.

But on the server, needs are different: files, HTTP, validation, complex dates. Python has "batteries included". Go has a monolithic stdlib. JavaScript, due to its historical nature, hasn't had this luxury.

Things are improving — native `fetch`, continuous progress — but the gap remains. ZSP doesn't criticize Node. It demonstrates that with current APIs, we can do more than we think.

## Try it, fork it, break it

The source code is on [GitHub](https://github.com/Roberto286/zsp), the package on [npm](https://www.npmjs.com/package/@roberto286/zsp).

> ZSP is an experiment that actually works. You install it as a dependency, but it doesn't require any others. Don't use it in production... unless you really want to.

Try building something with it. See how many times you instinctively reach for `npm install` to solve a problem that Node.js might already handle. That awareness has value.

---

**When was the last time you verified the code you're executing?**
