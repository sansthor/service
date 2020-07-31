const express = require('express');
const router = express.Router();

//AdminRegister
router.post('/registerAdmin', require('./controller').registerAdmin);

//AdminLogin
router.post('/loginAdmin', require('./controller').loginAdmin);

//GetDataUser
router.get('/getDataUser', require('./controller').getDataUser)

//Get User Data By Params id
router.get('/getDataUser/:id', require('./controller').getUserById);

//Update User Data
router.put('/updateDataUser/:id', require('./controller'). updateUserData)

module.exports = router;