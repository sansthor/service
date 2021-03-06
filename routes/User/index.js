const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../helpers');

//get filter for search menu
router.get('/find', require('./controller').filterUser);

//get all user data
router.get('/', require('./controller').get);
//get all order for seller
router.get('/order/:talentID', require('./controller').getAllOrderById);
//get by params id
router.get('/:id', require('./controller').getById);
//user registration
router.post('/login', require('./controller').login);
router.post('/register', require('./controller').register);
//enroll service
router.put('/register/service/:id', require('./controller').registerService);
//register bank
router.put('/register/account/:id', require('./controller').registerBank);
//update profile user
router.put('/update/:id', require('./controller').updateUser);

module.exports = router;
