var express = require('express');
var router = express.Router();

const TransactionController = require('../controllers/transaction.js');

router.route('/')
.get(TransactionController.transaction_list);