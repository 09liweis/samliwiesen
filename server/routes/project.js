var express= require('express');
var router = express.Router();

const {getList,create,findDetail,update} = require('../controllers/project.js');

router.route('/')
.get(getList)
.post(create);

router.route('/:id')
.get(findDetail)
.put(update);

module.exports = router;