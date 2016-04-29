'use strict'

const diagramGenerator = require('./diagram-generator');
const async = require('async');

module.exports = () => {
  diagramGenerator((err) => {
    logger.success("Finished generating diagrams");
  });
};
