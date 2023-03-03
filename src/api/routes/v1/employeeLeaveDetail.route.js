var express = require("express");
var router = express.Router();

var ctrlEmpLeaveDetails = require("../../controllers/leave/employeeLeaveDetail.controller");

// router
//   .route("/empLeaveDetail")
//   .get(ctrlEmpLeaveDetails.getAllEmpLeaveDetails)
//   .post(ctrlEmpLeaveDetails.empLeaveDetailsAddOne);

// router
//   .route("/empLeaveDetail/:empLeaveDetailsId")
//   .get(ctrlEmpLeaveDetails.getOneEmpLeaveDetails)
//   .put(ctrlEmpLeaveDetails.empLeaveDetailsUpdateOne)
//   .delete(ctrlEmpLeaveDetails.empLeaveDetailsDeleteOne);

// router
//   .route("/:emp_id")
//   .get(ctrlEmpLeaveDetails.getAllEmpLeaveDetailsEmployeeId);

// router
//   .route("/:emp_id/:empLeaveDetailsId")
//   .get(ctrlEmpLeaveDetails.getOneEmpLeaveDetailsEmployeeId);

  router
  .route("/empLeaveDetail/:employeeId")
  .get(ctrlEmpLeaveDetails.getEmpLeaveDetail)

  router
  .route("/empLeaveUsageByMonth/:employeeId")
  .get(ctrlEmpLeaveDetails.getEmpLeaveUsageByMonth)

  router
  .route("/empLeaveCredit")
  .get(ctrlEmpLeaveDetails.creditEmployeeLeave)


module.exports = router;
