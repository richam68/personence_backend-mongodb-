var express = require('express');
var router = express.Router();

var ctrlShift = require('../../controllers/shift/shiftAll.controller');

router
    .route('/shift')
    .get(ctrlShift.getAllShift)
    .post(ctrlShift.shiftAddOne);
router
    .route('/shift/:shiftAllId')
    .get(ctrlShift.getOneShiftAll)
    .put(ctrlShift.shiftAllUpdateOne)
    .delete(ctrlShift.shiftDeleteOne);
  
    router
    .route('/client_id=:client_id')
    .get(ctrlShift.getAllShift)
router
    .route('/client_id=:client_id/shiftAllId=:shiftAllId')
    .get(ctrlShift.getOneShiftAll)

module.exports = router;