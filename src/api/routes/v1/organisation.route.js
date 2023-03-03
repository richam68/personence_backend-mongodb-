var express = require('express');
var router = express.Router();

var routeOrganisation = require('../../controllers/organisation/organisation.controller');

router
    .route('/organisation')
    .get(routeOrganisation.getAllOrganisation)
    .post(routeOrganisation.createOrganisation)
    .put(routeOrganisation.updateOrganisation)

router
    .route('/organisation/:organisation_id')
    .get(routeOrganisation.getOrganisationById)


    .delete(routeOrganisation.deleteOrganisation);

module.exports = router;