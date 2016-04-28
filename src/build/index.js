'use strict'

const diagramGenerator = require('./diagram-generator');
const chalk = require('chalk');

module.exports = () => {
  diagramGenerator((err) => {
    console.log(chalk.green(`  > Finished generating diagrams`));
  });
};
