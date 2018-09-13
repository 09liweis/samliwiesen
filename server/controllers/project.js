var mongoose = require('mongoose'),
Project = require('../models/project');

exports.project_list = function(req, res) {
    Project.find({}).sort('-created_at').exec(function(err, projects) {
        handleError(res, err);
        res.json(projects);
    });
};

exports.project_new = function(req, res) {
    const newProject = new Project(req.body);
    newProject.save(function(err, project) {
        handleError(res, err);
        res.json(project);
    });
};

exports.project_detail = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        handleError(res, err);
        res.json(project);
    });
};

exports.project_update = function(req, res) {
    let updateProject = req.body;
    updateProject.update_at = new Date();
    Project.findOneAndUpdate({_id: req.params.id}, updateProject, {upsert: true}, function(err, project) {
        handleError(res, err);
        res.json(project);
    });
};

exports.project_delete = function(req, res) {
    Project.remove({_id: req.params.id}, function(err) {
        handleError(res, err);
        res.json('ok');
    });
};


function handleError(res, err) {
    if (err) {
        res.send(err);
    }
}