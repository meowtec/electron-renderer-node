#!/usr/bin/env node

const argv = require('yargs')
  .command('[options] [file]', 'Execute a script or starts a REPL')
  .option('inspect', {
    default: false,
    describe: 'Open the inspector'
  })
  .alias('help', 'h')
  .alias('version', 'v')
  .argv

require('./lib/')(argv)
