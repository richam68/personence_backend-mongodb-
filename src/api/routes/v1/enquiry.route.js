var express = require('express');
var router = express.Router();

var ctrlEnquiry = require('../../controllers/enquiry/enquiry.controller');

router
    .route('/enquiry')
    .post(ctrlEnquiry.insertEnquiry)

module.exports = router;