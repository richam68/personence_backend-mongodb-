var express = require('express');
var router = express.Router();

var ctrlShiftRotation = require('../../controllers/shift/shiftRotation.controller');

router
    .route('/shiftRotation')
    .get(ctrlShiftRotation.getAllShiftRotation)
    .post(ctrlShiftRotation.shiftRotationAddOne);
router
    .route('/shiftRotation/:shiftRotationId')
    .get(ctrlShiftRotation.getOneshiftRotation)
    .put(ctrlShiftRotation.shiftRotationUpdateOne)
    .delete(ctrlShiftRotation.shiftRotationDeleteOne);
// router
//     .route('/client_id=:client_id')
//     .get(ctrlShiftRotation.getAllShiftRotation)
//     router
//     .route('/client_id=:client_id/shiftRotationId=:shiftRotationId')
//     .get(ctrlShiftRotation.getOneshiftRotation)
 
module.exports = router;




