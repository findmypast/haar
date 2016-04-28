'use strict'

const program = require('commander');
const version = require('./../package.json').version
const chalk = require('chalk');

const init = require('./init');
const build = require('./build');
const serve = require('./serve');

program
  .version(version)

program
  .command('init')
  .description('Initialise a new haar project')
  .action(init);

program
  .command('build')
  .description('Build diagrams')
  .action(build);

program
  .command('serve')
  .description('Run a local webserver to serve the diagrams')
  .action(serve);

if (!process.argv.slice(2).length) {
  program.outputHelp(chalk.cyan);
}

program.parse(process.argv);
