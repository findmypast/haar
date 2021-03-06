'use strict'

const program = require('commander')
const version = require('./../package.json').version
const chalk = require('chalk')

const init = require('./init')
const add = require('./add')
const build = require('./build')
const serve = require('./serve')

program
  .version(version)

program
  .command('init')
  .description('Initialise a new haar project')
  .action(init)

program
  .command('add')
  .description('Add a new diagram to a haar project')
  .action(add)

program
  .command('build')
  .description('Build diagrams in directories listed in .haar.yml')
  .action(build)

program
  .command('serve')
  .description('Run a local webserver to serve the diagrams')
  .action(serve)

if (!process.argv.slice(2).length) {
  program.outputHelp(chalk.cyan)
}

program.parse(process.argv)
