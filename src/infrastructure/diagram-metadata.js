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

const getDiagramsMetadata = (directory) => {
  const filePaths = globby.sync(`${directory}/${config.diagramDirectory}/*.puml`)

  const files = _.map(filePaths, filePath => {
    let fileName = path.basename(filePath, '.puml')
    let imagePath = `${directory}/${config.assetDirectory}/${fileName}.png`
    let imageFileName = `${fileName}.png`
    let svgFileName = `${fileName}.svg`

    return {
      directory: directory,
      filePath: filePath,
      description: getDiagramDescription(filePath),
      readableName: _.startCase(fileName.toLowerCase()),
      hashLink: _.kebabCase(fileName.toLowerCase()),
      staticImagePath: `/static/${directory}/${imageFileName}`,
      staticSvgPath: `/static/${directory}/${svgFileName}`,
      imageRelativePath: `./${path.relative(directory, imagePath)}`.replace('\\', '/')
    }
  })

  return files
}

module.exports = {
  getDiagramDirectories: () => {
    return _.map(config.directories, directory => {
      return {
        directory: directory,
        directoryReadable: _.startCase(directory),
        diagrams: getDiagramsMetadata(directory)
      }
    })
  }
}
