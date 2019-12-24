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
// app.get('/', (_request, response) => {
//   response.json({
//     info:
//    `'/todo -> curl -X GET http://localhost:3000/todo
//     /list -> curl -d "listname=duties" -X POST http://localhost:3000/list
//     /rename -> curl -d "listname=duty&id=11" -X PUT http://localhost:3000/rename
//     /delete/:id -> curl -X DELETE http://localhost:3000/delete/11
//     /task -> curl -d "taskname=workout&listid=2" -X POST http://localhost:3000/task
//     /taskdone -> curl -d "id=11&completed=true" -X PUT http://localhost:3000/taskdone
//     /update -> curl -d "listname=duty&id=11&notes=checkup&priority=2&date=29-12-2019" -X PUT http://localhost:3000/update
//     /clear/:id -> curl -X DELETE http://localhost:3000/clear/11`
//   })
// })
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
