'use strict'

const config = require('./../config')
const fs = require('fs-extra')
const globby = require('globby')
const plantuml = require('node-plantuml')
const path = require('path')
const _ = require('lodash')
const async = require('async')
const logger = require('./../infrastructure').logger

const generateDiagram = (rootDirectory, diagramPath, done) => {
  logger.info(`Generating diagram ${diagramPath}`)
  let fileName = path.basename(diagramPath, '.puml')
  let outputPath = `${rootDirectory}/${config.assetDirectory}/${fileName}.png`
  let gen = plantuml.generate(diagramPath, { format: 'png' })
  let chunks = []

  gen.out.on('data', (data) => chunks.push(data))

  gen.out.on('end', () => {
    let buffer = Buffer.concat(chunks)
    logger.info(`Saving image ${outputPath} ${chunks.length}`)
    fs.outputFile(outputPath, buffer, done)
  })
}

const generateDiagramsInFolder = (rootDirectory, done) => {
  let diagramFiles = globby.sync([`./${rootDirectory}/${config.diagramDirectory}/*.puml`])
  async.each(
    diagramFiles,
    _.curry(generateDiagram)(rootDirectory),
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
