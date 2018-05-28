const { ipcRenderer } = require('electron')
const path = require('path')
const minimist = require('minimist')
const Module = require('module')

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
if (openInspector !== 'true') {
  const __exit = process.exit
  process.exit = (code) => {
    ipcRenderer.send('exit', code)
    __exit()
  }
}

module.parent.paths = Module._nodeModulePaths('.')
global.__filename = module.parent.filename = path.resolve('__REPL__')
global.__dirname = path.resolve()

// require entry script
// or change the filename/dirname to `cwd`
if (entryScript) {
  document.addEventListener('DOMContentLoaded', () => {
    require(entryScript)
  })
}
