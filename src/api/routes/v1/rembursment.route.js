
var express = require('express');
var router = express.Router();

var ctrlRembursment = require('../../controllers/rembursment/rembursment.controller');
var ctrlRembursmentDetails = require('../../controllers/rembursment/rembursment_Details.controller');
var ctrlRembursmentLog = require('../../controllers/rembursment/reimbursement_Log.controller')
var ctrlRembursmentDetailsLog = require('../../controllers/rembursment/reimbursement_Details_Log.controller')
var ctrlRembursmentAccount =require('../../controllers/rembursment/rembursement_account.controller')

router
    .route('/rembursment')
    .get(ctrlRembursment.getRembursment)
    .post(ctrlRembursment.createRembursment)
router
    .route('/rembursmentlog')
    .get(ctrlRembursmentLog.getRembursmentlog)
    .post(ctrlRembursmentLog.createRembursmentlog)

router
    .route('/rembursmentDetails')
    .get(ctrlRembursmentDetails.getRembursmentDetails)
    .post(ctrlRembursmentDetails.createRembursmentDetails)

router
  .route("/rembursmentDetails/:rembursment_detail_id")
  .delete(ctrlRembursmentDetails.rembursmentDetailsDeleteOne);

router
    .route('/rembursmentDetailslog/:rembursment_id')
    .get(ctrlRembursmentDetailsLog.getRembursmentDetailsLog)
    // .post(ctrlRembursmentDetailsLog.createRembursmentDetailsLog)
router
    .route('/rembursmentDetailslog')
    .post(ctrlRembursmentDetailsLog.createRembursmentDetailsLog)
router
    .route('/rembursment/:rembursment_id')
    .put(ctrlRembursment.updateRembursment)
router
    .route('/rembursmentDetails/:_id')
    .put(ctrlRembursmentDetails.updateRembursmentDetails)

router
  .route("/empByBuId/organisation_id=:organisation_id/:Buid")
  .get(ctrlRembursmentDetails.getAllEmpByBuId);

router
  .route("/employeeforApprover/organisation_id=:organisation_id")
  .get(ctrlRembursmentDetails.getAllEmployeeForApprover);

router
  .route("/reimbursementLevel")
  .get(ctrlRembursmentDetails.getRembursmentLevelDetails)
  .post(ctrlRembursmentDetails.createRembursmentLevelDetails)
  .put(ctrlRembursmentDetails.updateRembursmentLevelDetails);

  router
  .route("/reimbursementAccount")
  
  .post(ctrlRembursmentAccount.createRembursmentAccount)
  .put(ctrlRembursmentAccount.updateRembursmentAccount);
  router
  .route("/reimbursementAccount/:employee_id/:date")
  .get(ctrlRembursmentAccount.getRembursmentAccount)
  router
  .route("/reimbursementAccounttr/:employee_id/:date/:date")
  .get(ctrlRembursmentAccount.getExpenseType)
  router
  .route("/reimbursementAccOfAllEmp/:organisation_id/:date/:date")
  .get(ctrlRembursmentAccount.getExpenseTypeOfAllEmployee)
  router
  .route("/reimbursementAcc/:organisation_id/:date/:date")
  .get(ctrlRembursmentAccount.getTeamExpenseSheetOfAllEmp)



module.exports = router;
