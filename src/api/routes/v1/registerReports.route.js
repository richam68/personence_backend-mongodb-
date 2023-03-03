var express = require("express");
var router = express.Router();

var ctrlReports = require("../../controllers/registerReports/registerReports");

router
  .route("/reports/client_id=:client_id/organisation_id=:organisation_id/:fromDate/:toDate")
  .get(ctrlReports.getTimePeriodAttendenceRegisterReport)
// .post(ctrlReports.addressAddOne)
// .put(ctrlReports.addressUpdateOne);

router
  .route("/summary/clientID=:client_id/organisation_id=:organisation_id/from=:fromDate/:toDate")
  .get(ctrlReports.getAttendenceRegisterReportSummary)
  
router
.route("/dayWiseReport/clientID=:client_id/organisation_id=:organisation_id/from=:fromDate/:toDate")
.get(ctrlReports.getDayWiseReportSummary)
module.exports = router;
