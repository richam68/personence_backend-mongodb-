var express = require('express');
var router = express.Router();

var ctrlZone = require('../../controllers/organisationSetup/zone.controller');

router
    .route('/zone')
    .get(ctrlZone.getAllZone)
    .post(ctrlZone.zoneAddOne)
    .put(ctrlZone.zoneUpdateOne);

    router
    .route('/zoneAdd')
    .post(ctrlZone.zoneFindCreate)
    
    
router
    .route('/zone/:zoneId')
    .get(ctrlZone.getOneZone)
    .put(ctrlZone.zoneUpdateOne)    
    .delete(ctrlZone.zoneDeleteOne);

router
    .route('/zone/bulk')
    .post(ctrlZone.zoneBulkCreate)    
    
router
    .route('/organisation_id=:organisation_id')
    .get(ctrlZone.getAllZoneOrganizationId)

router
    .route('/organisation_id=:organisation_id/zoneId=:zoneId')
    .get(ctrlZone.getOneZoneOrganizationId)

module.exports = router;