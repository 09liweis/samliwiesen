var express= require('express');
var router = express.Router();

const ExperienceController = require('../controllers/experience.js');

router.route('/')
.get(ExperienceController.findList)
.post(ExperienceController.experience_new);

router.route('/:id')
.get(ExperienceController.experience_detail)
.put(ExperienceController.experience_update);

module.exports = router;