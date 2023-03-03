var express = require('express');
var router = express.Router();

var ctrlOrgSpocs = require('../../controllers/businessUnit/orgSpocs.controller');

router
    .route('/orgSpocs')
    .get(ctrlOrgSpocs.getAllOrgSpocs)
    .post(ctrlOrgSpocs.orgSpocsAddOne);

router
    .route('/orgSpocs/:orgSpocsId')
    .get(ctrlOrgSpocs.getOneOrgSpocs)
    .put(ctrlOrgSpocs.orgSpocsUpdateOne)
    .delete(ctrlOrgSpocs.orgSpocsDeleteOne);
router
    .route('/organisation_id=:organisation_id')
    .get(ctrlOrgSpocs.getAllByOrgId)
router
    .route('/organisation_id=:organisation_id/orgSpocsId=:orgSpocsId')
    .get(ctrlOrgSpocs.getOneByOrgId)
// http://localhost:9000/v1/orgSpocs/orgSpocs/EmpCognitoID
router
    .route('/EmpCognitoID=:EmpCognitoID')
    .get(ctrlOrgSpocs.getOrgSpocByEmpCognitoID)
router
    .route('/orgSpocsRights')
    .post(ctrlOrgSpocs.createOrgSpocsRights)
    .put(ctrlOrgSpocs.orgSpocsRightsUpdateOne)
router
    .route('/orgSpocsRights/:EmpCognitoID')
    .get(ctrlOrgSpocs.getOrgSpocsRights)
router
    .route('/orgSpocsRights/:organisation_id')
    .get(ctrlOrgSpocs.getAllBuWhichChecked)

    router
    .route('/getBuByEmployee/:EmpCognitoID/:organisation_id')
    .get(ctrlOrgSpocs.getBuByEmployee)
router
    .route('/getEmpBuWise/:EmpCognitoID')
    .get(ctrlOrgSpocs.getEmpBuWise)


module.exports = router;