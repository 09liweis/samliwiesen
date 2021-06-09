var express= require('express');
var router = express.Router();

const {findList,create,findDetail,update} = require('../controllers/experience.js');

router.route('/')
.get(findList)
.post(create);

router.route('/:id')
.get(findDetail)
.put(update);

module.exports = router;