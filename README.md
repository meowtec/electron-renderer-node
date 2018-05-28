Electron renderer node CLI.
========================

> Execute script and run REPL in electron renderer (the Chrome + Node.js environment).

### Installation

```sh
npm i electron-renderer-node -g
```

### Usage

```sh
# Execute a script with in renderer
ern ./sample.js

# Or starts a REPL (Chrome devtool)
ern
```

### WHY I WROTE(USE) IT

1. Logs in command line are hard to read.
2. There are too many steps with `node --inspect-brk`.
3. I want to use `Ctrl+R` to re-run my code.
4. I need the DOM API sometimes.
