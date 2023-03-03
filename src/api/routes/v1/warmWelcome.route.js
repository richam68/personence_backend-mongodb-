var express = require('express');
var router = express.Router();

var ctrlWarmWelcome = require('../../controllers/socialAdmin/warmWel.controller');

router
    .route('/warmwel')
    .get(ctrlWarmWelcome.getAllWarmWel)
    .post(ctrlWarmWelcome.insertWarmWel);

router
//.route('/warmWelcome/date=:date/organisation_id=:organisation_id')
.route('/getdays/organisation_id=:organisation_id')
.get(ctrlWarmWelcome.getAllWarmWelcomeByDate)

router
.route('/warmWelcome/organisation_id=:organisation_id')
.get(ctrlWarmWelcome.getAllWarmWelcomeByOrgId)

 module.exports = router;