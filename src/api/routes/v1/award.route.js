var express = require('express');
var router = express.Router();

var ctrlAward = require('../../controllers/socialAdmin/award.controller');

router
    .route('/award')
    .get(ctrlAward.getAllAwards)
    .post(ctrlAward.insertAwards);
   
//To get all awards by organisation id    
router
    .route('/awardbyorgid')
    .get(ctrlAward.getAllAwardsByOrgId);

//To get all awards by date
router
.route('/awardbydate')
.get(ctrlAward.getAwardsByMonth);

//To get all awards by organisation id and date
router 
.route('/awardbyorganddate/organisation_id=:organisation_id')
.get(ctrlAward.getAllAwardsByOrgAndMonth);
    

module.exports = router;