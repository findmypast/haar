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

module.exports = {
  updateFile: (projectName, destinationDirectory) => {
    const directoryRelative = path.relative('./', destinationDirectory)

    let haarYaml = getYml()
    haarYaml.directories.push({
      path: directoryRelative,
      hashLink: _.kebabCase(directoryRelative),
      serve: true,
      readableName: _.startCase(directoryRelative)
    });

    let dumpYml = yaml.safeDump(haarYaml)
    fs.outputFileSync('./.haar.yml', dumpYml)
  }
}
