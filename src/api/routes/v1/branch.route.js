
var express = require('express');

var router = express.Router();

var ctrlBranch = require('../../controllers/organisationSetup/branch.controller');

router
    .route('/branch')
    //.get(ctrlBranch.getAllBranch)
    .post(ctrlBranch.branchAddOne)
    .put(ctrlBranch.branchUpdateOne)

router
    .route('/branch/:branchId')
    .get(ctrlBranch.getOneBranch)
    .put(ctrlBranch.branchUpdateOne)
    .delete(ctrlBranch.branchDeleteOne)

router
    .route('/branch/bulk')
    .post(ctrlBranch.branchBulkCreate)

router
    .route('/organisation_id=:organisation_id')
    .get(ctrlBranch.getAllBranchOrganizationId)

router
    .route('/organisation_id=:organisation_id/branchId=:branchId')
    .get(ctrlBranch.getOneBranchOrganizationId)

module.exports = router;