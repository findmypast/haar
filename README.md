# haar

Haar is a command line tool to help you write diagrams with plant uml and then surface and expose those diagrams to the people on your team.

> In meteorology, haar is a cold sea fog. It usually occurs on the east coast of England or Scotland between April and September, when warm air passes over the cold North Sea.

[![npm](https://img.shields.io/npm/v/haar.svg?maxAge=2592000)](https://www.npmjs.com/package/haar)
[![npm](https://img.shields.io/npm/dm/haar.svg)](https://www.npmjs.com/package/haar)

#### instructions

```
Usage:  [options] [command]

 Commands:

   init    Initialise a new haar project
   build   Build diagrams in directories listed in .haar.yml
   serve   Run a local webserver to serve the diagrams

 Options:

   -h, --help     output usage information
   -V, --version  output the version number
```


#### To do

- [x] Init
  - [x] Create folder structure based on a template folder
  - [x] Create a yaml file with some defaults at the root of repo

- [ ] Build
  - [x] Iterate and find all puml files based on yaml config
  - [x] Run puml files through the module for building them
  - [x] Build high level readme's with descriptions and images for github viewing
  - [x] Option for SVG or PNG or both
  - [ ] Delete orphaned files

- [ ] Pre-Flight-Check
  - [ ] Check for locally installed dependencies (graphviz, java) and give good error messages

- [x] Serve
  - [x] Simple site under Express to serve a presentation of the stuff
  - [x] Navigation for folders of diagrams

- [x] CI
  - [x] Dockerfile
  - [x] Usher to run tests under docker
  - [x] Usher to publish NPM module under docker
