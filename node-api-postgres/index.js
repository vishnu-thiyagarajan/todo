const express = require('express')
const db = require('./queries')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (_request, response) => {
  response.json({
    info:
   `'/todo -> curl -X GET http://localhost:3000/todo
    /list -> curl -d "listname=duties" -X POST http://localhost:3000/list
    /rename -> curl -d "listname=duty&id=11" -X PUT http://localhost:3000/rename
    /delete/:id -> curl -X DELETE http://localhost:3000/delete/11
    /task
    /update
    /clear/:id`
  })
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

const frntapp = express()
const frntport = 8000
frntapp.use(express.static('frntend'))
frntapp.listen(frntport, () => {
  console.log(`frontend running on port ${frntport}.`)
})
