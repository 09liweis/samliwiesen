var express= require('express');
var router = express.Router();

const ExperienceController = require('../controllers/experience.js');

router.route('/')
.get(ExperienceController.findList)
.post(ExperienceController.create);

router.route('/:id')
.get(ExperienceController.findDetail)
.put(ExperienceController.experience_update);

module.exports = router;