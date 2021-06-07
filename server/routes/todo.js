var express = require('express');
var router = express.Router();

const {findList,create,findDetail,update,remove,updateStep} = require('../controllers/todo.js');

router.route('/')
.get(findList)
.post(create);

router.route('/:id')
.get(findDetail)
.put(update)
.delete(remove);

router.route('/:id/update_step')
.post(updateStep)

module.exports = router;