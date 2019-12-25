const express = require('express')
const db = require('./queries')
const router = express.Router()

router.get('/todo', db.getData)
router.post('/list', db.createList)
router.put('/rename', db.updateList)
router.delete('/delete/:id', db.deleteList)
router.post('/task', db.createTask)
router.put('/taskdone', db.taskDone)
router.put('/update', db.updateTask)
router.delete('/clear/:id', db.deleteTask)

module.exports = router
