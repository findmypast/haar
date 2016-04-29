# haar

Haar is a command line tool to help you write diagrams with plant uml and then surface and expose those diagrams to the people on your team.

> In meteorology, haar is a cold sea fog. It usually occurs on the east coast of England or Scotland between April and September, when warm air passes over the cold North Sea.

[![npm](https://img.shields.io/npm/v/haar.svg?maxAge=2592000)](https://www.npmjs.com/package/haar)
[![npm](https://img.shields.io/npm/dm/haar.svg)](https://www.npmjs.com/package/haar)

## IN PROGRESS - NOT PRODUCTION READY

#### To do

- [x] Init
  - [x] Create folder structure based on a template folder
  - [x] Create a yaml file with some defaults at the root of repo

- [ ] Build
  - [ ] Check for locally installed dependencies and give good error messages
  - [x] Iterate and find all puml files based on yaml config
  - [x] Run puml files through the module for building them
  - [ ] Build high level readme's with descriptions and images for github viewing

- [ ] Serve
  - [ ] Simple site under Koa to serve a presentation of the stuff

- [x] CI
  - [x] Dockerfile
  - [x] Usher to run tests under docker
  - [x] Usher to publish NPM module under docker
