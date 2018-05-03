var Experience = require('../models/experience');

exports.experience_list = function(req, res) {
    Experience.find({}).sort('-start_date').exec(function(err, experiences) {
        handleError(res, err);
        res.json(experiences);
    });
};

function handleError(res, err) {
    if (err) {
        res.send(err);
    }
}