const express = require('express');
const router = express.Router();
const {verifyToken} = require('../../helpers')


//get filter for search menu
router.get('/find', require('./controller').filterUser);

//get all user data
router.get('/', require('./controller').get);

//get by params id
router.get('/:id', require('./controller').getById);
//user registration
router.post('/login', require('./controller').login);
router.post('/register', require('./controller').register);
//enroll service
router.post('/register/service', require('./controller').registerService);
//update profile user
router.put('/update/:id', require('./controller').updateUser);


module.exports = router;