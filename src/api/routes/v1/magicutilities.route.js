var express = require('express');
var router = express.Router();
var ctrlUtilities = require('../../controllers/magicutilities/magicutilities.controller');
router
    .route('/identityCard')
    .post(ctrlUtilities.insertIdentityCard)
    
router
    .route('/identityCard/:organisation_id')
    .get(ctrlUtilities.showIdentityCard)
    .put(ctrlUtilities.editIdentityCard)

module.exports = router;