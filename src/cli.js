'use strict'

const program = require('commander');
const version = require('./../package.json').version
const logger = require('winston');

const init = require('./init');
const build = require('./build');
const build = require('./serve');

logger.cli()

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

program.parse(process.argv);
