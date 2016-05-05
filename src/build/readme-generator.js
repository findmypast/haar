'use strict'

const fs = require('fs-extra')
const logger = require('./../infrastructure').logger
const diagramMetadata = require('./../infrastructure').diagramMetadata
const config = require('./../config')
const Handlebars = require('handlebars')

const generateReadme = (directoryData) => {
  const readmeOutputPath = `${directoryData.directory.path}/README.md`

  logger.info(`Generating readme at ${readmeOutputPath}`)

  const readmeTemplatePath = `${directoryData.directory.path}/${config.templateDirectory}/README.hbs`
  const templateData = fs.readFileSync(readmeTemplatePath, 'utf8')
  const compiledTemplate = Handlebars.compile(templateData)
  const readmeData = compiledTemplate(directoryData)

  fs.outputFileSync(readmeOutputPath, readmeData)
}

const generateAllReadmes = (done) => {
  logger.info('Generating readme\'s')

  const directoriesOfDiagrams = diagramMetadata.getDiagramDirectories()
  directoriesOfDiagrams.forEach(generateReadme)

  done()
}

module.exports = generateAllReadmes
