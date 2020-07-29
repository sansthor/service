const express = require('express');
const router = express.Router();
const {verifyToken} = require('../../helpers')

router.get('/find', require('./controller').filterUser);
router.get('/', require('./controller').get);
router.get('/:id', require('./controller').getById);
router.post('/login', require('./controller').login);
router.post('/register', require('./controller').register);
router.put('/update/:id', require('./controller').updateUser);


module.exports = router;