var mongoose = require('mongoose'),
Todo = require('../models/todo');

exports.todo_list = (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit;
    let options = {};
    //TODO: fix pagination
    if (page) {
        options.skip = parseInt(page);
    } else {
        options.skip = 0;
    }
    if (limit) {
        options.limit = parseInt(limit);
    }
    Todo.find({}, '_id name steps status', options).sort('-created_at').exec((err, todos) => {
        handleError(res, err);
        res.status(200).json(todos);
    });
};

exports.todo_new = (req, res) => {
    const newTodo = new Todo(req.body);
    newTodo.save((err, todo) => {
        handleError(res, err);
        res.status(200).json(todo);
    });
};

exports.todo_detail = (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        handleError(res, err);
        res.status(200).json(todo);
    });
};

exports.todo_update = (req, res) => {
    let updateTodo = req.body;
    updateTodo.update_at = new Date();
    Todo.findOneAndUpdate({_id: req.params.id}, updateTodo, {upsert: true}, (err, todo) => {
        handleError(res, err);
        res.status(200).json(todo);
    });
};

exports.todo_delete = (req, res) => {
    Todo.remove({_id: req.params.id}, (err) => {
        handleError(res, err);
        res.json('ok');
    });
};


function handleError(res, err) {
    if (err) {
        res.send(err);
    }
}