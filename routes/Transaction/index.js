const express = require('express');
const router = express.Router();
const {verifyToken} = require('../../helpers')

//get all transaction
router.get('/', require('./controller').getTransaction);
//get transaction by id
router.get('/:userID', require('./controller').getTransactionById);
//get pending transaction
router.get('/status/pending', require('./controller').getStatusPending);
//get complete transaction
router.get('/status/completed', require('./controller').getStatusCompleted);
//post order items
router.post('/checkout', require('./controller').checkout);

module.exports = router
