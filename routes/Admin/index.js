const express = require('express');
const router = express.Router();

//AdminRegister
router.post('/registerAdmin', require('./controller').registerAdmin);

//AdminLogin
router.post('/loginAdmin', require('./controller').loginAdmin);

//Data Admin
router.get('/', require('./controller').getAdmin);
//Get all Service status pending
router.get('/order/status', require('./controller').getStatusPending)
// get all status/done
router.get('/order/status/done', require('./controller').getStatusDone)
// transfer balance
router.put('/order/transfer/:id', require('./controller').transferBalance)
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

//Get Data Transaction 
router.get('/transaction', require('./controller').getTransaction);

module.exports = router;