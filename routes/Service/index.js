const express = require('express');
const router = express.Router();
const {verifyToken} = require('../../helpers')


//get all list service
router.get('/', require('./controller').getService);
//get service details
router.get('/details/:id', require('./controller').getDetails)
// get service by user upload
router.get('/find/:userID', require('./controller').getUserUpload)

// get filter by category
router.get('/findby/:category', require('./controller').getFilterCategory)
//post service
router.post('/post-service', verifyToken, require('./controller').postService)
//delete service
router.delete('/delete/:id', verifyToken, require('./controller').deleteService)


module.exports = router