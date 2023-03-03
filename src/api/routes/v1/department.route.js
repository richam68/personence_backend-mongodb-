var express = require('express');
var router = express.Router();

var ctrlDepartment = require('../../controllers/organisationSetup/department.controller');

router
    .route('/department')
    .get(ctrlDepartment.getAllDepartment)
   .post(ctrlDepartment.departmentAddOne)
   // 
   // .post(ctrlDepartment.departmentFindCreate)
     .put(ctrlDepartment.departmentUpdateOne);

router
    .route('/department/bulk')
    .post(ctrlDepartment.departmentBulkCreate);

    router
    .route('/departmentadd')
    .post(ctrlDepartment.departmentAddOne)
    

router
    .route('/department/:departmentId')
    .get(ctrlDepartment.getOneDepartment)
    .delete(ctrlDepartment.departmentDeleteOne);
router
    .route('/organisation_id=:organisation_id')
    .get(ctrlDepartment.getAllByOrgId)
router
    .route('/organisation_id=:organisation_id/departmentId=:departmentId')
    .get(ctrlDepartment.getOneByOrgId)

module.exports = router;