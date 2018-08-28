const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const argv = JSON.parse(require('minimist')(process.argv.slice(2)).argv)
const { polyBrowserConsole } = require('./util')

app.on('ready', () => {
  const entryScript = argv._ && argv._[0]
  const showWindow = argv.window
  const openInspector = argv.inspect || !entryScript || showWindow
  const entryScriptRel = entryScript && path.resolve(entryScript)

  const window = new BrowserWindow({
    show: showWindow,
    webPreferences: {
      preload: path.resolve(__dirname, './preload.js'),
      additionalArguments: [
        `--entry-script=${entryScriptRel || ''}`,
        `--open-inspector=${openInspector}`,
      ],
    },
  })

  window.loadURL('file://' + path.resolve(__dirname, './index.html'))

  window.webContents.on('devtools-closed', () => {
    process.exit()
  })

  if (openInspector) {
    const openDevToolsOptions = showWindow
      ? null
      : {
        mode: 'detach',
      }

    window.webContents.openDevTools(openDevToolsOptions)
  }

  ipcMain.on('console', (_, arg) => {
    console[arg.methodName](...polyBrowserConsole(arg.payload))
  })

  ipcMain.on('exit', (_, code = 0) => {
    process.exit(code)
  })
})
