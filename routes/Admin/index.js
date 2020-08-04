const express = require('express');
const router = express.Router();

//AdminRegister
router.post('/registerAdmin', require('./controller').registerAdmin);

//AdminLogin
router.post('/loginAdmin', require('./controller').loginAdmin);

//Data Admin
router.get('/', require('./controller').getAdmin);

//GetDataUser
router.get('/getDataUser', require('./controller').getDataUser)

//Get User Data By Params id
router.get('/getDataUser/:id', require('./controller').getUserById);

//Get Filter User Data by UserName
router.get('/getUserData', require('./controller').filterUserData);

//Update Admin Data
router.put('/updatedataadmin/:id', require('./controller').updateDataAdmin)

//Delete Admin Data
router.delete('/deletedataadmin/:id', require('./controller').deleteAdminData)

//GetServiceData
router.get('/getservicedata', require('./controller').getServiceData)

//Update Service Data
router.put('/updatedataservice/:id', require('./controller').updateDataService)

module.exports = router;