var mongoose = require('mongoose'),
Project = require('../models/project');

exports.getList = (req, res) => {
  Project.find({}).sort('-created_at').exec((err, projects) => {
    handleError(res, err);
    res.json(projects);
  });
};

exports.create = (req, res) => {
  const newProject = new Project(req.body);
  newProject.save((err, project) => {
    handleError(res, err);
    res.json(project);
  });
};

exports.findDetail = (req, res) => {
  Project.findById(req.params.id, (err, project) => {
    handleError(res, err);
    res.json(project);
  });
};

exports.project_update = (req, res) => {
  let updateProject = req.body;
  updateProject.update_at = new Date();
  Project.findOneAndUpdate({_id: req.params.id}, updateProject, {upsert: true}, (err, project) => {
    handleError(res, err);
    res.json(project);
  });
};

exports.project_delete = (req, res) =>{
  Project.remove({_id: req.params.id}, (err) =>{
    handleError(res, err);
    res.json({ok:1,msg:'Project Deleted'});
  });
};


function handleError(res, err) {
  if (err) {
    res.send(err);
  }
}