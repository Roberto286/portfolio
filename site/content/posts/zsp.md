---
title: "ZSP: Un Framework Node.js con Zero Dipendenze"
date: 2026-04-04
hero: images/posts-heros/zsp.png
images:
  - images/posts-heros/zsp.png
description: "Quanto puoi fare con Node.js senza dipendenze esterne? Ho creato ZSP, un framework backend che si appoggia solo sul modulo http nativo, e ho scoperto che forse stiamo dipendendo troppo da codice altrui."
---

Immagina di creare un'API REST completa, con routing, body parsing e validazione, installando una sola libreria:

```bash
npm i @roberto286/zsp
```

E basta. Nessuna altra dipendenza. Nessun `node_modules` gonfio di centinaia di megabyte. Solo quello che hai appena installato.

Suona come una provocazione? Esattamente quello che è.

## La sindrome dell'npm install

Ogni sviluppatore JavaScript conosce il rituale:

```bash
git clone <repo>
npm install
# ...attendi mentre scarica mezza internet...
```

È diventato così normale che non ci facciamo più caso. Ma fermiamoci un secondo: **quando hai verificato l'ultima volta il codice che stai eseguendo?**

Quella libreria "utility" che hai installato per risparmiarti 20 righe di codice porta con sé 15 dipendenze transitive. Ognuna di quelle dipendenze è mantenuta da qualcuno che non conosci. Ogni `npm install` è un atto di fiducia collettiva su scala industriale.

E se ti dicessi che forse non ne hai bisogno?

## La sfida

