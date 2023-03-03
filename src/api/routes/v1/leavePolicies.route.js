var express = require('express');
var router = express.Router();

var ctrlLeave = require('../../controllers/leave/leavePolicies.controller');

router
    .route('/leavePolicies/:client_id')
    .get(ctrlLeave.getLeavePolicies)
    .post(ctrlLeave.leavePoliciesAddOne);

    router
    .route('/leavePolicies')
    .post(ctrlLeave.leavePoliciesAddOne);

    router
    .route('/leavePolicies')
    .put(ctrlLeave.updateLeavePolicies)

module.exports = router;