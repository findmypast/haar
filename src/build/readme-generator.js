'use strict'

const globby = require('globby')
const fs = require('fs-extra')
const _ = require('lodash')
const logger = require('./../infrastructure').logger
const config = require('./../config')
const path = require('path')
const Handlebars = require('handlebars')

const getDiagramDescription = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf8')
  let descriptionPart = file.split('@startuml')[0].replace('@description', '')
  let trimmed = _.trim(descriptionPart)
  return trimmed
}

const getDiagramsMetadata = (directory) => {
  const filePaths = globby.sync(`${directory}/${config.diagramDirectory}/*.puml`)

  const files = _.map(filePaths, filePath => {
    let fileName = path.basename(filePath, '.puml')
    let imagePath = `${directory}/${config.assetDirectory}/${fileName}.png`

    return {
      filePath: filePath,
      description: getDiagramDescription(filePath),
      imagePath: imagePath,
      readableName: _.startCase(fileName.toLowerCase()),
      hashLink: _.kebabCase(fileName.toLowerCase()),
      imageRelativePath: `./${path.relative(directory, imagePath)}`
    }
  })

  return files
}

const generateReadme = (directoryData) => {
  const readmeOutputPath = `${directoryData.directory}/README.md`

  logger.info(`Generating readme at ${readmeOutputPath}`)

  const readmeTemplatePath = `${directoryData.directory}/${config.templateDirectory}/README.hbs`
  const templateData = fs.readFileSync(readmeTemplatePath, 'utf8')
  const compiledTemplate = Handlebars.compile(templateData)
  const readmeData = compiledTemplate(directoryData)

  fs.outputFileSync(readmeOutputPath, readmeData)
}

const generateAllReadmes = (done) => {
  logger.info('Generating readme\'s')

  const directoriesOfDiagrams = _.map(config.directories, directory => {
    return {
      directory: directory,
      diagrams: getDiagramsMetadata(directory)
    }
  })

  directoriesOfDiagrams.forEach(generateReadme)

  done()
}

module.exports = generateAllReadmes
