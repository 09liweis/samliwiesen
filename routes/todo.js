var express = require('express');
var router = express.Router();

const TodoController = require('../controllers/todo.js');

router.route('/')
.get(TodoController.todo_list)
.post(TodoController.todo_new);

module.exports = router;