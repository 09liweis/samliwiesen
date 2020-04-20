var Experience = require('../models/experience');

exports.experience_list = (req, res) => {
  Experience.find({}).sort('-start_date').exec((err, experiences) => {
    handleError(res, err);
    res.json(experiences);
  });
};

exports.experience_detail = (req, res) => {
  Experience.findById(req.params.id, (err, experience) => {
    handleError(res, err);
    res.json(experience);
  });
};

exports.experience_new = (req, res) => {
  delete req.body._id;
  const newExperience = new Experience(req.body);
  newExperience.save((err, experience) => {
    handleError(res, err);
    res.json(experience);
  });
};

exports.experience_update = (req, res) => {
  let updateExperience = req.body;
  updateExperience.update_at = new Date();
  Experience.findOneAndUpdate({_id: req.params.id}, updateExperience, {upsert: true}, (err, experience) => {
    handleError(res, err);
    res.json(experience);
  });
};

function handleError(res, err) {
  if (err) {
    res.send(err);
  }
}