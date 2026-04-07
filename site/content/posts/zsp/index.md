---
title: "npm install è un atto di fiducia cieca. Ho provato a farne a meno."
date: 2026-04-04
draft: true
description: "Ogni volta che fai npm install, affidi il tuo sistema a migliaia di sconosciuti. Ho costruito ZSP, un framework Node.js con zero dipendenze, per vedere se ne potevo fare a meno."
images:
  - hero.png
---

Quando esegui `npm install` in un progetto moderno, stai facendo qualcosa di straordinario: **affidi il tuo computer — e spesso i dati dei tuoi utenti — a migliaia di sconosciuti.**

È un atto di fiducia collettiva su scala industriale. Una libreria "utility" da 20 righe porta con sé 15 dipendenze transitive. Ognuna mantenuta da qualcuno che non conosci. E prima che tu possa usarla, il suo codice gira sul tuo sistema con gli stessi privilegi dei tuoi script.

Ti ricordi cosa è successo con [event-stream](https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident)? Un singolo pacchetto compromesso ha rubato bitcoin da applicazioni in produzione. [left-pad](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm)? 11 righe di codice rimosse hanno rotto migliaia di build. [colors.js](https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/)? Un maintainer ha inserito glitch infiniti nei log di produzione.

Non sono eccezioni. Sono sintomi di un problema strutturale: **ogni dipendenza è un potenziale vettore d'attacco.**

Questo mi ha portato a una domanda: quanto potrei fare con Node.js senza installare nulla da npm?

## L'esperimento

Un giorno, voglioso di testare la mia conoscenza di JavaScript, attratto dalle sempre più numerose feature già built-in di Node e ispirato da video challenge come [questo](https://www.youtube.com/watch?v=b_WGoPaNPMY&t=65s), mi sono chiesto: sarebbe possibile creare un framework backend completo usando **solo** il modulo `http` nativo?

Niente Express. Niente Fastify. Niente dipendenze esterne di alcun tipo.

La risposta è sì. E così è nato [**ZSP**](https://www.npmjs.com/package/@roberto286/zsp) (Zero Spaccato): un framework backend con routing, body parsing, validazione e parametri dinamici — tutto costruito da zero usando solo le API che Node.js mette già a disposizione.

## Cosa fa ZSP?

ZSP estende la classe [Server](https://nodejs.org/api/http.html#class-httpserver) del modulo nativo `http` di Node.js, aggiungendo un sottile strato di astrazione per gestire le cose che servono in un'API moderna.

Ecco come si usa:

```javascript
import { getServer } from '@roberto286/zsp';

const app = getServer();

// GET semplice
app.get('/hello', (req, res) => {
  res.send({ message: 'Ciao dal mondo senza dipendenze!' });
});

// Parametri dinamici
app.get('/users/:id', (req, res) => {
  res.send({ userId: req.params.id });
});

// POST con body parsing automatico
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.send({ created: true, name, email }, 201);
});

// Con validazione schema
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

L'API è familiare se hai usato Express, ma l'implementazione è completamente diversa: ogni feature è costruita usando solo Node.js nativo.

Il risultato? Un `package.json` che contiene esattamente questo:

```json
{
  "dependencies": {
    "@roberto286/zsp": "^1.0.0"
  }
}
```

Una sola voce. Niente albero di dipendenze nascosto.

## Come funziona sotto il cofano

### Il Router: Map + Regex

Il routing di ZSP usa una `Map` per memorizzare le rotte e regex native per il matching:

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

I pattern vengono convertiti in regex al momento della registrazione. Quando arriva una richiesta, il router scorre la `Map` e cerca il primo match. I parametri dinamici (come `:id`) vengono estratti e popolati in `req.params`.

### Il Body Parser: Buffer nativi

Invece di `body-parser`, ZSP implementa il proprio parser usando gli stream nativi di Node:

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

Accumula i chunk in un array, li concatena con `Buffer.concat()` e tenta il parsing JSON. Se fallisce, restituisce il body come stringa raw.

### Response Helper: estensione nativa

Il metodo `res.send()` è aggiunto direttamente all'oggetto response di Node:

```javascript
export const enhanceResponse = (res) => {
    res.send = (data, statusCode = 200) => {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    };
}
```

Una sola funzione che imposta l'header, lo status code e serializza il JSON.

### Validazione: schema minimalista

Il validatore controlla che il body rispetti lo schema definito:

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

Se la validazione fallisce, ZSP risponde automaticamente con 400 Bad Request prima che il tuo handler venga eseguito.

### Il Server: tutto insieme

Il cuore di ZSP è una classe che estende `http.Server`:

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

Per ogni richiesta: applica i middleware (response enhancer + body parser), trova la rotta, valida lo schema se presente, esegue l'handler.

## Perché tutto questo è importante

Non sto dicendo che dovresti usare ZSP in produzione (anche se funzionerebbe). Sto dicendo che forse, la prossima volta che aggiungi una dipendenza, dovresti chiederti: *"Ne ho davvero bisogno? Posso farcela con quello che ho già?"*

La verità è che Node.js è diventato incredibilmente potente. `fetch` è nativo da Node 18. `fs/promises` gestisce file senza callback hell. Le Web Streams sono stabilizzate. Eppure continuiamo ad aggiungere strati di astrazione per abitudine, non per necessità.

In fintech, healthcare, settore pubblico — contesti dove la supply chain del software dovrebbe essere trattata con la stessa attenzione della sicurezza fisica — importiamo codice da maintainer che non conosciamo, con licenze che non leggiamo.

ZSP è una dimostrazione pratica: **meno codice significa meno superficie d'attacco.**

## La standard library che non abbiamo

C'è una ragione storica per cui siamo arrivati a questo punto. JavaScript è nato per il browser, con una standard library intenzionalmente minimale. Node.js ha ereditato questa filosofia.

Ma sul server le esigenze sono diverse: file, HTTP, validazione, date complesse. Python ha "batteries included". Go ha una stdlib monolitica. JavaScript, per sua natura storica, non ha avuto questo lusso.

Le cose stanno migliorando — `fetch` nativo, progressi continui — ma il gap rimane. ZSP non critica Node. Dimostra che con le API attuali si può fare più di quanto pensiamo.

## Provalo, forkalo, rompilo

Il codice sorgente è su [GitHub](https://github.com/Roberto286/zsp), il pacchetto su [npm](https://www.npmjs.com/package/@roberto286/zsp).

> ZSP è un esperimento che funziona davvero. Va installato come dipendenza, ma non ne richiede altre. Non usarlo in produzione... a meno che tu non voglia davvero farlo.

Prova a costruirci qualcosa. Guarda quante volte ti viene istintivo fare `npm install` per risolvere un problema che Node.js potrebbe già gestire. Quella consapevolezza ha valore.

---

**Quando hai verificato l'ultima volta il codice che stai eseguendo?**
