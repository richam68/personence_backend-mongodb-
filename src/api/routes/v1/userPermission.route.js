var express = require('express');
var router = express.Router();

var ctrlUserPermission = require('../../controllers/userPermission/userPermission.controller');

router
    .route('/userPermission')
    .get(ctrlUserPermission.getAllUserPermission)
    .post(ctrlUserPermission.userPermissionAddOne);

// router
//     .route('/userPermission/:userPermissionId')
//     .get(ctrlUserPermission.getOneUserPermission)
//     .put(ctrlUserPermission.userPermissionUpdateOne)
//     .delete(ctrlUserPermission.userPermissionDeleteOne);

module.exports = router;