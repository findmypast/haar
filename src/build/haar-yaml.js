'use strict'

const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')
const _ = require('lodash')

const getYml = () => {
  try {
    let haarFile = fs.readFileSync('.haar.yml', 'utf8')
    return yaml.safeLoad(haarFile)
  } catch (e) {
    return {}
  }
}

const removeDeletedEntries = (done) => {
  let existing = fs.readdirSync('.');
  let haarYml = getYml()

  haarYml.directories = _.filter(haarYml.directories, function(directory) {
    return _.includes(existing, directory.path)
  })

  let dumpYml = yaml.safeDump(haarYml)
  fs.outputFileSync('./.haar.yml', dumpYml)

  done()
}

module.exports = removeDeletedEntries
