'use strict';

const diagramGenerator = require('./diagram-generator');
const async = require('async');
const logger = require('./../infrastructure').logger;

module.exports = () => {
  diagramGenerator((err) => {
    logger.success("Finished generating diagrams");
  });
};
