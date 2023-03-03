var express = require('express');
var router = express.Router();

var ctrlRoleRight = require('../../controllers/roleRight/roleRight.controller');

router
    .route('/roleRight/:roleId')
    .get(ctrlRoleRight.getAllRoleRight)
    .post(ctrlRoleRight.roleRightAddOne);

router
    .route('/roleRight/:roleRightId')
//     .get(ctrlClient.getOneClient)
//     .put(ctrlClient.clientUpdateOne)
    .delete(ctrlRoleRight.roleRightDeleteOne);

module.exports = router;