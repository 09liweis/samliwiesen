var express = require('express');
var router = express.Router();

const TodoController = require('../controllers/todo.js');

router
.get('/todos', TodoController.todos_list);