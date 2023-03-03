var express = require('express');
var router = express.Router();

var ctrlZone = require('../../controllers/organisationSetup/zone.controller');

router
    .route('/zone')
    .get(ctrlZone.getAllZone)
    .post(ctrlZone.zoneAddOne);

    router
    .route('/zonefindcreate')
    .post(ctrlZone.zoneFindCreate)
    
    

router
    .route('/zone')
    .get(ctrlZone.getOneZone)
    .put(ctrlZone.zoneUpdateOne)
    
    .delete(ctrlZone.zoneDeleteOne);
    
router
    .route('/organisation_id=:organisation_id')
    .get(ctrlZone.getAllZoneOrganizationId)
router
    .route('/organisation_id=:organisation_id/zoneId=:zoneId')
    .get(ctrlZone.getOneZoneOrganizationId)

 module.exports = router;