var express = require('express');
var router = express.Router();

var ctrlEmpType = require('../../controllers/businessUnit/empType.controller');

router
    .route('/empType')
    .get(ctrlEmpType.getAllEmpType)
    .post(ctrlEmpType.empTypeAddOne);

router
    .route('/empType/:empTypeId')
    .get(ctrlEmpType.getOneEmpType)
    .put(ctrlEmpType.empTypeUpdateOne)
    .delete(ctrlEmpType.empTypeDeleteOne);
router
    .route('/organisation_id=:organisation_id')
    .get(ctrlEmpType.getAllByOrgId)


 module.exports = router;