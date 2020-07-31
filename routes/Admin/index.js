const express = require('express');
const router = express.Router();

//AdminRegister
router.post('/registerAdmin', require('./controller').registerAdmin);

//AdminLogin
router.post('/loginAdmin', require('./controller').loginAdmin);

//GetDataUser
router.get('/getDataUser', require('./controller').getDataUser)

module.exports = router;