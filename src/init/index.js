'use strict'

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const yaml = require('js-yaml');
const config = require('./../config');
const directoryGenerator = require('./diagram-directory-generator');
const logger = require('./../infrastructure').logger;

const questions = [
  {
    type: 'input',
    name: 'project_name',
    message: 'What is the name of your project? (i.e Haar)'
  },
  {
    type: 'input',
    name: 'destination_directory',
    message: 'Where do you want to create your directory for diagrams?',
    default: () => './diagrams'
  },
  {
    type: 'list',
    name: 'diagram_type',
    message: 'What kind of diagram would you like first?',
    choices: [
      'Sequence',
      'Activity',
      'Component'
    ]
  },
  {
    type: 'input',
    name: 'diagram_name',
    message: 'What do you want name your diagram',
    default: () => 'dummy-diagram'
  }
]

module.exports = () => {
  inquirer.prompt(questions)
    .then(function (answers) {

      directoryGenerator(
        answers.destination_directory,
        answers.diagram_type,
        answers.diagram_name
      );

      let haarYaml = yaml.dump({
        name: answers.project_name,
        directories: [ path.relative('./', answers.destination_directory) ]
      });

      fs.outputFileSync('./.haar.yml', haarYaml);

      logger.success("Finished initalisation");
    });
}
