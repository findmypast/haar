'use strict'

const config = require('./../config')
const fs = require('fs-extra')
const path = require('path')
const _ = require('lodash')
const logger = require('./../infrastructure').logger

const cleanupAssetsDirectories = (done) => {
  let existing = fs.readdirSync('.');

  config.directories = _.filter(config.directories, function(directory) {
    return _.includes(existing, directory.path)
  })

  _.forEach(config.directories, directory => {
    let diagramDirectory = path.resolve(directory.path, 'diagrams')
    let diagrams = fs.readdirSync(diagramDirectory)

    let assetDirectory = path.resolve(directory.path, 'assets')
    let assets = fs.readdirSync(assetDirectory)

    _.forEach(assets, asset => {
      let ext = path.extname(asset)
      let name = path.basename(asset, ext)

      if(!_.includes(diagrams, `${name}.puml`)) {
        let assetPath = path.resolve(assetDirectory, asset)
        logger.info(`Removing ${assetPath} - diagram has been deleted`)
        fs.removeSync(assetPath)
      }
    })
  })

  done()
}

module.exports = cleanupAssetsDirectories
