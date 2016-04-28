'use strict'

const config = require('./../config');
const fs = require('fs-extra');
const globby = require('globby');
const plantuml = require('node-plantuml');
const path = require('path');
const _ = require('lodash');
const async = require('async');
const chalk = require('chalk');

const generateDiagram = (rootDirectory, diagramPath, done) => {
  console.log(chalk.cyan(`  > Generating diagram ${diagramPath}`));
  let gen = plantuml.generate(diagramPath, { format: 'png' });
  let chunks = [];

  gen.out.on('data', chunks.push);

  gen.out.on('end', () => {
    let fileName = path.basename(diagramPath, '.puml');
    let buffer = Buffer.concat(chunks);
    let outputPath = `${rootDirectory}/${config.assetDirectory}/${fileName}.png`
    fs.outputFileSync(outputPath, buffer);
    done();
  });
}

const generateDiagramsInFolder = (rootDirectory, done) => {
  let diagramFiles = globby.sync([`./${rootDirectory}/${config.diagramDirectory}/*.puml`]);
  async.each(
    diagramFiles,
    _.curry(generateDiagram)(rootDirectory),
    done
  );
}

const generateAllDiagrams = (done) => {
  async.each(
    config.directories,
    generateDiagramsInFolder,
    done
  );
}

module.exports = generateAllDiagrams;
