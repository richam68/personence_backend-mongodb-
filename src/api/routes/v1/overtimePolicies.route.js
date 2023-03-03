var express = require('express');
var router = express.Router();

var ctrlOvertimePolicies = require('../../controllers/attendance/overtimePolicies.controller');

router
    .route('/overtimePolicies')
    .get(ctrlOvertimePolicies.getAllOvertimePolicies)
    .post(ctrlOvertimePolicies.overtimePoliciesAddOne);

router
    .route('/overtimePolicies/:overtimePoliciesId')
    .get(ctrlOvertimePolicies.getOneOvertimePolicies)
    .put(ctrlOvertimePolicies.overtimePoliciesUpdateOne)
    .delete(ctrlOvertimePolicies.overtimePoliciesDeleteOne);

    router
    .route('/client_id=:client_id')
    .get(ctrlOvertimePolicies.getAllByClientId)

module.exports = router;