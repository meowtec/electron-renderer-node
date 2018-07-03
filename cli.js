#!/usr/bin/env node

const argv = require('yargs')
  .command('[options] [file]', 'Execute a script or starts a REPL')
  .option('inspect', {
    default: false,
    describe: 'Open the inspector',
  })
  .option('window', {
    default: false,
    describe: 'Show browser window',
  })
  .alias('help', 'h')
  .alias('version', 'v')
  .alias('inspect', 'i')
  .alias('window', 'w')
  .argv

require('./lib/')(argv)
