const express = require('express')
const db = require('./queries')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (_request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
app.get('/todo', db.getData)
app.post('/list', db.createList)
app.put('/rename', db.updateList)
app.delete('/delete/:id', db.deleteList)
app.post('/task', db.createTask)
app.put('/update', db.updateTask)
app.delete('/clear/:id', db.deleteTask)
