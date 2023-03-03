var express = require('express');
var router = express.Router();

var ctrlUserDetails = require('../../controllers/employee/userDetails.controller');

router
    .route('/userDetails')
    .post(ctrlUserDetails.insertUserDetails)
router
    .route('/userDetails/EmpCognitoID=:EmpCognitoID')
    .get(ctrlUserDetails.getUserDetailsByEmpCognitoID)
    
module.exports = router;