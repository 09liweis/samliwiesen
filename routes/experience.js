var express= require('express');
var router = express.Router();

const ExperienceController = require('../controllers/experience.js');

router.route('/')
.get(ExperienceController.experience_list)
.post(ExperienceController.experience_new);

router.route('/:id')
.put(ExperienceController.experience_update);

module.exports = router;