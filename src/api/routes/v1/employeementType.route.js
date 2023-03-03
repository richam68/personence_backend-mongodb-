var express = require('express');
var router = express.Router();

var ctrlEmpType = require('../../controllers/employee/employeementType.controller');

router
    .route('/employeementType')
    .post(ctrlEmpType.insertEmployeementType);

router
    .route('/organisation_id=:organisation_id')
    .get(ctrlEmpType.getEmployeementTypeByOrgID)

 module.exports = router;