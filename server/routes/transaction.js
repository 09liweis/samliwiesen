var express = require('express');
var router = express.Router();
const {verify} = require('../helpers/verifyToken');

const TransactionController = require('../controllers/transaction.js');

router.post('/',verify,TransactionController.findList);

router.post('/new',verify,TransactionController.create);

router.route('/categories')
.get(TransactionController.category_list);

router.route('/:id')
.post(TransactionController.detail)
.put(TransactionController.update)
.delete(TransactionController.delete);

module.exports = router;