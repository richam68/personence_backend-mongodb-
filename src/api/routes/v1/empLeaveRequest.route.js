var express = require('express');
var router = express.Router();

var ctrlEmpLeaveRequest = require('../../controllers/leave/empLeaveRequest.controller');

router
    .route('/empLeaveRequest')
    //.get(ctrlEmpLeaveRequest.getAllEmpLeaveRequest)
    .get(ctrlEmpLeaveRequest.getEmpLeaveRequestById)
    .post(ctrlEmpLeaveRequest.empLeaveRequestAddOne);
// .post(ctrlEmpLeaveRequest.leaveFindAndRequest);


router
    .route('/empLeaveRequests/emp_id=:emp_id')
    .get(ctrlEmpLeaveRequest.getEmpLeaveRequestById)

router
    .route('/empLeaveRequests')
    //.get(ctrlEmpLeaveRequest.getOneEmpLeaveByEmployeeId)
    // .post(ctrlEmpLeaveRequest.empLeaveRequestAddOne);
    .post(ctrlEmpLeaveRequest.leaveFindAndRequest);

router
    .route('/empLeaveRequest/:empLeaveRequestId')
    // .get(ctrlEmpLeaveRequest.getOneEmpLeaveRequest)
    .put(ctrlEmpLeaveRequest.empLeaveDetailsUpdateOne)
    .delete(ctrlEmpLeaveRequest.empLeaveRequestDeleteOne);

    router
    .route('/deleteLeave/:empLeaveRequestId/:totalDay/:empLeaveDetailId')
    .delete(ctrlEmpLeaveRequest.empLeaveRequestDeleteOne)

    router
    .route('/updateLeave')
    .put(ctrlEmpLeaveRequest.updateApprovalLeave)

    router
    .route('/approvalLeave/emp_id=:emp_id')
    .get(ctrlEmpLeaveRequest.getApprovalLeave)
module.exports = router;
