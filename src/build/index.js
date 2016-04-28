'use strict'

const diagramGenerator = require('./diagram-generator');

module.exports = () => {
  diagramGenerator((err) => {
    console.log("Diagrams finished generating");
    console.log(err);
  });
};
