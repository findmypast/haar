const chalk = require('chalk');

const info = (msg) => {
  console.log(chalk.cyan(`   > ${msg}`));
};

const success = (msg) => {
  console.log(chalk.green(`   > ${msg}`));
};

const warn = (msg) => {
  console.log(chalk.cyan(`  >> ${msg}`));
};

const fatal = (msg) => {
  console.log(chalk.red(` >>> ${msg}`));
};

module.exports = {
  info: info,
  success: success,
  warn: warn,
  fatal: fatal
};
