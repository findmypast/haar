const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const _ = require('lodash')
const path = require('path')
const config = require('./../config')
const logger = require('./../infrastructure').logger
const diagramMetadata = require('./../infrastructure').diagramMetadata

const port = process.env.PORT || 3000

module.exports = () => {
  const directoriesOfDiagrams = {
    directories: diagramMetadata.getDiagramDirectories()
  }

  const viewData = _.merge({}, config, directoriesOfDiagrams)

  config.directories.map((directory) => {
    const fileDir = `${directory}/${config.assetDirectory}`
    const webDir = `/static/${directory}`
    logger.info(`Serving files from '${fileDir}' at '${webDir}'`)
    app.use(webDir, express.static(fileDir))
    app.use(express.static('static'))
  })

  app.engine('handlebars', exphbs({
    defaultLayout: 'main'
  }))
  const viewPath = path.resolve('./views')
  logger.info(`Serving views from: ${viewPath}`)
  app.set('views', viewPath)

  app.set('view engine', 'handlebars')

  app.get('/', function (req, res) {
    res.render('home', viewData)
  })

  app.listen(port, () => {
    logger.info(`Listening on port ${port}`)
  })
}
