var express = require("express");
var router = express.Router();

var ctrlEmpLeaveCreditRequest = require("../../controllers/leave/empLeaveCreditRequest.controller");

router
  .route("/empLeaveCreditRequest")
  .get(ctrlEmpLeaveCreditRequest.getAllEmpLeaveCreditRequest)
  .post(ctrlEmpLeaveCreditRequest.empLeaveCreditRequestAddOne);

router
  .route("/empLeaveCreditRequest/:empLeaveCreditRequestId")
  .get(ctrlEmpLeaveCreditRequest.getOneEmpLeaveCreditRequest)
  .put(ctrlEmpLeaveCreditRequest.empLeaveCreditRequestUpdateOne)
  .delete(ctrlEmpLeaveCreditRequest.empLeaveCreditRequestDeleteOne);

router
  .route("/:emp_id")
  .get(ctrlEmpLeaveCreditRequest.getAllEmpLeaveCreditRequestEmpId);

// router
//   .route("/:emp_id/:empLeaveCreditRequestId")
//   .get(ctrlEmpLeaveCreditRequest.getOneEmpLeaveCreditRequestEmpId);

module.exports = router;
