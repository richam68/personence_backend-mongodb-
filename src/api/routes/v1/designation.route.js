var express = require('express');
var router = express.Router();

var ctrlDesignation = require('../../controllers/organisationSetup/designation.controller');

router
    .route('/designation')
    .get(ctrlDesignation.getAllDesignation)
    .post(ctrlDesignation.designationAddOne)
    .put(ctrlDesignation.designationUpdateOne); 

    router
    .route('/designationadd')
    .post(ctrlDesignation.designationFindCreate)
    

router
    .route('/designation/:designationId')
    .get(ctrlDesignation.getOneDesignation)
    .delete(ctrlDesignation.designationDeleteOne);

    router
    .route('/designation/bulk')
    .post(ctrlDesignation.designationBulkCreate);

router
    .route('/organisation_id=:organisation_id')
    .get(ctrlDesignation.getAllByOrgId)
router
    .route('/organisation_id=:organisation_id/designationId=:designationId')
    .get(ctrlDesignation.getOneByOrgId)

 module.exports = router;