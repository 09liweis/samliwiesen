var express = require('express');
var router = express.Router();

const TransactionController = require('../controllers/transaction.js');

router.route('/')
.get(TransactionController.transaction_list)
.post(TransactionController.transaction_new);

router.route('/categories')
.get(TransactionController.category_list);

router.route('/:id')
.get(TransactionController.transaction_detail)
.put(TransactionController.transaction_update)
.delete(TransactionController.transaction_delete);

module.exports = router;