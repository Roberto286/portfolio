---
title: "ZSP: A Zero-Dependency Node.js Framework"
date: 2026-04-04
hero: images/posts-heros/zsp.png
description: "How much can you do with Node.js without external dependencies? I created ZSP, a backend framework that relies solely on the native http module, and discovered that maybe we're depending too much on other people's code."
---

Imagine building a complete REST API, with routing, body parsing, and validation, by installing just one library:

```bash
npm i @roberto286/zsp
```

That's it. No other dependencies. No bloated `node_modules` folder weighing hundreds of megabytes. Just what you just installed.

Sounds like a provocation? That's exactly what it is.

## The npm install Syndrome

Every JavaScript developer knows the ritual:

```bash
git clone <repo>
npm install
# ...wait while it downloads half the internet...
```

It's become so normal that we don't even notice anymore. But let's pause for a second: **when was the last time you verified the code you're executing?**

That "utility" library you installed to save yourself 20 lines of code brings with it 15 transitive dependencies. Each of those dependencies is maintained by someone you don't know. Every `npm install` is an act of collective trust on an industrial scale.

And what if I told you that maybe you don't need it?

## The Challenge

One day, eager to test my JavaScript knowledge, drawn to the ever-increasing built-in features of Node and inspired by challenge videos like [this one](https://www.youtube.com/watch?v=b_WGoPaNPMY&t=65s), I asked myself: would it be possible to create a useful backend framework with **zero external dependencies**?

The answer is yes. And so [**ZSP**](https://www.npmjs.com/package/@roberto286/zsp) (Zero Spaccato - "Absolute Zero") was born: a complete backend framework that requires **no dependencies** other than itself. It doesn't use Express, it doesn't use Fastify, it doesn't use anything except Node.js's native `http` module.

>  **Necessary disclaimer**: ZSP is a stylistic exercise, a technical provocation. You install it as a dependency, but it doesn't require any others. Don't use it in production (even though it would technically work).

## What is ZSP?

ZSP is a minimalist backend framework that extends the [Server](https://nodejs.org/api/http.html#class-httpserver) class from Node.js's native `http` module.

The goal was to create something practical using only what Node.js offers out-of-the-box: handling routing with regular expressions, parsing JSON bodies by reading streams directly, managing dynamic URL parameters (`/users/:id`), validating input. All without importing anything from the npm registry.

For those who have used Express, the API will feel familiar. But the implementation is completely different: every feature is built from scratch using only Node's native APIs.

## What Does "Zero Dependencies" Mean?

In the JavaScript world, "zero dependencies" is almost an oxymoron. Most libraries carry with them a tree of transitive dependencies that explodes rapidly.

ZSP works differently: once installed, it doesn't download anything else. Zero transitive dependencies. Zero sub-dependencies. Just the code you chose to install.

Everything is based solely on Node.js's `http` module. No other packages. No bloated `node_modules`.

## The Architecture in 5 Minutes

### The Router: Minimal Elegance

Instead of external libraries, ZSP uses a simple `Map` and native regex:

```javascript
// Register /users/:id
// ZSP creates: /^users\/([^/]+)$/
// Automatically extracts parameters
```

No overhead, no black magic. One regex does all the work.

### The Body Parser: Native Streams

```javascript
const parseBody = (req) => new Promise((resolve) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => resolve(JSON.parse(body)));
});
```

It's not revolutionary, but it works. And it weighs exactly zero dependencies.

### Response Helper: Minimalist Convenience

```javascript
res.send(data, statusCode = 200) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}
```

A simple method for sending JSON responses, added directly to the native response object.

### Schema Validation: Built-in Protection

ZSP includes a built-in schema validator. It's not full JSON Schema, but it checks types and required fields:

```javascript
const schema = {
  name: Types.String,
  age: Types.Number,
  email: Types.String // required by default
};

// If a field is missing or the type is wrong → 400 Bad Request
```

## See It in Action

```javascript
import { getServer, Types } from '@roberto286/zsp';

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
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  res.send({ created: true, name, email }, 201);
});

// With built-in schema validation
app.post('/register', {
  username: Types.String,
  password: Types.String,
  age: Types.Number
}, async (req, res) => {
  // If you get here, the body is validated
  res.send({ registered: true });
});

app.listen(3000);
```

Look at your `package.json`:

```json
{
  "dependencies": {
    "@roberto286/zsp": "^1.0.0"
  }
}
```

Just this. Nothing else.

## The Problem You Don't Want to See

But there's another aspect, more troubling than the size of `node_modules`. Let's talk about **security**.

When you run `npm install`, you're executing code from thousands of strangers on your computer. And often, in your production environments.

Remember these incidents?

- **[left-pad](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm)**: 11 lines of code removed, thousands of builds broken
- **[event-stream](https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident)**: backdoor that stole bitcoin
- **[colors.js](https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/)**: sabotage that inserted infinite glitches

These aren't exceptions. They're symptoms of a structural problem: **every dependency is a potential attack vector.**

In fintech, healthcare, public sector — where software supply chain is critical — we continue to import code from repositories we don't control, from maintainers we don't know.

ZSP is a provocation, but also a practical demonstration: **less code = less attack surface.** Zero external dependencies = zero vectors from the supply chain.

## Why JavaScript is Different

There's a historical reason why we've reached this point. JavaScript was born for the browser, with an intentionally minimal standard library: fewer bytes to transfer.

Node.js inherited this philosophy. But on the server, the needs are different: files, HTTP, validation, complex dates. And here's where a gap emerges that Python ("batteries included") or Go (monolithic stdlib) don't have.

Node is improving: native `fetch` in Node 18, `fs/promises`, continuous progress. But the gap remains.

ZSP doesn't criticize Node. It demonstrates that **today, with the APIs that Node offers, we can do much more than we think.**

## The Question You Need to Ask Yourself

I'm not saying to throw away existing frameworks and rewrite everything in ZSP. I'm saying that maybe, the next time you add a dependency, you could ask yourself:

> *"Do I really need this? Can I make do with what I already have?"*

Sometimes the answer will be yes, and that's fine. Other times you'll discover that the language and platform already give you everything you need.

And that discovery has a special flavor.

## What About ZSP Now?

I don't have serious plans for ZSP. It remains what it is: a provocation, an experiment, an answer to a personal curiosity.

But if anyone wants to take it, fork it, turn it into something more, here are some ideas:

- **TypeScript**: Migrate the codebase to TypeScript. Adding types is a great exercise for learning to type without dependencies. And now it's even easier: Node 22+ supports TypeScript natively with no need for external transpilers
- **Test suite**: Writing a test suite from scratch using `node --test` (Node's native test runner) is a great way to learn how runners work under the hood, and it's easier than ever without Jest or Mocha
- **WebSocket**: Implementing a WebSocket server from scratch using only the native `net` module is an advanced exercise to understand the WS protocol, or creating a minimalist wrapper around a custom implementation without external dependencies
- **Middleware chain**: Adding support for Express-style middleware (`app.use()`) while maintaining the zero-deps approach

This isn't a roadmap. Just ideas for those who want to tinker.

## Resources

- [ZSP on npm](https://www.npmjs.com/package/@roberto286/zsp)
- [Source code on GitHub](https://github.com/Roberto286/zsp)
- [README with examples](https://github.com/Roberto286/zsp/blob/main/README.md)

---

*How simple can your next side project really be?*
