const { ipcRenderer } = require('electron')
const path = require('path')
const minimist = require('minimist')

const argv = minimist(process.argv)

const entryScript = argv['entry-script']
const openInspector = argv['open-inspector']

// rewrite console
for (const methodName in console) {
  const method = console[methodName]
  console[methodName] = (...args) => {
    method.apply(console, args)

    ipcRenderer.send('console', {
      methodName,
      payload: args,
    })
  }
}

// rewrite `process.exit()` to make it can close window
if (!openInspector) {
  const __exit = process.exit
  process.exit = (code) => {
    ipcRenderer.send('exit', code)
    __exit()
  }
}

// require entry script
// or change the filename/dirname to `cwd`
if (entryScript) {
  module.paths = require.resolve.paths(entryScript).concat(module.paths)
  debugger
  require(entryScript)
} else {
  global.__filename = module.parent.filename = path.resolve('__REPL__')
  global.__dirname = path.resolve()
}
