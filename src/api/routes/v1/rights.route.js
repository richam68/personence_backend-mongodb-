var express = require('express');
var router = express.Router();

var ctrlRights = require('../../controllers/rights/rights.controller');

router
    .route('/rights')
    .get(ctrlRights.getAllRights)
    .post(ctrlRights.rightsAddOne);

// router
//     .route('/attendancePolicies/:attendancePoliciesId')
//     .get(ctrlAttendance.getOneAttendancePolicies)
//     .put(ctrlAttendance.attendancePoliciesUpdateOne)
//     .delete(ctrlAttendance.attendancePoliciesDeleteOne);

module.exports = router;