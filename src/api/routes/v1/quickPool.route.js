var express = require("express");
var router = express.Router();
var ctrlQuickPool = require("../../controllers/socialAdmin/quickPool.controller");
router
  .route("/quickpool")
  .get(ctrlQuickPool.getAllQuickPool)
  .post(ctrlQuickPool.insertQuickPool);

router.route("/quickPollUpdate").put(ctrlQuickPool.userQuickPollUpdate);

//  router.route("/lastPoolUpdate/:id")
//  .put(ctrlQuickPool.userPoolListUpdate);

router.route("/quickPoolDetail").post(ctrlQuickPool.insertPollDetails);

//route to get quickpool by org id
router
  .route("/quickpool/:organisation_id/:date/:emp_id")
  .get(ctrlQuickPool.getAllQuickPoolByOrgId);

router
  .route("/quickPoolAdmin/:organisation_id/:date")
  .get(ctrlQuickPool.getAllQuickPoolAdminByOrgId);

//route to get quickpool by enddate
router.route("/quickpool/:endDate").get(ctrlQuickPool.getQuickPoolByEndDate);

//route to get quickpool by question_id and empid
// router
//   .route("/quickpools/:question_id/:emp_id")
//   .get(ctrlQuickPool.employeePoolVotingStatus);

//route to get quickpool by voting percentage
router
  .route("/quickpools/:question_id")
  .get(ctrlQuickPool.employeePoolVotingPercentage);

router
  .route("/quickpoolsVoting/:question_id")
  .get(ctrlQuickPool.getPoolDetailsByResults);

module.exports = router;
