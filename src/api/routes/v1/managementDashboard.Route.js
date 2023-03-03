var express = require('express');
var router = express.Router();
var ctrlUtilities = require('../../controllers/ManagementDashboard/managementDashboard.controller');

router
    // not working
    .route('/ManagementDashboard/:organisation_id/:date')
    .get(ctrlUtilities.getEmpDetailsAvg)


router
    // Working
    // .route('/GetManagementDashboard/:organisation_id/:client_id')
   .route('/GetManagementDashboard/:organisation_id/:client_id/:fromdate')
    .get(ctrlUtilities.getActiveEmployee)
router
    //Working & remove joining date 
    //.route('/GetNewJoinee/:joining_date/:organisation_id/:client_id/:fromdate')
    .route('/GetNewJoinee/:organisation_id/:client_id/:joining_date')
    .get(ctrlUtilities.getNewJoineeDetails)
router
    //working & remove leaving date
    //.route('/GetEmployeeLeftDetails/:actualDateOfLeaving/:organisation_id/:client_id/:fromdate')
     .route('/GetEmployeeLeftDetails/:organisation_id/:client_id/:actualDateOfLeaving')
    .get(ctrlUtilities.getEmployeeLeftDetails)
router
    //Working
    .route('/GetMaleFemaleData/:organisation_id/:client_id/:fromdate')
    // .route('/GetMaleFemaleData/:organisation_id/:client_id')

    .get(ctrlUtilities.getMaleFemaleData)

router
    //Working
    .route('/GetEmployeeDetails/:organisation_id/:client_id/:fromdate')
    // .route('/GetEmployeeDetails/:organisation_id/:client_id')
    .get(ctrlUtilities.getEmpQualificationDetails)

router
    //Working
    .route('/GetEmpAgeData/:organisation_id/:client_id/:fromdate')
    // .route('/GetEmpAgeData/:organisation_id/:client_id')
    .get(ctrlUtilities.getEmpAgeData)

router
    .route('/GetEmpDistribtnByFunc/:organisation_id/:client_id/:fromdate')
    // .route('/GetEmpDistribtnByFunc/:organisation_id/:client_id')
    .get(ctrlUtilities.getEmpDistribtnByFunc)

// router 
// .route('/GetTotalEmpByMonth/:organisation_id')
// .get(ctrlUtilities.getTotalEmpByMonth)
router
    //Working
    // .route('/GetStateData/:organisation_id/:client_id/:fromdate')
    .route('/GetStateData/:organisation_id/:client_id')

    .get(ctrlUtilities.getEmpStateDetails)

// router
//     // Not working
//     .route('/GetEmpActiveData')
//     .get(ctrlUtilities.EmployeeActiveByMonth)
// router
//     // Not working
//     .route('/GetEmpActiveData')
//     .get(ctrlUtilities.EmployeeActiveByMonth)
router
    .route('/GetNewJoineeByMonth/:organisation_id/:client_id')
    .get(ctrlUtilities.getNewJoineeByMonth)

router
    // .route('/ttlpresentemp/:organisation_id/:date')
    .route('/ttlpresentemp/:organisation_id/:date/:Buid')
    .get(ctrlUtilities.getTotalPresentEmp)
    
// router
//     //trying
//     .route('/getEmplAvgTenure/:organisation_id/:current_date')
//     .get(ctrlUtilities.getEmplAvgTenure)


    // router 
    // .route('/AverageTenure/:organisation_id/:client_id')
    // .get(ctrlUtilities.EmployeeAverageTenure)

router
    // .route('/empOnLeaveByDate/:organisation_id/:searchDate')
    .route('/empOnLeaveByDate/:organisation_id/:searchDate/:Buid')
    .get(ctrlUtilities.getTotalEmployeeOnLeaveByDate)

router
    // .route('/totalEmpUnderTime/:clockInOutDate/:organisation_id')
    .route('/totalEmpUnderTime/:clockInOutDate/:organisation_id/:Buid')
    .get(ctrlUtilities.getTotalEmpUndertimeByDate)

router
    .route('/ttlWorkHrs')
    .post(ctrlUtilities.getTotalWorkingHours)

router
    // .route('/avgWrhsPrEmp/:organisation_id/:fromdate/:todate')
    .route('/avgWrhsPrEmp/:organisation_id/:fromdate/:todate/:Buid')
    .get(ctrlUtilities.AvgWrkingHrsPerEmployee)

router
  .route('/employeeByBuId/organisation_id=:organisation_id/:Buid')
  .get(ctrlUtilities.getAllEmployeeByBuId)
  
// router
//   .route('/ttlEmp/organisation_id=:organisation_id/:client_id')
//   .get(ctrlUtilities.getTotalEmp)

module.exports = router;