Un giorno, voglioso di testare la mia conoscenza di JavaScript, attratto dalle sempre più numerose feature già built-in di Node e ispirato da video challenge come [questo](https://www.youtube.com/watch?v=b_WGoPaNPMY&t=65s), mi sono chiesto: sarebbe possibile creare un framework backend utile con **zero dipendenze esterne**?

La risposta è sì. E così è nato [**ZSP**](https://www.npmjs.com/package/@roberto286/zsp) (Zero Spaccato): un framework backend completo che non richiede **nessuna dipendenza** oltre a se stesso. Non usa Express, non usa Fastify, non usa nulla se non il modulo `http` nativo di Node.js.

>  **Disclaimer necessario**: ZSP è un esercizio di stile, una provocazione tecnica. Va installata come dipendenza, ma non ne richiede altre. Non usarla in produzione (anche se tecnicamente funzionerebbe).

## Cosa è ZSP?

ZSP è un framework backend minimalista che estende la classe [Server](https://nodejs.org/api/http.html#class-httpserver) del modulo nativo `http` di Node.js.

L'obiettivo era creare qualcosa di pratico usando solo quello che Node.js offre out-of-the-box: gestire il routing con espressioni regolari, parsare i body JSON leggendo direttamente gli stream, gestire parametri dinamici nelle URL (`/users/:id`), validare input. Tutto senza importare nulla dal registry npm.

Per chi ha già usato Express, l'API risulterà familiare. Ma l'implementazione è completamente diversa: ogni feature è costruita da zero usando solo le API native di Node.

## Cosa significa "zero dipendenze"?

Nel mondo JavaScript, "zero dipendenze" è quasi un ossimoro. La maggior parte delle librerie porta con sé un albero di dipendenze transitive che esplode rapidamente.

ZSP funziona diversamente: una volta installata, non scarica null'altro. Zero dipendenze transitive. Zero sub-dependency. Solo il codice che hai scelto di installare.

Tutto si basa sul solo modulo `http` di Node.js. Nessun altro pacchetto. Nessun `node_modules` gonfio.

## L'architettura in 5 minuti

### Il Router: eleganza minimale

Invece di librerie esterne, ZSP usa una `Map` semplice e regex native:

```javascript
// Registri /users/:id
// ZSP crea: /^users\/([^/]+)$/
// Estrae automaticamente i parametri
```

Niente overhead, niente magia nera. Una regex fa tutto il lavoro.

### Il Body Parser: stream nativi

```javascript
const parseBody = (req) => new Promise((resolve) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => resolve(JSON.parse(body)));
});
```

Non è rivoluzionario, ma funziona. E pesa esattamente zero dipendenze.

### Response helper: comodità minimalista

```javascript
res.send(data, statusCode = 200) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}
```

Un metodo semplice per inviare risposte JSON, aggiunto direttamente all'oggetto response nativo.

### Schema Validation: protezione integrata

ZSP include un validatore di schema built-in. Non è JSON Schema completo, ma controlla tipi e campi obbligatori:

```javascript
const schema = {
  name: Types.String,
  age: Types.Number,
  email: Types.String // richiesto di default
};

// Se manca un campo o il tipo è sbagliato → 400 Bad Request
```

## Vediamolo in azione

```javascript
import { getServer, Types } from '@roberto286/zsp';

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
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  res.send({ created: true, name, email }, 201);
});

// Con validazione schema integrata
app.post('/register', {
  username: Types.String,
  password: Types.String,
  age: Types.Number
}, async (req, res) => {
  // Se arrivi qui, il body è validato
  res.send({ registered: true });
});

app.listen(3000);
```

Guarda il tuo `package.json`:

```json
{
  "dependencies": {
    "@roberto286/zsp": "^1.0.0"
  }
}
```

Solo questo. Nient'altro.

## Il problema che non vuoi vedere

Ma c'è un altro aspetto, più inquietante della dimensione di `node_modules`. Parliamo di **sicurezza**.

Quando fai `npm install`, stai eseguendo codice di migliaia di sconosciuti sul tuo computer. E spesso, nei tuoi ambienti di produzione.

Ricordi questi incidenti?

- **[left-pad](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm)**: 11 righe di codice rimosse, migliaia di build rotte
- **[event-stream](https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident)**: backdoor che rubava bitcoin
- **[colors.js](https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/)**: sabotaggio che inseriva glitch infiniti

Non sono eccezioni. Sono sintomi di un problema strutturale: **ogni dipendenza è un potenziale vettore d'attacco.**

In fintech, healthcare, settore pubblico — dov'è fondamentale la supply chain del software — continuiamo a importare codice da repository che non controlliamo, da maintainer che non conosciamo.

ZSP è una provocazione, ma anche una dimostrazione pratica: **meno codice = meno superficie d'attacco.** Zero dipendenze esterne = zero vettori dalla supply chain.

## Perché JavaScript è diverso

C'è una ragione storica per cui siamo arrivati a questo punto. JavaScript è nato per il browser, con una standard library intenzionalmente minimale: meno bytes da trasferire.

Node.js ha ereditato questa filosofia. Ma sul server le esigenze sono diverse: file, HTTP, validazione, date complesse. E qui emerge un vuoto che Python ("batteries included") o Go (stdlib monolitica) non hanno.

Node sta migliorando: `fetch` nativo in Node 18, `fs/promises`, progressi continui. Ma il gap rimane.

ZSP non critica Node. Dimostra che **oggi, con le API che Node offre, possiamo fare molto di più di quanto pensiamo.**

## La domanda che ti dovresti fare

Non sto dicendo di buttare i framework esistenti e riscrivere tutto in ZSP. Sto dicendo che forse, la prossima volta che aggiungi una dipendenza, potresti chiederti:

> *"Ne ho davvero bisogno? Posso farcela con quello che ho già?"*

A volte la risposta sarà sì, e va bene. Altre volte scoprirai che il linguaggio e la piattaforma ti danno già tutto ciò che serve.

E quella scoperta ha un sapore speciale.

## E ZSP ora?

Non ho piani seri per ZSP. Rimane quello che è: una provocazione, un esperimento, una risposta a una curiosità personale.

Ma se qualcuno volesse prenderlo, forkarlo, trasformarlo in qualcosa di più, ecco qualche spunto:

- **TypeScript**: Migrare la codebase a TypeScript. Aggiungere i tipi è un ottimo esercizio per imparare a tipizzare senza dipendenze. E ora è ancora più facile: Node 22+ supporta TypeScript nativamente senza bisogno di transpiler esterni
- **Test suite**: Scrivere una test suite da zero usando `node --test` (il test runner nativo di Node) è un ottimo modo per imparare come funzionano i runner sotto il cofano, ed è più facile che mai senza Jest o Mocha
- **WebSocket**: Implementare un server WebSocket da zero usando solo il modulo `net` nativo è un esercizio avanzato per capire il protocollo WS, oppure creare un wrapper minimalista attorno a un'implementazione custom senza dipendenze esterne
- **Middleware chain**: Aggiungere supporto per middleware stile Express (`app.use()`) mantenendo l'approccio zero-deps

Non è una roadmap. Solo idee per chi ha voglia di smanettare.

## Risorse

-  [ZSP su npm](https://www.npmjs.com/package/@roberto286/zsp)
-  [Codice sorgente su GitHub](https://github.com/Roberto286/zsp)
-  [README con esempi](https://github.com/Roberto286/zsp/blob/main/README.md)

---

*Quanto può essere semplice davvero il tuo prossimo side project?*
