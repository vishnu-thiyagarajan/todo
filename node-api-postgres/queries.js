const Pool = require('pg').Pool
const pool = new Pool({
  user: 'api_user',
  host: 'localhost',
  database: 'todo_api',
  password: 'password',
  port: 5432
})
// curl -X GET http://localhost:3000/todo
const getData = async (request, response) => {
  try {
    const result = await pool.query('SELECT * FROM lists')
    const data = result.rows
    for (const ind in data) {
      try {
        const res2 = await pool.query(
          `select * from taskobjs where listid=${data[ind].id};`
        )
        data[ind].taskobjs = res2.rows
      } catch (e) {
        console.log('unable to fetch data')
      }
    }
    response.status(200).send(data)
  } catch (e) {
    console.log('unable to fetch data')
  }
}
// curl -d "listname=duties" -X POST http://localhost:3000/list
const createList = async (request, response) => {
  try {
    const listname = request.body.listname
    const result = await pool.query(`INSERT INTO lists (listname) VALUES ('${listname}') RETURNING id`)
    response.status(200).send(result.rows[0].id.toString())
  } catch (error) {
    console.log('unable to fetch data')
  }
}
// curl -d "listname=duty&id=11" -X PUT http://localhost:3000/rename
const updateList = async (request, response) => {
  try {
    const { listname, id } = request.body
    await pool.query(`UPDATE lists SET listname = '${listname}' WHERE id = ${id}`)
    response.status(200).send('modified data')
  } catch (error) {
    console.log('unable to modify data')
  }
}
// curl -X DELETE http://localhost:3000/delete/11
const deleteList = async (request, response) => {
  try {
    const id = parseInt(request.params.id)
    await pool.query(`DELETE FROM lists WHERE id = ${id}`)
    response.status(200).send('data deleted')
  } catch (error) {
    console.log('unable to modify data')
  }
}
// curl -d "taskname=workout&listid=2" -X POST http://localhost:3000/task
const createTask = async (request, response) => {
  try {
    const { listid, taskname } = request.body
    const result = await pool.query(`INSERT INTO taskobjs (taskname,listid) VALUES ('${taskname}',${listid}) RETURNING id`)
    response.status(200).send(result.rows[0].id.toString())
  } catch (error) {
    console.log('unable to insert data')
  }
}
// curl -d "listname=duty&id=11&completed=true&notes=checkup&priority=2&date=29-12-2019" -X PUT http://localhost:3000/update
const updateTask = async (request, response) => {
  try {
    const { id, listname, completed, notes, priority, date } = request.body
    await pool.query(`UPDATE lists SET listname = '${listname},
                                       completed = '${completed},
                                       notes = '${notes},
                                       priority = '${priority},
                                       date = '${date}' WHERE id = ${id}`)
    response.status(200).send('modified data')
  } catch (error) {
    console.log('unable to modify data')
  }
}
// curl -X DELETE http://localhost:3000/clear/11
const deleteTask = async (request, response) => {
  try {
    const id = parseInt(request.params.id)
    await pool.query(`DELETE FROM taskobjs WHERE id = ${id}`)
    response.status(200).send('data deleted')
  } catch (error) {
    console.log('unable to modify data')
  }
}
module.exports = {
  getData,
  createList,
  updateList,
  deleteList,
  createTask,
  updateTask,
  deleteTask
}
