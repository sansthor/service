const express = require('express');
const router = express.Router();


//get all list service
router.get('/', require('./controller').getService);
//get service details
router.get('/details/:title', require('./controller').getDetails)
// get service by user upload
router.get('/find/:userID', require('./controller').getUserUpload)
//post service
router.post('/post-service', require('./controller').postService)


module.exports = router