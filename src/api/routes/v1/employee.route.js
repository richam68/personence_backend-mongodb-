var express = require("express");
var router = express.Router();

var ctrlEmployee = require("../../controllers/employee/employee.controller");

var ctrlEmpActivity = require('../../controllers/employeeActivity/empActivity.controller')

router
  .route("/employee")
  .post(ctrlEmployee.employeeAddOne)
  .put(ctrlEmployee.updateEmployeeDetailsByEmpCognitoID)
 

  router
  .route("/bulkEmployee")
  .post(ctrlEmployee.bulkEmployeeAddOne)

router.route("/employeebyid/:org_id")
  .get(ctrlEmployee.getEmployee);

router.route("/getempdtls")
  .get(ctrlEmployee.getempdtls);

router
  //swagger not created
  .route("/getempdtls")
  .get(ctrlEmployee.getempdtls);

router
  .route("/empadjatt/org_id=:org_id/:emp_id")
  .get(ctrlEmployee.getEmpRegularizationByRptManagerId);

router
  .route("/empbyrptid/org_id=:org_id/:emp_id")
  .get(ctrlEmployee.getEmpByRptManagerId);

router
  .route("/employee/organisation_id=:organisation_id")
  .get(ctrlEmployee.getAllEmployee);

router
  .route("/employeeByrptManager/organisation_id=:organisation_id/:emp_id")
  .get(ctrlEmployee.getAllEmployeeByreportingManager);

router
  .route("/employee/EmpCognitoID=:EmpCognitoID")
  .get(ctrlEmployee.getOneEmployeeByEmpCognitoID);

router.route("/employees/id=:id").delete(ctrlEmployee.employeeDeleteOne);

router
  .route("/employee/empIsLoginUpdate")
  .put(ctrlEmployee.employeeUpdateByEmpCognitoID);

router.route("/employee/bulk").post(ctrlEmployee.employeeBulkCreate);

router
  .route("/client_id=:client_id/organisation_id=:organisation_id")
  .get(ctrlEmployee.getEmployeesByContractualClientId);

router.route("/empcode").put(ctrlEmployee.getEmployeeCode);
router
  .route("/updateEmployeeMapping")
  .put(ctrlEmployee.UpdateEmpMappingDetails);
router.route("/updateEmployeeDetail").put(ctrlEmployee.UpdateEmploymentDetails);
router
  .route("/employee/hierarchy")
  .get(ctrlEmployee.employeesByHierarchyIDAddOne);

router
  .route("/employee/:organisation_id/:searchType/:searchId")
  .get(ctrlEmployee.getEmployeesDependentData)
  .put(ctrlEmployee.cascadeUpdateAfterDeletion);

router
  .route("/getOneEmployeeWithZone/:organisation_id")
  .get(ctrlEmployee.getOneEmployeeWithZone);

// ----------- This Route use for Mobile Profile Native
router
.route("/getOneEmployeeWithOnBoarding/:organisation_id/:EmpCognitoID")
 .get( ctrlEmployee.getOneEmployeeWithOnBoarding);


//---------------This route create for Get Organisation  Employee Birthday based on organisationId
router
  .route("/organisationidanddob/organisation_id=:organisation_id")
  .get(ctrlEmployee.getEmployeeByBirthdayAndOrgId)
  //.post(ctrlEmployee.employeeEmailSendWishes);

//---------------This route  use to get all employees Details by organisation_id and Joining date 
//---------------and this route is used in Social admin warm welcome page
router
  .route("/employee/days=:days/organisation_id=:organisation_id")
  .get(ctrlEmployee.getEmployeeByJoiningDate);

router
  .route("/anniversary/organisation_id=:organisation_id")
  .get(ctrlEmployee.getEmployeeAnniversary);

router
  .route("/serviceanniversary/organisation_id=:organisation_id")
  .get(ctrlEmployee.getEmployeeServiceAnniversary);

router.route("/roleId/:EmpCognitoID").get(ctrlEmployee.getRoleIdForMenu);

router
  .route("/getemployeeorgwithuserrights/organisation_id=:organisation_id")
  .get(ctrlEmployee.getEmpByOrgIdWithUserRight);

router
  .route("/getorgspocswithuserrights/:EmpCognitoID")
  .get(ctrlEmployee.getOrgSpocsRightsByOrgId);

  router
  .route("/employeeBulkUpdate")
  .put(ctrlEmployee.employeeBulkUpdate)

module.exports = router;
