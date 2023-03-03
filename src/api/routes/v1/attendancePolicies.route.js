var express = require('express');
var router = express.Router();

var ctrlAttendance = require('../../controllers/attendance/attendancePolicies.controller');

router
    .route('/attendancePolicies')
    .get(ctrlAttendance.getAllAttendancePolicies)
    .post(ctrlAttendance.attendancePoliciesAddOne);

    router
    .route('/updatePolicies')
    .put(ctrlAttendance.attendancePoliciesUpdateOne)

router
    .route('/attendancePolicies/:attendancePoliciesId')
    .delete(ctrlAttendance.attendancePoliciesDeleteOne);

    router
    .route('/attendancePolicyByClient/:client_id')
    .get(ctrlAttendance.getAllByClientId)

    router
    .route('/getAttendance/:emp_id')
    .get(ctrlAttendance.getAllByClientId)

    router
    .route('/getAttendancePolicyByEmp/:emp_id')
    .get(ctrlAttendance.getAttendancePolicyByEmp)
module.exports = router;
