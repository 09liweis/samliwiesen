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
  Todo.find(query, '_id name date steps status', options).sort('-created_at').exec((err, todos) => {
    handleError(res, err);
    res.status(200).json(todos);
  });
};

exports.todo_new = (req, res) => {
  const steps = req.body.steps;
  const todo = {
    name:req.body.name,
    date:req.body.date,
    status:req.body.status,
  }
  if (steps) {
    todo.steps = steps;
  }
  //handle post data from wechat mini program
  if (typeof steps == 'string') {
    todo.steps = JSON.parse(steps);
  }
  const newTodo = new Todo(todo);
  newTodo.save((err, todo) => {
    handleError(res, err);
    res.status(200).json(todo);
  });
};

exports.todo_detail = (req, res) => {
  const todoId = req.params.id;
  if (!todoId) {
    return res.status(404).json({msg:'Invalid todo Id'});
  }
  Todo.findById(req.params.id, (err, todo) => {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json(todo);
  });
};

exports.todo_update = (req, res) => {
  const steps = req.body.steps;
  const todo = {
    name:req.body.name,
    date:req.body.date,
    status:req.body.status,
  }
  if (steps) {
    todo.steps = steps;
  }
  //handle post data from wechat mini program
  if (typeof steps == 'string') {
    todo.steps = JSON.parse(steps);
  }
  todo.update_at = new Date();
  Todo.findOneAndUpdate({_id: req.params.id}, todo, {upsert: true}, (err, todo) => {
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

exports.updateStep = (req,resp) => {
  const todoId = req.params.id;
  var query = {_id:todoId};
  let {step,mode} = req.body;
  if (!step.name) {
    return resp.status(400).json({msg: 'Missing step name'});
  }
  if (!step.status) {
    step.status = 'pending';
  }
  if (!mode) {
    mode = 'add';
  }
  let update = {};
  switch (mode) {
    case 'add':
      update['$push'] = {steps:step};
      break;
    case 'delete':
      update['$pull'] = {steps:{_id:step._id}}
      break;
    case 'update':
      if (step.idx == '') {
        return resp.status(400).json({msg: 'Missing step idx'});
      }
      query['steps._id'] = step._id;
      delete step._id;
      var key = 'steps.'+step.idx;
      update['$set'] = {};
      delete step.idx;
      update['$set'][key] = step;
      break;
    default:
      break;
  }
  Todo.findOneAndUpdate(query,update,{returnNewDocument:true},(err,todo) => {
    if (err) {
      return resp.status(400).json({err});
    }
    resp.status(200).json({msg:'Update Success'});
  });
}


function handleError(res, err) {
  if (err) {
    res.send(err);
  }
}