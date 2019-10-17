var mongoose = require('mongoose'),
Todo = require('../models/todo');

exports.todo_list = (req, res) => {
	const {page,limit,status} = req.query;
	let options = {};
	let query = {};
	if (status) {
		query.status = status
	}
	//TODO: fix pagination
	if (page) {
		options.skip = parseInt(page);
	} else {
		options.skip = 0;
	}
	if (limit) {
		options.limit = parseInt(limit);
	}
	Todo.find(query, '_id name date steps status created_at', options).sort('-created_at').exec((err, todos) => {
		handleError(res, err);
		res.status(200).json(todos);
	});
};

exports.todo_new = (req, res) => {
	const todo = {
		name:req.body.name,
		date:req.body.date,
		steps:req.body.steps,
		status:req.body.status
	}
	const newTodo = new Todo(todo);
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
		res.status(200).json({ok:1});
	});
};


function handleError(res, err) {
	if (err) {
		res.send(err);
	}
}