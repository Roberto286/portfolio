---
title: "Ho scritto un agente AI!"
date: 2026-03-12
images:
  - hero.png
---

Viviamo ormai circondati dall'AI. La troviamo ovunque: nel browser, nel
telefono, persino nel nostro sistema operativo _(coff coff Microsoft)_.

Per quanto io sia generalmente contrario alla
[FOMO](https://it.wikipedia.org/wiki/FOMO) che spesso attraversa
l'ambiente tech, è difficile negare una cosa: **l'AI è uno strumento
potente ed è qui per restare**.

Proprio per questo, da qualche tempo sentivo il bisogno di capire meglio
come funzionano gli strumenti che ormai utilizziamo ogni giorno: Claude
Code, GitHub Copilot, OpenCode e molti altri. E, da programmatore, il
modo più naturale che ho per imparare qualcosa è sempre lo stesso:
**scrivere codice**.

---

## Il progetto

Negli ultimi giorni ho quindi deciso di costruire un piccolo **agente
AI** usando Python e la libreria
[google-genai](https://pypi.org/project/google-genai/), che permette di
utilizzare i modelli di Google tramite API.

Non era la prima volta che interagivo con un LLM a livello di API
(l'avevo già fatto con
[reelcipe](https://github.com/roberto286/reelcipe) e anche in alcuni
progetti enterprise closed-source). In quei casi, però, il flusso era
molto semplice: inviare un prompt, ricevere una risposta. Fine.

Questa volta il problema era diverso.

Per costruire un agente dovevo permettere al modello di **interagire con
il mondo esterno**, dandogli la possibilità di richiamare alcune
funzioni per eseguire operazioni di base:

- Leggere una directory o un file
- Scrivere directory o file
- Eseguire un file di codice _(nel mio caso solo Python)_

In altre parole: il modello non doveva limitarsi a rispondere, ma
**agire**.

---

## Implementazione: i Tools

Con la libreria `google-genai` l'implementazione si è rivelata più
semplice del previsto.

È sufficiente passare al metodo `generate_content` --- quello che invia
la richiesta al modello --- un parametro `config` contenente, oltre al
prompt di sistema, una **lista di tools** strutturata in un formato
specifico (rimando alla
[documentazione](https://googleapis.github.io/python-genai/index.html)
per i dettagli). Nel prompt di sistema è poi utile specificare
esplicitamente le funzioni disponibili, in modo da rendere più chiaro al
modello come utilizzarle.

Dal punto di vista del codice, i tools non sono altro che **normali
funzioni Python**. L'unico requisito davvero importante è che ricevano
testo e restituiscano testo: l'agente, essendo lanciato da CLI, ha
accesso soltanto a quel tipo di output.

### Esempio: esecuzione di un file Python

Una delle funzioni dell'agente permette di eseguire un file Python
utilizzando `subprocess`:

```python
def run_python_file(working_directory, file_path, args=None):
    try:
        is_inside, is_dir, target_dir = check_directory(working_directory, file_path)

        if is_inside == False:
            return f'Error: Cannot execute "{file_path}" as it is outside the permitted working directory'

        if os.path.isfile(target_dir) == False:
            return f'Error: "{file_path}" does not exist or is not a regular file'

        if not file_path.endswith('.py'):
            return f'Error: "{file_path}" is not a Python file'

        command = ["python", target_dir]

        if args and len(args):
            command.extend(args)

        completed = subprocess.run(command, timeout=30.00, text=True, cwd=working_directory, capture_output=True)

        result = ""

        if completed.returncode != 0:
            result += f"Process exited with code {completed.returncode}"

        if not completed.stdout and not completed.stderr:
            result += "No output produced"

        if completed.stdout:
            result += f"STDOUT: {completed.stdout}"

        if completed.stderr:
            result += f"STDERR: {completed.stderr}"

        return result

    except Exception as e:
        return f"Error: executing Python file: {e}"
```

### Esempio: schema della funzione

Ogni funzione deve essere accompagnata da uno **schema**, che viene
inserito nella lista dei tools per descriverne il comportamento al
modello:

```python
schema_run_python_file = types.FunctionDeclaration(
    name="run_python_file",
    description="Run a python file with optional args. Produces STDOUT and STDERR and program output",
    parameters=types.Schema(
        type=types.Type.OBJECT,
        properties={
            "file_path": types.Schema(
                type=types.Type.STRING,
                description="Directory path to list files from, relative to the working directory (default is the working directory itself)",
            ),
            "args": types.Schema(
                type=types.Type.ARRAY,
                items=types.Schema(type=types.Type.STRING),
                description="Optional args to give to the python program",
            ),
        },
    ),
)
```

In sostanza, lo schema è ciò che permette al modello di capire **quando
e come utilizzare una funzione**.

---

## Risultati

La parte sorprendente è che, fornendo all'LLM queste **tre capacità di
base** --- leggere file, scrivere file ed eseguire codice --- il modello
diventa già in grado di scrivere codice autonomamente.

In [questo
commit](https://github.com/Roberto286/ai-agent/commit/6c2b401f34b67759d3bc36dd67d60d40d0548413),
ad esempio, l'agente ha eseguito un piccolo **refactor sul proprio
codice**.

È un risultato semplice, ma interessante: con pochissimi strumenti a
disposizione, il modello riesce già a partecipare attivamente al ciclo
di sviluppo.

---

## Disclaimer

> È doveroso specificare che questo è un progetto a **scopo puramente
> didattico**, e non consiglio a **nessuno** di utilizzare questo tool
> in un contesto reale.
>
> Nonostante alcuni vincoli che ho introdotto, permettere a un LLM di
> eseguire codice arbitrario rimane un problema delicato che richiede
> molte più garanzie di sicurezza. Gli strumenti citati all'inizio
> dell'articolo affrontano questo problema in modo molto più
> sofisticato, oltre a essere decisamente più performanti.

---

## Prossimi passi

Ora che la struttura di un agente AI mi è molto più chiara, il passo
successivo sarà **metterlo alla prova**.

L'idea è semplice: provare a fargli scrivere **nuove funzioni che potrà
poi utilizzare da solo**, espandendo gradualmente le sue capacità.

Non so ancora dove porterà questo esperimento. Ma costruire anche un
agente molto semplice ha già chiarito una cosa: gran parte della "magia"
degli strumenti AI che utilizziamo ogni giorno non sta tanto nel modello
in sé, quanto nell'ecosistema di strumenti e vincoli che gli costruiamo
attorno.

Capire questi meccanismi, almeno per me, è il modo migliore per smettere
di vedere l'AI come una scatola nera --- e iniziare a trattarla per
quello che è davvero: **un sistema programmabile**.
