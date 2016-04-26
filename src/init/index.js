'use strict'

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const yaml = require('js-yaml');

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

const dummyFiles = {
  Yml: '.haar.yml',
  Sequence: 'dummy-sequence.puml',
  Component: 'dummy-component.puml',
  Activity: 'dummy-activity.puml'
}

module.exports = () => {
  inquirer.prompt(questions)
    .then(function (answers) {
      let templateDirectory = path.join(__dirname, '../../templates');
      let destDirectory = path.resolve(`${answers.destination_directory}/puml`);

      fs.mkdirsSync(destDirectory)

      fs.copySync(
        path.join(templateDirectory, dummyFiles[answers.diagram_type]),
        path.join(destDirectory, `${answers.diagram_name}.puml`)
      );

      let haarYaml = yaml.dump({
        name: answers.project_name,
        directories: [ path.relative('./', destDirectory) ]
      })
      fs.outputFile('./.haar.yml', haarYaml);

    });
}
