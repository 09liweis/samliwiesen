var express= require('express');
var router = express.Router();

const ProjecctController = require('../controllers/project.js');

router.route('/')
.get(ProjecctController.project_list)
.post(ProjecctController.project_new);

router.route('/:id')
.get(ProjecctController.project_detail)
.put(ProjecctController.project_update);

module.exports = router;