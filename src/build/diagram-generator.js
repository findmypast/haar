'use strict'

const config = require('./../config')
const fs = require('fs-extra')
const globby = require('globby')
const plantuml = require('node-plantuml')
const path = require('path')
const _ = require('lodash')
const async = require('async')
const logger = require('./../infrastructure').logger

const generateDiagram = (rootDirectory, diagramPath, format, done) => {
  logger.info(`Generating ${format} for diagram ${diagramPath}`)
  let fileName = path.basename(diagramPath, '.puml')
  let outputPath = `${rootDirectory}/${config.assetDirectory}/${fileName}.${format}`
  let gen = plantuml.generate(diagramPath, { format: format })
  let chunks = []

  gen.out.on('data', (data) => chunks.push(data))

  gen.out.on('end', () => {
    const buffer = Buffer.concat(chunks)
    logger.info(`Saving image ${outputPath}`)
    fs.outputFile(outputPath, buffer, done)
  })
}

const generateDiagrams = (rootDirectory, diagramPath, done) => {
  const generators = config.formats.map((format) => {
    return _.curry(generateDiagram)(rootDirectory, diagramPath, format)
  })

  async.parallel(generators, done)
}

const generateDiagramsInFolder = (directoryData, done) => {
  const diagramFiles = globby.sync([`./${directoryData.path}/${config.diagramDirectory}/*.puml`])
  async.each(
    diagramFiles,
    _.curry(generateDiagrams)(directoryData.path),
    done
  )
}

const generateAllDiagrams = (done) => {
  async.each(
    config.directories,
    generateDiagramsInFolder,
    done
  )
}

module.exports = generateAllDiagrams
