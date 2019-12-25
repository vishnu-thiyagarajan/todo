const express = require('express')
const path = require('path')
const rootDir = path.dirname(process.mainModule.filename);
const app = express()
const port = 3000
const routes = require('./admin')
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static(path.join(rootDir, 'frntend')))
app.use(routes)
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, './404.html'))
})
