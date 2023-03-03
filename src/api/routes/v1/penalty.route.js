var express = require('express');
var router = express.Router();

var ctrlPenalty = require('../../controllers/attendance/penalty.controller');

router
    .route('/penalty')
    .get(ctrlPenalty.getAllPenalty)
    .post(ctrlPenalty.penaltyAddOne);

router
    .route('/penalty/:penaltyId')
    .get(ctrlPenalty.getOnePenalty)
    .put(ctrlPenalty.penaltyUpdateOne)
    .delete(ctrlPenalty.penaltyDeleteOne);

router
.route('/client_id=:client_id')   
.get(ctrlPenalty.getAllByClientId);

module.exports = router;