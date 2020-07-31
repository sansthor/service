const express = require('express');
const router = express.Router();

router.get('/', require('./controller').getService);
router.get('/details/:title', require('./controller').getDetails)
router.get('/find/:userID', require('./controller').getUserUpload)
router.post('/post-service', require('./controller').postService)


module.exports = router