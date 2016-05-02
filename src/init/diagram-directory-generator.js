'use strict';

const fs = require('fs-extra');
const path = require('path');
const config = require('./../config');
const logger = require('./../infrastructure').logger;

const directoryGenerator = (destinationDirectory, diagramType, diagramName) => {
  const dummyFiles = {
    Sequence: 'dummy-sequence.puml',
    Component: 'dummy-component.puml',
    Activity: 'dummy-activity.puml',
    ReadmeTemplate: 'readme-template.md'
  };

  let templateDirectory = path.join(__dirname, '../../templates');
  let diagramDestinationDirectory = path.resolve(`${destinationDirectory}/${config.diagramDirectory}`);
  let templateDestinationDirectory = path.resolve(`${destinationDirectory}/${config.templateDirectory}`);

  fs.mkdirsSync(diagramDestinationDirectory);

  logger.info(`Creating folder ${diagramDestinationDirectory}`);

  let diagramPath = path.join(diagramDestinationDirectory, `${diagramName}.puml`);
  fs.copySync(path.join(templateDirectory, dummyFiles[diagramType]), diagramPath);

  logger.info(`Creating diagram ${diagramPath}`);

  let readmePath = path.join(templateDestinationDirectory, `README.md`);
  fs.copySync( path.join(templateDirectory, dummyFiles.ReadmeTemplate), readmePath );

  logger.info(`Creating readme ${readmePath}`);
};

module.exports = directoryGenerator;
