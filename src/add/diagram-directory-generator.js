'use strict'

const fs = require('fs-extra')
const path = require('path')
const config = require('./../config')
const logger = require('./../infrastructure').logger
const yaml = require('./haar-yaml')

const directoryGenerator = (projectName, destinationDirectory, diagramType, diagramName) => {
  const dummyFiles = {
    Sequence: 'dummy-sequence.puml',
    Component: 'dummy-component.puml',
    Activity: 'dummy-activity.puml',
    ReadmeTemplate: 'readme-template.hbs'
  }

  let updateReadmeAndYaml = false
  let diagramDestinationDirectory = path.resolve(`${destinationDirectory}/${config.diagramDirectory}`)

  try {
    let stats = fs.statSync(destinationDirectory);
    if(!stats.isDirectory()) {
      logger.fatal(`${destinationDirectory} exists and is not a directory`);
      throw new Error('Invalid diagrams directory specified', err)
    }
  } catch (err) {
    updateReadmeAndYaml = true
  }

  fs.mkdirsSync(diagramDestinationDirectory);
  logger.info(`Creating folder ${diagramDestinationDirectory}`);

  let templateDirectory = path.join(__dirname, '../../templates')
  let templateDestinationDirectory = path.resolve(`${destinationDirectory}/${config.templateDirectory}`)

  let assetDestinationDirectory = path.resolve(`${destinationDirectory}/${config.assetDirectory}`)
  fs.mkdirsSync(assetDestinationDirectory)

  let diagramPath = path.join(diagramDestinationDirectory, `${diagramName}.puml`)
  fs.copySync(path.join(templateDirectory, dummyFiles[diagramType]), diagramPath)

  logger.info(`Creating diagram ${diagramPath}`)

  if(updateReadmeAndYaml) {
    let readmePath = path.join(templateDestinationDirectory, 'README.hbs')
    fs.copySync(path.join(templateDirectory, dummyFiles.ReadmeTemplate), readmePath)
    logger.info(`Creating readme ${readmePath}`)

    yaml.updateFile(projectName, destinationDirectory)
  }
}

module.exports = directoryGenerator
