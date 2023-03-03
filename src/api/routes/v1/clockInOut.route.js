var express = require('express');
var router = express.Router();

var ctrlClockInOut = require('../../controllers/attendance/clockInOut.controller');

const verify=require('../../middlewares/verify')



router
    // swagger tested working
    //inuse
    .route('/clockInOut/date=:date/empId=:empId')
    .get(ctrlClockInOut.getAllAttendenceByDate)

router
    // swagger tested working
    
    .route('/clockInOut/empId=:empId')
    .get(ctrlClockInOut.getAllAttendence)
router
    //in use
    // swagger tested working
    .route('/clockInOut')
    .post(ctrlClockInOut.insertClockInOut)
    .put(ctrlClockInOut.updateClockOut)

router
    // Not in use
    .route('/clockInOuts')
    .get(ctrlClockInOut.getAttenClockInOutByDate)
// .post(ctrlClockInOut.insertClockInOut);

router
    // Not in use
    .route('/clockInOutsBy')
    .get(ctrlClockInOut.getAllAttendenceByDate)
// .post(ctrlClockInOut.insertClockInOut);

router
    // Not in use
    .route('/clockInOut/:attId')
    .get(ctrlClockInOut.getClockInOutDetailsById)

router
    //in use
    .route('/clock/date=:date/employeeId=:employeeId')
    .get(ctrlClockInOut.getWorkingHrsByDate)

router
    //Not Understandable
    .route('/clock')
    .post(ctrlClockInOut.getWorkingHrsPeriodByDate)

 

// this function 
router
    //in use
    .route('/attendancesummary/:employeeId/:fromDate/:toDate/:organisation_id')
    .get(ctrlClockInOut.getTimePeriodAttendenceSummary)

router
    //in use
    .route('/totalpresent/:organisation_id/:clockInOutDate/:emp_id')
    .get(ctrlClockInOut.getTotalPresentEmpByDate)

router
    // in use
    .route('/teamemployee/:organisation_id/:date/:emp_id')
    .get(ctrlClockInOut.getTeamEmployeeDate)
router
    // in use
    .route('/teamemployee/:organisation_id/:emp_id')
    .get(ctrlClockInOut.getTeamEmployee)

router
    // in use
    .route('/total/CheckInType/:organisation_id/:searchDate/:emp_id')
    .get(ctrlClockInOut.getTotalCheckInByDate)

    router
    //in use
    .route('/teamWorkHrs/')
    .post(ctrlClockInOut.getTeamWorkingHours)

    router
    //in use
    .route('/totalpresentAvg/:emp_id/:organisation_id/:fromdate/:todate')
    .get(ctrlClockInOut.getAvgPrsntEmpByDate)

router
    //in use
    .route('/lateCheckIn/:organisation_id/:searchDate/:emp_id')
    .get(ctrlClockInOut.getTotalEmployeeLateCheckIn)

router
    //in use
    .route('/empOnLeave/:organisation_id/:searchDate/:emp_id')
    .get(ctrlClockInOut.getTotalEmployeeOnLeave)

    //this api is used for updating empty regularisation
    router

    .route('/updateRegularisation')
    .post(ctrlClockInOut.insertRegularisation)

    //this route use for getting attendance log for desktop application created by Rushi
    router
    .route('/clockDataForDesktop/:emp_id/:date')
    .get(ctrlClockInOut.getEmpAttendanceLogByDate)

        //this route use for getting attendance Status for desktop application created by Jasvant on 15-01-2023
     router
    .route('/clockInOutStatus/empId=:empId')
    .get(ctrlClockInOut.getAttendanceStatus)

    
    
module.exports = router;
