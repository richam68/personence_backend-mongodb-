var express = require('express');
var router = express.Router()
const ctrlteamStatus = require('../../controllers/teamStatus/teamStatus.controller')

router
  .route('/teamemployee/:date/:organisation_id/:Buid')
  .get(ctrlteamStatus.getTeamEmployeeDate)

router
  .route('/teamemployee/:organisation_id/:Buid')
  .get(ctrlteamStatus.getTeamEmployee)

router
  .route('/total/CheckInType/:organisation_id/:searchDate/:Buid')
  .get(ctrlteamStatus.getTotalCheckInByDate)

router
  .route('/teamWorkHrs')
  .post(ctrlteamStatus.getTeamWorkingHours)

router
  .route('/totalpresentAvg/:organisation_id/:fromdate/:todate/:Buid')
  .get(ctrlteamStatus.getAvgPrsntEmpByDate)

router
  .route('/lateCheckIn/:organisation_id/:searchDate/:Buid')
  .get(ctrlteamStatus.getTotalEmployeeLateCheckIn)

router
  .route('/empOnLeave/:organisation_id/:searchDate/:Buid')
  .get(ctrlteamStatus.getTotalEmployeeOnLeave)

router
  .route('/totalpresent/:organisation_id/:clockInOutDate/:Buid')
  .get(ctrlteamStatus.getTotalPresentEmpByDate)


  router
  .route('/teamBreak/:organisation_id/:todate/:fromdate/:Buid')
  .get(ctrlteamStatus.getTeamBreakHrs)


  router
  .route('/employeeByrptManager/organisation_id=:organisation_id/:Buid')
  .get(ctrlteamStatus.getAllEmployeeByreportingManager)

  router
  .route('/empbyrptid/organisation_id=:organisation_id')
  .get(ctrlteamStatus.getEmpByRptManagerId)

  module.exports = router;
