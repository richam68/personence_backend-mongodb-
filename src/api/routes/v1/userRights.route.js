var express = require('express');
var router = express.Router();

var ctrlUserRights = require('../../controllers/businessUnit/userRights.controller');

router
    .route('/userRights')
    .get(ctrlUserRights.getAllUserRights)
    .post(ctrlUserRights.userRightsAddOne);

router
    .route('/userRights/:userRightsId')
    .get(ctrlUserRights.getOneUserRights)
    .put(ctrlUserRights.userRightsUpdateOne)
    .delete(ctrlUserRights.userRightsDeleteOne);

// router
//     .route('/organisation_id=:organisation_id/zoneId=:zoneId')
//     .get(ctrlZone.getOneZoneOrganizationId)

 module.exports = router;