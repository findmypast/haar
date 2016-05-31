'use strict'

const haarYaml = require('./haar-yaml')
const cleanupAssets = require('./cleanup-assets')
const diagramGenerator = require('./diagram-generator')
const readmeGenerator = require('./readme-generator')
const async = require('async')
const logger = require('./../infrastructure').logger

const onBuildComplete = (err, results) => {
  if (err) {
    logger.fatal(err)
    throw new Error('Building diagrams failed', err)
  }
  logger.success('Finished generating diagrams')
}

module.exports = () => {
  async.series([
    haarYaml,
    cleanupAssets,
    diagramGenerator,
    readmeGenerator
  ], onBuildComplete)
}
