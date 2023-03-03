var express = require('express');
var router = express.Router();

var ctrlDivision = require('../../controllers/organisationSetup/division.controller');

router
    .route('/division')
    .get(ctrlDivision.getAllDivision)
    .post(ctrlDivision.divisionAddOne)
   
    .put(ctrlDivision.divisionUpdateOne);

    router
    .route('/divisionadd')
    .post(ctrlDivision.divisionFindCreate)
    


router
    .route('/division/:divisionId')
    .get(ctrlDivision.getOneDivision)
    // .put(ctrlDivision.divisionUpdateOne)
    .delete(ctrlDivision.divisionDeleteOne);

    router
    .route('/division/bulk')
    .post(ctrlDivision.divisionBulkCreate);

router
    .route('/organisation_id=:organisation_id')
    .get(ctrlDivision.getAllDivisionOrganizationId)
router
    .route('/organisation_id=:organisation_id/divisionId=:divisionId')
    .get(ctrlDivision.getOneDivisionOrganizationId)

 module.exports = router;