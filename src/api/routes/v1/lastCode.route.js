var express = require('express');
var router = express.Router();

var ctrlLastCode = require('../../controllers/lastCode/lastCode.controller');

router
    .route('/lastCode')
    .post(ctrlLastCode.lastCodeAddOne);

    router
    .route('/zoneLastCode')
    .post(ctrlLastCode.zonelastCode);

    router
    .route('/designationLastCode')
    .post(ctrlLastCode.designationLastCode);

    router
    .route('/divisionLastCode')
    .post(ctrlLastCode.divisionLastCode);

    router
    .route('/locationLastCode')
    .post(ctrlLastCode.locationLastCode);



module.exports = router;