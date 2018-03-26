var express = require('express');
var router = express.Router();

const TodoController = require('../controllers/todo.js');

router
.get('/', TodoController.todo_list);

router.post('/', TodoController.todo_new);

module.exports = router;