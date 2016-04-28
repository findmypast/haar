'use strict'

const _ = require('lodash');
const fs = require('fs-extra');
const yaml = require('js-yaml');

const defaultConfig = {
  diagramDirectory: 'diagrams',
  assetDirectory: 'assets'
};

module.exports = () => {
  let haarFile = fs.readFileSync('.haar.yml', 'utf8');
  let ymlConfig = yaml.safeLoad(haarFile);
  let merged = _.merge(defaultConfig, ymlConfig);

  console.log(merged);
  return merged;
}
