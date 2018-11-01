var mongoose = require('mongoose'),
Site = require('../models/site');

exports.site_detail = (req, res) => {
    Site.findById(req.params.id, (err, site) => {
        handleError(res, err);
        res.json(site);
    });
};

exports.site_update = (req, res) => {
    let updateSite = req.body;
    updateSite.update_at = new Date();
    Site.findOneAndUpdate({_id: req.params.id}, updateSite, {upsert: true}, (err, site) => {
        handleError(res, err);
        res.json(site);
    });
};

function handleError(res, err) {
    if (err) {
        res.send(err);
    }
}