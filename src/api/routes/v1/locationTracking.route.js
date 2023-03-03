var express = require('express');
var router = express.Router()

const ctrllocation=require('../../controllers/locationTracking/locationTracking.controller')
router
    .route('/locationTracking')
    .post(ctrllocation.insertLocation)
module.exports = router
