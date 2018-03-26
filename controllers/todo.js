var mongoose = require('mongoose'),
Todo = mongoose.model('Todo');

exports.todo_list = function(req, res) {
    Todo.find({}, function(err, todos) {
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