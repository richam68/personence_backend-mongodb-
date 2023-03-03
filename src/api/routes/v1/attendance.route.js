var express = require('express');
var router = express.Router();

var ctrlAdjustAttendance = require('../../controllers/attendance/attendance.controller');

router
    .route('/adjustAttendance')
    .get(ctrlAdjustAttendance.getAllAdjustAttendance)
    .post(ctrlAdjustAttendance.insertAdjustAttendance)
    .put(ctrlAdjustAttendance.AdjustAttendanceUpdate)

router
    .route('/adjustAttendance/:adjustAttendanceId')
    // .get(ctrlAdjustAttendance.getOneAttendancePolicies)
    .delete(ctrlAdjustAttendance.deleteAdjustAttendance);

router
    .route('/employeeId=:employeeId')
    .get(ctrlAdjustAttendance.getEmpAdjustAttendance)

router
    .route('/approval/emp_id=:emp_id')
    .get(ctrlAdjustAttendance.getApprovalRegularistion)

router
    .route('/updateApproval')
    .put(ctrlAdjustAttendance.updateApprovalRegularisation)

module.exports = router;
