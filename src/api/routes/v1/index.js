const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const attendancePoliciesRoutes = require("./attendancePolicies.route");
const adjustAttendanceRoutes = require("./attendance.route");
const overtimePoliciesRoutes = require("./overtimePolicies.route");
const penaltyRoutes = require("./penalty.route");
const leavePoliciesRoutes = require("./leavePolicies.route");
const leaveTypesRoutes = require("./leaveTypes.route");
const empLeaveDetailsRoutes = require("./employeeLeaveDetail.route");
const empLeaveRequestRoutes = require("./empLeaveRequest.route");
const empLeaveCreditRequestRoutes = require("./empLeaveCreditRequest.route");
const shiftAllRoutes = require("./shiftAll.route");
const clientRoutes = require("./client.route");
const holidaysRoutes = require("./holidays.route");
const moduleRoutes = require("./module.route");
const roleRoutes = require("./role.route");
const rightsRoutes = require("./rights.route");
const userPermissionRoutes = require("./userPermission.route");
const roleRightRoutes = require("./roleRight.route");
const organisationRoutes = require("./organisation.route");
const employeeRoutes = require("./employee.route");
const zoneRoutes = require("./zone.route");
const branchRoutes = require("./branch.route");
const addressRoutes = require("./address.route");
const divisionRoutes = require("./division.route");
const departmentRoutes = require("./department.route");
const designationRoutes = require("./designation.route");
const spocsRoutes = require("./spocs.route");
const orgSpocsRoutes = require("./orgSpocs.route");
const userRightsRoutes = require("./userRights.route");
const empTypeRoutes = require("./empType.route");
const clockInOutRoutes = require("./clockInOut.route");
const userDetailsRoutes = require("./userDetails.route");
const employeementTypeRoutes = require("./employeementType.route");
const shiftRotationRoutes = require("./shiftRotation.route");
const attendanceCalendarRoutes=require("./attendanceCalendar.route")
const lastCodeRoutes = require("./lastCode.route");
const empActivityRoutes = require("./empActivity.route");
const onBoardingRoutes = require("./onBoarding.route");
const empScreenshotRoutes = require("./empScreenshot.route");
const quotesRoutes = require("./quotes.route");
const companyRoutes = require("./companyAnnoucements.route");
const warmWelcomeRoutes = require("./warmWelcome.route");
const awardRoutes = require("./award.route");
const noticeRoutes = require("./notice.route");
const eventRoutes = require("./events.route");
const quickPoolRoutes = require("./quickPool.route");
const lastPoolRoutes = require("./lastpool.route");
const queryAndSuggestionRoutes = require("./query&suggestion.route");
const locationRoutes = require("./location.route");
const eventListRoutes = require("./eventList.route");
const breakHourRoutes = require("./breakHour.route");
const magicutilities =  require("./magicutilities.route");
const managementDashboard = require("./managementDashboard.Route");
const Reimbursement = require("./reimbursement.route");
const rembursement = require('./rembursment.route');
const travelExpense = require('./travelExpense.route');



const locationTracking=require("./locationTracking.route")
const teamStatus = require("./teamStatus.route")
const createUser=require("./createUser.route")
const registerReports = require('./registerReports.route');

const Enquiry = require('./enquiry.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));

/**
 * GET v1/docs
 */
router.use("/docs", express.static("docs"));


// // swagger documentation related
// const swaggerUi = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./src/api/routes/v1/swagger.yaml");
// router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));










router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/attendance", attendancePoliciesRoutes);
router.use("/adjustAttendance", adjustAttendanceRoutes );
router.use("/overtimePolicies", overtimePoliciesRoutes);
router.use("/penalty", penaltyRoutes);
router.use("/leave", leavePoliciesRoutes);
router.use("/leavetypes", leaveTypesRoutes);
router.use("/shift", shiftAllRoutes);
router.use("/shiftRotation", shiftRotationRoutes);
router.use("/clients", clientRoutes);
router.use("/holidays", holidaysRoutes);
router.use("/module", moduleRoutes);
router.use("/role", roleRoutes);
router.use("/rights", rightsRoutes);
router.use("/userPermission", userPermissionRoutes);
router.use("/roleRight", roleRightRoutes);
router.use("/empLeaveDetail", empLeaveDetailsRoutes);
router.use("/empLeaveRequest", empLeaveRequestRoutes);
router.use("/empLeaveCreditRequest",empLeaveCreditRequestRoutes);
router.use("/organisation",organisationRoutes);
router.use('/employee',employeeRoutes);
router.use("/zone",zoneRoutes);
router.use("/branch",branchRoutes);
router.use("/address",addressRoutes);
router.use("/division",divisionRoutes);
router.use("/department",departmentRoutes);
router.use("/designation",designationRoutes);
router.use("/spocs",spocsRoutes);
router.use("/orgSpocs",orgSpocsRoutes);
router.use("/userRights",userRightsRoutes);
router.use("/empTypes",empTypeRoutes);
router.use("/clockInOut",clockInOutRoutes);
router.use("/userDetails",userDetailsRoutes);
router.use("/employeementType",employeementTypeRoutes);
router.use("/attendanceCalendar",attendanceCalendarRoutes);
router.use("/lastCode",lastCodeRoutes);
router.use("/empActivity",empActivityRoutes)
router.use("/onBoarding", onBoardingRoutes);
router.use("/empScreenshot",empScreenshotRoutes)
router.use("/quotes", quotesRoutes);
router.use("/companyAnnoucements", companyRoutes);
router.use("/warmwel", warmWelcomeRoutes);
router.use("/award", awardRoutes);
router.use("/notice", noticeRoutes);
router.use("/events", eventRoutes);
router.use("/quickpool", quickPoolRoutes);
router.use("/lastpool", lastPoolRoutes);
router.use("/eventList", eventListRoutes);
router.use("/queryAndSuggestion", queryAndSuggestionRoutes);
router.use("/breakHour",breakHourRoutes);
router.use("/location",locationRoutes);
router.use("/magicutilities",magicutilities);
router.use("/ManagementDashboard",managementDashboard);

router.use("/locationTracking",locationTracking);

router.use("/teamStatus",teamStatus);
router.use("/createUser",createUser);
router.use("/Reimbursement",Reimbursement);
router.use("/rembursment",rembursement);
router.use("/travelExpense",travelExpense);


router.use("/reports",registerReports);

router.use("/enquiry",Enquiry);

module.exports = router;
