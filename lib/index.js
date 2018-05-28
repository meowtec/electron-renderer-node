const electron = require('electron')
const childProcess = require('child_process')
const path = require('path')

module.exports = (argv) => {
  const spawnResult = childProcess.spawnSync(electron, [
    path.resolve(__dirname, './runner.js'),
    '--argv',
    JSON.stringify(argv),
  ], {
    stdio: 'inherit',
    env: {
      ELECTRON_DISABLE_SECURITY_WARNINGS: true,
    },
  })

  // exit with same code
  if (spawnResult.status) {
    process.exit(spawnResult.status)
  }
}
