var express= require('express');
var router = express.Router();

const ProjecctController = require('../controllers/project.js');

router.route('/')
.get(ProjecctController.getList)
.post(ProjecctController.create);

router.route('/:id')
.get(ProjecctController.findDetail)
.put(ProjecctController.project_update);

module.exports = router;