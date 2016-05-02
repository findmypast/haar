'use strict';

const _ = require('lodash');
const fs = require('fs-extra');
const yaml = require('js-yaml');

const defaultConfig = {
  diagramDirectory: 'diagrams',
  assetDirectory: 'assets',
  templateDirectory: 'templates'
};

const getYml = () => {
  try {
    let haarFile = fs.readFileSync('.haar.yml', 'utf8');
    return yaml.safeLoad(haarFile);
  } catch (e) {
    return {};
  }
};

let mergedConfig = _.merge(defaultConfig, getYml());
module.exports = mergedConfig;
