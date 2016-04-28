'use strict'

const config = require('./../config');
const fs = require('fs-extra');
const globby = require('globby');
const plantuml = require('node-plantuml');
const path = require('path');
const _ = require('lodash');
const async = require('async');

const generateDiagram = (inFile, done) => {
  let gen = plantuml.generate(filePath, { format: 'png' });
  let chunks = [];

  gen.out.on('data', chunks.push);

  gen.out.on('end', () => {
    let fileName = path.basename(filePath, '.puml');
    let buffer = Buffer.concat(chunks);
    let outputPath = `${rootDirectory}/${config.assetDirectory}/${fileName}.png`
    fs.writeFileSync(outputPath, buffer);
    done();
  });
}

const generateDiagramsInFolder = (rootDirectory, done) => {
  let diagramFiles = globby.sync([`./${rootDirectory}/${config.diagramDirectory}/*.puml`]);

  async.each(
    diagramFiles,
    generateDiagram,
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
