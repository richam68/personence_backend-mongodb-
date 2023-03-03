var express = require("express");
var router = express.Router();

var ctrlRole = require("../../controllers/role/role.controller");

router
    .route("/role/:organisation_id")
    .get(ctrlRole.getAllRole)
router
    .route("/role")
    .post(ctrlRole.roleAddOne);
router
    .route("/roleAndRoleRightAddOne")
    .post(ctrlRole.roleAddRoleRightBothAddOne)
router
    .route("/:roleCode")
    .delete(ctrlRole.roleDeleteOne);
router
    .route('/role/:roleId')
    .get(ctrlRole.getOneRoleWithRoleRight)
router
    .route('/rightsWithModules/:role_id')
    .get(ctrlRole.getRightsWithModules)
router
    .route('/rolewithrights/:_id')
    .get(ctrlRole.getRoleWithRights)

module.exports = router;
