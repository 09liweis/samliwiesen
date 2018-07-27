var mongoose = require('mongoose'),
Todo = require('../models/todo');

exports.todo_list = function(req, res) {
    Todo.find({}, '_id name steps status').sort('-created_at').exec(function(err, todos) {
        handleError(res, err);
        res.json(todos);
    });
};

exports.todo_new = function(req, res) {
    const newTodo = new Todo(req.body);
    newTodo.save(function(err, todo) {
        handleError(res, err);
        res.json(todo);
    });
};

exports.todo_detail = function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        handleError(res, err);
        res.json(todo);
    });
};

exports.todo_update = function(req, res) {
    let updateTodo = req.body;
    updateTodo.update_at = new Date();
    Todo.findOneAndUpdate({_id: req.params.id}, updateTodo, {upsert: true}, function(err, todo) {
        handleError(res, err);
        res.json(todo);
    });
};

exports.todo_delete = function(req, res) {
    Todo.remove({_id: req.params.id}, function(err) {
        handleError(res, err);
        res.json('ok');
    });
};


function handleError(res, err) {
    if (err) {
        res.send(err);
    }
}