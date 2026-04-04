---
title: "ZSP"
date: 2026-04-04
hero: images/posts-heros/zsp.png
---

Chi sviluppa con Javascript/Typescript lo sa bene. Ogni progetto, anche un
singolo [ḧello world](https://it.wikipedia.org/wiki/Hello_world), richiede
decine (facciamo anche migliaia) di dipendenze.

É un meccanismo ormai talmente radicato che non ci facciamo piú caso.

1. git clone
2. npm i

Ed ecco che centinaia di megabyte vengono scaricati sulla tua macchina. Migliaia
di righe di codice a te sconosciuto (opensource, per caritá, ma chi di noi si é
mai letto il codice di un axios/express/[inserire qui qualsiali libreria js]?)
e, aggiungo io, spesso superfluo, solo per scrivere l'ennesimo side project che
abbandonerai dopo 1 settimana.

Ci siamo passati tutti, me compreso. Un giorno, peró, voglioso di testare la mia
conoscenza di Javascript, attratto dalle sempre piú numerose feature giá
built-in di Node
mi sono chiesto: sarebbe possibile creare un framework backend simile ad
[Express](https://expressjs.com/) con ZERO dipendenze?

La risposta sembra essere si e ció ha dato vita a [ZSP](https://www.npmjs.com/package/@roberto286/zsp).

Come citato nel [README](https://github.com/Roberto286/zsp/blob/main/README.md)
ZSP sta per `zero spaccato` per rimarcare il concetto che questa libreria non ha
bisogno di dipendenze esterne per funzionare

---

ATTENZIONE: ZSP vuole essere una provocazione, un esercizio di stile. **NON** é
e **NON** sará mai intesa per l'utilizzo in produzione

---

## Cosa offre ZSP?

Come detto precedentemente, l'obiettivo era quello di offrire una API molto
simile a quella di Express. In modo da essere familiare a chi ha giá usato
Javascript sul backend.

Per farlo ho costruito una classe che estendesse la classe
[Server](https://nodejs.org/api/http.html#class-httpserver) del modulo http di
Node.

Avevo bisogno di:

1. Un sistema che mi permettesse a runtime di registrare le rotte definite dall'utente
2. Un metodo che intercettasse le richieste in entrata e le smistasse verso il giusto handler
3. Un parser per i body JSON senza dipendenze esterne come `body-parser`
4. Un sistema di validazione degli input integrato
5. La gestione dei parametri dinamici nelle URL (quella bella sintassi `/users/:id` che tanto ci piace)

Tutto questo, ricordiamolo, **senza installare nulla**. Solo Node.js e il suo modulo `http` nativo.

## Come funziona?

L'architettura di ZSP è sorprendentemente semplice, ed è proprio questo il bello. La classe principale estende `http.Server` di Node.js e aggiunge un sottile strato di astrazione che ti fa dimenticare di stare lavorando con il modulo http grezzo.

### Il Router: cuore pulsante del sistema

Il router utilizza una `Map` per memorizzare le rotte come coppie chiave-valore nel formato `method:path`. La magia sta nel modo in cui gestisce i parametri dinamici:

```javascript
// Quando registri una rotta come /users/:id
// ZSP la converte in una regex: ^users/([^/]+)$
// Estrae automaticamente il parametro dalla URL
```

Questo approccio è elegante perché non richiede librerie esterne per il routing. Una semplice espressione regolare fa tutto il lavoro sporco, e l'overhead è praticamente nullo.

### Il Body Parser: leggere lo stream

Invece di appoggiarsi a `body-parser`, ZSP implementa il proprio parser che raccoglie i chunk dallo stream della richiesta e li ricostruisce:

```javascript
const bodyParser = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve(body); // fallback a stringa raw
      }
    });
  });
};
```

Niente di rivoluzionario, ma funziona. E pesa zero dipendenze.

### Response Enhancer: la comodità di res.send()

Una delle cose più comode di Express è poter chiamare `res.send()` senza preoccuparsi di settare headers e serializzare JSON. ZSP aggiunge questo metodo automaticamente a ogni risposta:

```javascript
res.send(data, statusCode = 200) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}
```

Piccola, utile, essenziale.

### Schema Validation: proteggersi dai dati sporchi

ZSP include un validatore di schema minimalista ma efficace. Non è JSON Schema completo, ma controlla tipi e campi obbligatori:

```javascript
const schema = {
  name: Types.String,
  age: Types.Number,
  email: Types.String // richiesto di default
};

// Se manca un campo o il tipo è sbagliato → 400 Bad Request
```

## Vediamo del codice concreto

Ecco come si usa ZSP nella pratica:

```javascript
import { getServer, Types } from '@roberto286/zsp';

const app = getServer();
const PORT = 3000;

// GET semplice
app.get('/hello', (req, res) => {
  res.send({ message: 'Ciao dal mondo senza dipendenze!' });
});

// Parametri dinamici nella URL
app.get('/users/:id', (req, res) => {
  // req.params.id contiene il valore estratto
  res.send({ userId: req.params.id });
});

// POST con body parsing automatico
app.post('/users', async (req, res) => {
  // req.body è già parsato come JSON
  const { name, email } = req.body;
  res.send({ created: true, name, email }, 201);
});

// POST con validazione schema
app.post('/register',
  {
    username: Types.String,
    password: Types.String,
    age: Types.Number
  },
  async (req, res) => {
    // Se arriviamo qui, il body è validato
    res.send({ registered: true, user: req.body });
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Server senza dipendenze su http://localhost:${PORT}`);
});
```

## La pipeline delle richieste

Quando arriva una richiesta, ZSP la processa attraverso una serie di middleware interni:

1. **enhanceResponse** → aggiunge `res.send()` all'oggetto risposta
2. **parseBody** → se c'è un body, lo legge e lo parsa come JSON
3. **routeHandler** → trova la rotta corrispondente e la esegue

Se una rotta ha uno schema di validazione, questo viene controllato subito dopo il parsing del body. Se fallisce, la richiesta viene interrotta con un 400 prima ancora di arrivare al tuo handler.

## HTTP Methods supportati

ZSP supporta tutti i metodi HTTP essenziali, mappati direttamente sulla classe Server di Node:

- `app.get(path, handler)`
- `app.post(path, [schema], handler)`
- `app.put(path, [schema], handler)`
- `app.delete(path, handler)`
- `app.patch(path, [schema], handler)`

Il parametro `schema` è opzionale per tutti i metodi che possono avere un body.

## La filosofia dietro ZSP

Creare ZSP è stato un esercizio di minimalismo consapevole. Nel mondo dello sviluppo moderno abbiamo normalizzato l'idea che "più dipendenze = meglio". Ogni problema ha la sua libreria, ogni libreria ha le sue dipendenze, e prima che te ne accorga il tuo `node_modules` pesa più di un sistema operativo.

Ma è davvero necessario?

Node.js è diventato incredibilmente potente negli anni. Il modulo `http` nativo è robusto, gli stream sono efficienti, le Promise sono first-class citizens. Spesso ci dimentichiamo che possiamo costruire cose funzionanti senza aggiungere strati e strati di astrazione.

ZSP dimostra che con un paio di centinaia di righe di codice si può avere un'esperienza di sviluppo piacevole, familiare, **senza** il carico cognitivo di migliaia di dipendenze.

Non sto dicendo che dovresti usare ZSP in produzione (anzi, esplicitamente **non** dovresti). Sto dicendo che forse, la prossima volta che aggiungi una dipendenza al tuo progetto, potresti chiederti: *"Ne ho davvero bisogno? Posso farcela con quello che ho già?"*

A volte la risposta sarà sì, e va bene così. Altre volte scoprirai che il linguaggio e la piattaforma ti danno già tutto ciò che serve.

E quella scoperta, fidati, ha un sapore speciale.

---

## La vulnerabilità della supply chain

Ma c'è un altro aspetto che dovremmo considerare, e non è solo questione di megabyte scaricati o di `node_modules` ingovernabili. Parliamo di sicurezza.

Quando esegui `npm install` in un progetto moderno, stai affidando il tuo sistema — e spesso i dati dei tuoi utenti — a migliaia di sconosciuti. Ogni dipendenza è un potenziale vettore d'attacco. Ogni maintainer, un anello della catena di cui devi fidarti ciecamente.

Ti ricordi l'incidente [left-pad](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm)? Un singolo pacchetto di 11 righe rimosso da npm ha rotto migliaia di build in tutto il mondo. E quello era solo un problema di disponibilità. Pensa a casi ben più gravi: il backdoor in [event-stream](https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident) che ha rubato bitcoin dalle applicazioni che lo utilizzavano. La [sabotaggio di colors.js](https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/) che ha inserito glitch infiniti nei log di produzione.

Queste non sono eccezioni. Sono sintomi di un sistema malato.

Nel 2023, [una ricerca di Socket](https://socket.dev/blog/2023-year-in-review) ha rilevato che il 48% dei pacchetti npm contiene codice potenzialmente pericoloso. E noi installiamo queste dipendenze in sistemi che gestiscono transazioni finanziarie, dati sanitari sensibili, informazioni governative classificate. È davvero accettabile?

In contesti critici — fintech, healthcare, settore pubblico — la supply chain del software dovrebbe essere trattata con la stessa attenzione che diamo alla sicurezza fisica. Eppure continuiamo a importare codice da repository che non controlliamo, da maintainer che non conosciamo, con licenze che non leggiamo.

ZSP è una provocazione, certo, ma anche una dimostrazione pratica: **meno codice significa meno superficie d'attacco**. Zero dipendenze esterne significano zero vettori di attacco provenienti dalla supply chain. È un approccio radicale, forse. Ma in un'epoca di supply chain attacks sempre più sofisticati, forse il radicale è esattamente ciò di cui abbiamo bisogno.

La prossima volta che installerai quella libreria "utility" da 5 dipendenze transitive per risparmiarti 10 righe di codice, chiediti: *"Sto davvero risparmiando qualcosa? O sto solo accumulando debito tecnico e rischio di sicurezza?"*

---

## Il problema della standard library

C'è un altro elefante nella stanza che ZSP ci costringe a guardare in faccia: JavaScript, a differenza di quasi ogni altro linguaggio moderno, non ha una standard library degna di questo nome.

Confrontiamo con altri ecosistemi. Python è "batteries included": dal parsing JSON alla gestione dei file, dall'HTTP alla crittografia, quasi tutto è built-in. Go ha una standard library così ricca che molti progetti di medie dimensioni non necessitano di dipendenze esterne. Rust, con il suo crate `std`, offre primitive potenti e ben documentate per la maggior parte delle operazioni comuni.

E JavaScript? Abbiamo `Array.prototype.map`, sì. Ma se vuoi fare una richiesta HTTP devi installare `axios` o `node-fetch`. Se vuoi validare uno schema, servono `joi` o `zod`. Se vuoi gestire le date in modo decente, ecco `date-fns` o `moment` (anche se questo ultimo è ormai deprecato, il che ti fa capire quanto siamo instabili).

Questo vuoto ha creato un ecosistema dove anche l'operazione più banale richiede un `npm install`. Siamo diventati così dipendenti dalle librerie esterne che abbiamo dimenticato che il linguaggio stesso — e la piattaforma — potrebbero offrirci molto di più.

Deno ha capito questo problema. È stato costruito con un approccio "secure by default", offre strumenti built-in (formatter, linter, test runner, bundler), supporta URL imports nativi e ha un sistema di permessi granulari. Non è perfetto, e l'adozione è ancora limitata, ma la direzione è quella giusta.

L'ecosistema Node.js sta lentamente riconoscendo la necessità di una standard library più ricca. Vediamo l'introduzione di [`fetch` nativo](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#fetch) in Node 18. Vediamo miglioramenti al modulo `fs/promises`. Ma il passo è lento, troppo lento per la velocità con cui evolve il nostro settore.

ZSP dimostra cosa sia possibile con le API che Node.js offre oggi. Ma immagina cosa potremmo costruire se la piattaforma facesse di più. Se avessimo validazione schema built-in. Se avessiamo un router HTTP nativo performante. Se avessimo strumenti di sviluppo integrati come in Deno.

Forse il futuro di JavaScript non è un `node_modules` da 2GB. Forse il futuro è un ecosistema dove la piattaforma ci dà gli strumenti essenziali, e le librerie esterne servono davvero solo per casi d'uso specializzati.

ZSP è un punto di partenza, non una destinazione. Una dimostrazione che possiamo fare di meglio. Che dobbiamo fare di meglio.

Perché alla fine, la vera domanda non è "quante dipendenze posso evitare?". La vera domanda è: *"Perché il nostro ecosistema ci costringe a farne così tante in primo luogo?"*

---

## Conclusione

ZSP è una dimostrazione pratica che **zero dipendenze** non significa **zero funzionalità**. È un framework backend completo, anche se minimalista, che offre routing, parsing, validazione e una API familiare.

Se ti va di darci un'occhiata, il codice sorgente è su [GitHub](https://github.com/Roberto286/zsp) e il pacchetto è disponibile su [npm](https://www.npmjs.com/package/@roberto286/zsp).

E magari, la prossima volta che avvii un side project, prova a chiederti: *"Quanto può essere semplice davvero?"*
