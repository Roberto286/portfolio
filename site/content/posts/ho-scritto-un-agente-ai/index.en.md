---
date: 2026-03-12
images:
  - hero.png
title: I wrote an AI agent!
---

We now live surrounded by AI. We find it everywhere: in the browser, on
our phones, even in our operating systems *(coff coff Microsoft)*.

Although I'm generally skeptical of the
[FOMO](https://it.wikipedia.org/wiki/FOMO) that often spreads through
the tech world, one thing is hard to deny: **AI is a powerful tool and
it's here to stay**.

For this reason, for some time I've felt the need to better understand
how the tools we now use every day actually work: Claude Code, GitHub
Copilot, OpenCode, and many others. And, as a programmer, the most
natural way for me to learn something has always been the same:
**writing code**.

------------------------------------------------------------------------

## The project

Over the past few days I decided to build a small **AI agent** using
Python and the [google-genai](https://pypi.org/project/google-genai/)
library, which allows you to use Google models through APIs.

It wasn't the first time I interacted with an LLM at the API level (I
had already done it with
[reelcipe](https://github.com/roberto286/reelcipe) and also in some
closed-source enterprise projects). In those cases, however, the flow
was very simple: send a prompt, receive a response. That's it.

This time the problem was different.

To build an agent I needed to allow the model to **interact with the
outside world**, giving it the ability to call certain functions to
perform basic operations:

- Read a directory or a file
- Write directories or files
- Execute a code file *(in my case only Python)*

In other words: the model should not just respond, but **act**.

------------------------------------------------------------------------

## Implementation: Tools

With the `google-genai` library, the implementation turned out to be
simpler than expected.

It's enough to pass to the `generate_content` method --- the one that
sends the request to the model --- a `config` parameter containing, in
addition to the system prompt, a **list of tools** structured in a
specific format (I refer to the
[documentation](https://googleapis.github.io/python-genai/index.html)
for details). In the system prompt it is also useful to explicitly
specify the available functions, so the model has a clearer idea of how
to use them.

From a code perspective, tools are nothing more than **regular Python
functions**. The only truly important requirement is that they receive
text and return text: since the agent runs from the CLI, it only has
access to that type of output.

### Example: executing a Python file

One of the agent's functions allows it to execute a Python file using
`subprocess`:

``` python
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

### Example: function schema

Each function must be accompanied by a **schema**, which is included in
the list of tools to describe its behavior to the model:

``` python
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

In essence, the schema is what allows the model to understand **when and
how to use a function**.

------------------------------------------------------------------------

## Results

The surprising part is that, by giving the LLM these **three basic
capabilities** --- reading files, writing files, and executing code ---
the model already becomes capable of writing code autonomously.

In [this
commit](https://github.com/Roberto286/ai-agent/commit/6c2b401f34b67759d3bc36dd67d60d40d0548413),
for example, the agent performed a small **refactor on its own code**.

It's a simple result but an interesting one: with very few tools
available, the model can already participate actively in the development
cycle.

------------------------------------------------------------------------

## Disclaimer

> It's important to specify that this is a project created for **purely
> educational purposes**, and I do **not** recommend that **anyone** use
> this tool in a real-world context.
>
> Despite some constraints that I introduced, allowing an LLM to execute
> arbitrary code remains a delicate problem that requires many more
> security guarantees. The tools mentioned at the beginning of the
> article address this problem in a much more sophisticated way, in
> addition to being significantly more performant.

------------------------------------------------------------------------

## Next steps

Now that the structure of an AI agent is much clearer to me, the next
step will be to **put it to the test**.

The idea is simple: try to make it write **new functions that it can
later use on its own**, gradually expanding its capabilities.

I still don't know where this experiment will lead. But building even a
very simple agent has already clarified one thing: much of the "magic"
behind the AI tools we use every day doesn't lie so much in the model
itself, but in the ecosystem of tools and constraints we build around
it.

Understanding these mechanisms, at least for me, is the best way to stop
seeing AI as a black box --- and start treating it for what it really
is: **a programmable system**.
