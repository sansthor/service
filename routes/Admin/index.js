const express = require('express');
const router = express.Router();

//adminLogin
router.post('/loginAdmin', require('./controller').loginAdmin);
router.post('/registerAdmin', require('./controller').registerAdmin);
router.get('/getUser', require('./controller').getUser);

module.exports = router;