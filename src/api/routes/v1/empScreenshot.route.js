var express = require("express");
var router = express.Router();
var ctrlEmployeeScreenActivity = require("../../controllers/employeeActivity/empActivity.controller");
  
  router
  .route("/empScreenshot")
  .post(ctrlEmployeeScreenActivity.insertEmpScreenActivity);

  router
  .route("/empScreenshot/employeeId=:employeeId")
  .get(ctrlEmployeeScreenActivity.getEmpScreenActivityByEmpId);


module.exports = router;
