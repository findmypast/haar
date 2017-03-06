# Haar

Haar is a command line tool to help you write diagrams with plant uml and then surface and expose those diagrams to the people on your team.

> In meteorology, haar is a cold sea fog. It usually occurs on the east coast of England or Scotland between April and September, when warm air passes over the cold North Sea.

[![npm](https://img.shields.io/npm/v/haar.svg)](https://www.npmjs.com/package/haar)
[![npm](https://img.shields.io/npm/dm/haar.svg)](https://www.npmjs.com/package/haar)

### TODO

- [ ] Get a svg diagram to appear in the gatsby site
- [ ] Hook up gatsby and Semantic UI
- [ ] Hot updating of puml files
- [ ] Hot updating of descriptions
- [ ] Build site and diagrams to a specific folder
- [ ] Haar to inquirer by default

### Setup
For the best experience of developing diagrams using Haar in Linux

#### Linux (Debian-likes)
Install Haar:
```
npm i -g haar
```
Install [Graphviz](http://www.graphviz.org/) to be able to generate all diagram types.
```
sudo apt-get remove libpathplan4
sudo apt-get install graphviz
```

Install [Plant-UML Viewer](https://atom.io/packages/plantuml-viewer) (Atom package)
```
apm install plantuml-viewer
```

### Instructions

```
Usage:  [options] [command]

 Commands:

   init    Initialise a new haar project
   add     Add a new diagram to an existing project or create a new project
   build   Build diagrams in project directories listed in .haar.yml
   serve   Run a local webserver to serve the diagrams

 Options:

   -h, --help     output usage information
   -V, --version  output the version number
```
