const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../helpers');

//get all transaction
router.get('/', require('./controller').getTransaction);
//get transaction by id
router.get('/:userID', require('./controller').getTransactionById);
//get pending transaction
//get complete transaction/purchase history
router.get('/status/completed/:id', require('./controller').getStatusCompleted);
//post order items
router.put('/checkout', require('./controller').checkout);
//post order before payment
router.post('/cart', require('./controller').cart);
//get cart by userID
router.get('/cart/:userID', require('./controller').cartByID);
//count transaction status in progress
router.get('/count/:userID', require('./controller').count);

module.exports = router;
