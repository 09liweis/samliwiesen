var express = require('express');
var router = express.Router();

const TodoController = require('../controllers/todo.js');

router.route('/')
.get(TodoController.findList)
.post(TodoController.create);

router.route('/:id')
.get(TodoController.findDetail)
.put(TodoController.update)
.delete(TodoController.todo_delete);

router.route('/:id/update_step')
.post(TodoController.updateStep)

module.exports = router;