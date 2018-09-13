var mongoose = require('mongoose'),
Site = require('../models/site');

exports.site_detail = function(req, res) {
    Site.findById(req.params.id, function(err, site) {
        handleError(res, err);
        res.json(site);
    });
};

exports.site_update = function(req, res) {
    let updateSite = req.body;
    updateSite.update_at = new Date();
    Site.findOneAndUpdate({_id: req.params.id}, updateSite, {upsert: true}, function(err, site) {
        handleError(res, err);
        res.json(site);
    });
};

function handleError(res, err) {
    if (err) {
        res.send(err);
    }
}