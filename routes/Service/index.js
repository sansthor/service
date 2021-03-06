const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../helpers');

//get all services
router.get('/', require('./controller').getAllServices);
//get all best services
router.get('/best', require('./controller').getBestServices);
//get all popular services
router.get('/popular', require('./controller').getPopularServices);
//get service details
router.get('/details/:id', require('./controller').getDetails);
// get service by user upload
router.get('/find/:userID', require('./controller').getUserUpload);

// get filter by category
router.get('/findby/:category', require('./controller').getFilterCategory);
//post service
router.post('/post-service', verifyToken, require('./controller').postService);
//delete service
router.delete(
    '/delete/:id',
    verifyToken,
    require('./controller').deleteService
);
//put service
router.put('/edit/:id', verifyToken, require('./controller').putService);

module.exports = router;
