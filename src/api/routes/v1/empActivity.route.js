var express = require("express");
var router = express.Router();

var ctrlEmployeeActivity = require("../../controllers/employeeActivity/empActivity.controller");
var ctrlEmployeeScreenActivity = require("../../controllers/employeeActivity/empActivity.controller");
var multer = require('multer');

router
.route("/empScreenshot")
.post(ctrlEmployeeScreenActivity.insertEmpScreenActivity);

router
.route("/empMouseActivity")
.post(ctrlEmployeeScreenActivity.insertEmpActivity);

router
.route("/empScreenshot/:employeeId/:date")
.get(ctrlEmployeeScreenActivity.getEmpScreenActivityByEmpId);

router
.route("/MouseActivity/:emp_id/:date")
.get(ctrlEmployeeScreenActivity.getEmpMouseActivity)

router
.route("/mouseActivityPeriod/:emp_id/:fromDate/:toDate")
.get(ctrlEmployeeScreenActivity.getEmpMouseActivityPeriod)

router
.route("/idleHrs/:employeeId/:date")
.get(ctrlEmployeeScreenActivity.getEmpIdleHrs)

router
.route("/idleHrsPeriod/:employeeId/:fromDate/:toDate")
.get(ctrlEmployeeScreenActivity.getEmpIdleHrsPeriod)

router
.route("/teamIdleHrsManager/:organisation_id/:emp_id/:fromDate/:toDate")
.get(ctrlEmployeeScreenActivity.getTeamIdleHrsManager)

router
.route("/teamIdleHrsAdmin/:organisation_id/:emp_id/:fromDate/:toDate/:Buid")
.get(ctrlEmployeeScreenActivity.getTeamIdleHrsAdmin)

router
.route("/mostUsedApplication")
.post(ctrlEmployeeScreenActivity.insertUsedApplication)
.put(ctrlEmployeeScreenActivity.updateUsedApplication)

router
.route("/mostUsedWebsite")
.post(ctrlEmployeeScreenActivity.insertUsedWebsite)
.post(ctrlEmployeeScreenActivity.updateUsedWebsite)

module.exports = router;
