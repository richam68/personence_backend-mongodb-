var express = require('express');
var router = express.Router();

var ctrlLocation = require('../../controllers/location/location.controller');

router
    .route('/location')
    .get(ctrlLocation.getAllLocation)
    .post(ctrlLocation.addressAddOne)
    .put(ctrlLocation.addressUpdateOne);



router
    .route('/location/:addressId')
    .get(ctrlLocation.getOneAddress)
    .delete(ctrlLocation.addressDeleteOne);
router
    .route('/organisation_id=:organisation_id')
    .get(ctrlLocation.getAllAddressOrganizationId)
    router
    .route('/client_id=:client_id')
    .get(ctrlLocation.getAllLocationByClientId)
router
    .route('/organisation_id=:organisation_id/addressId=:addressId')
    .get(ctrlLocation.getOneAddressOrganizationId)
router
    .route('/places')
    .post(ctrlLocation.addressAutocomplete)

module.exports = router;