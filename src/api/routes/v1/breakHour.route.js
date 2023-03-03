var express = require('express');
var router = express.Router();

var ctrlBreakHour = require('../../controllers/attendance/breakHour.controller')

router
    .route('/breakHour/emp_Id=:emp_Id')
    .get(ctrlBreakHour.getBreakHourByEmployee)
router
    .route('/breakHour')
    .post(ctrlBreakHour.insertBreakHour)
    .put(ctrlBreakHour.updateBreakHour)

router
    .route('/totalBreak/date=:date/emp_Id=:emp_Id')
    .get(ctrlBreakHour.getBreakHrs)

router
    .route('/totalBreak')
    .post(ctrlBreakHour.getBreakHrsbyPeriod)


router
    .route('/teamBreak/:emp_id/:organisation_id/:todate/:fromdate')
    .get(ctrlBreakHour.getTeamBreakHrs)

router
    .route('/breakDataForDesktop/:emp_id/:date')
    .get(ctrlBreakHour.getEmpBreakDetailsByDate)  

module.exports = router
