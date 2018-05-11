var Experience = require('../models/experience');

exports.experience_list = function(req, res) {
    Experience.find({}).sort('-start_date').exec(function(err, experiences) {
        handleError(res, err);
        res.json(experiences);
    });
};

exports.experience_detail = function(req, res) {
    Experience.findById(req.params._id, function(err, experience) {
        handleError(res, err);
        res.json(experience);
    });
};

exports.experience_new = function(req, res) {
    const newExperience = new Experience(req.body);
    newExperience.save(function(err, experience) {
        handleError(res, err);
        res.json(experience);
    });
};

exports.experience_update = function(req, res) {
    let updateExperience = req.body;
    updateExperience.update_at = new Date();
    Experience.findOneAndUpdate({_id: req.params.id}, updateExperience, {upsert: true}, function(err, experience) {
        handleError(res, err);
        res.json(experience);
    });
};

function handleError(res, err) {
    if (err) {
        res.send(err);
    }
}