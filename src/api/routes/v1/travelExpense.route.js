var express = require('express');
var router = express.Router();

var ctrlTravel = require('../../controllers/travelExpense/travelExpense.controller');
var ctrlTravelLog = require('../../controllers/travelExpense/travelExpense_log.controller');
var ctrlTeravelDetails = require('../../controllers/travelExpense/travelExpense_Details.controller');
var ctrlTeravelDetailsLog = require('../../controllers/travelExpense/travelExpense_Details_log.controller');

router 
    .route('/travelExpense')
    .get(ctrlTravel.getTravelExpense)
    .post(ctrlTravel.createTravelExpense)
router 
    .route('/travelExpenselog')
    .get(ctrlTravelLog.getTravelExpenseLog)
    .post(ctrlTravelLog.createTravelExpenselog)

router 
    .route('/travelExpenseDetails')
    .get(ctrlTeravelDetails.getTravelExpenseDetails)
    .post(ctrlTeravelDetails.createTravelDetails)
router 
    .route('/travelExpenseDetailslog/:travelExpense_id')
    .get(ctrlTeravelDetailsLog.getTravelExpenseDetailslog)
    // .post(ctrlTeravelDetailsLog.createTravelDetailslog)
router 
    .route('/travelExpenseDetailslog')
    // .get(ctrlTeravelDetailsLog.getTravelExpenseDetailslog)
    .post(ctrlTeravelDetailsLog.createTravelDetailslog)
router 
    .route('/travelExpenseDetails/:_id')
    .put(ctrlTeravelDetails.updateTravelExpenseDetails)
router 
    .route('/travelExpense/:travelExpense_id')
    .put(ctrlTravel.updateTravelExpense)
router 
    .route('/travelExpense/:employee_id/:date')
    .get(ctrlTravel.getTravelExpenseSheet)

module.exports = router;
