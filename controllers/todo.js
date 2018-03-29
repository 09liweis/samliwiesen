var mongoose = require('mongoose'),
Todo = require('../models/todo');

exports.todo_list = function(req, res) {
    Todo.find({}).sort('-created_at').exec(function(err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
};

exports.todo_new = function(req, res) {
    const newTodo = new Todo(req.body);
    newTodo.save(function(err, todo) {
        if (err) {
            res.send(err);
        }
        res.json(todo);
    });
};

exports.todo_detail = function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (err) {
            res.send(err);
        }
        res.json(todo);
    });
};

exports.todo_update = function(req, res) {
    Todo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, todo) {
        if (err) {
            res.send(err);
        }
        res.json(todo);
    });
};