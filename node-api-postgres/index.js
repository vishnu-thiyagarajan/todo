const express = require('express')
const db = require('./queries')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('frntend'))

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
app.get('/todo', db.getData)
app.post('/list', db.createList)
app.put('/rename', db.updateList)
app.delete('/delete/:id', db.deleteList)
app.post('/task', db.createTask)
app.put('/taskdone', db.taskDone)
app.put('/update', db.updateTask)
app.delete('/clear/:id', db.deleteTask)
