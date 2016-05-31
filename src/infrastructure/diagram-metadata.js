'use strict'

const globby = require('globby')
const fs = require('fs-extra')
const _ = require('lodash')
const config = require('./../config')
const path = require('path')

const getDiagramDescription = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf8')
  let descriptionPart = file.split('@startuml')[0].replace('@description', '')
  let trimmed = _.trim(descriptionPart)
  return trimmed
}

const getDiagramsMetadata = (directoryPath) => {
  const filePaths = globby.sync(`${directoryPath}/${config.diagramDirectory}/*.puml`)

  const files = _.map(filePaths, filePath => {
    let fileName = path.basename(filePath, '.puml')
    let imagePath = `${directoryPath}/${config.assetDirectory}/${fileName}.png`
    let imageFileName = `${fileName}.png`
    let svgFileName = `${fileName}.svg`

    return {
      filePath: filePath,
      description: getDiagramDescription(filePath),
      readableName: _.startCase(fileName.toLowerCase()),
      hashLink: _.kebabCase(fileName.toLowerCase()),
      staticImagePath: `/static/${directoryPath}/${imageFileName}`,
      staticSvgPath: `/static/${directoryPath}/${svgFileName}`,
      imageRelativePath: `./${path.relative(directoryPath, imagePath)}`.replace('\\', '/')
    }
  })

  return files
}

module.exports = {
  getDiagramDirectories: () => {
    let existing = fs.readdirSync('.');

    config.directories = _.filter(config.directories, function(directory) {
      return _.includes(existing, directory.path)
    })

    return _.map(config.directories, directory => {
      let clonedDirectory = _.cloneDeep(directory)
      clonedDirectory.diagrams = getDiagramsMetadata(clonedDirectory.path)
      return clonedDirectory
    })
  }
}
