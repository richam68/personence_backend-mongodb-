var express = require('express');
var router = express.Router();

var ctrlLeave = require('../../controllers/leave/leaveTypes.controller');

router
    .route('/leaveTypes')
    .get(ctrlLeave.getAllLeaveTypes)
    .post(ctrlLeave.leaveTypesAddOne);


router
    .route('/leaveTypes/:leaveTypesId')
    .get(ctrlLeave.getOneLeaveTypes)
    .put(ctrlLeave.leaveTypesUpdateOne)
    .delete(ctrlLeave.leaveTypesDeleteOne);

    router
    .route('/getLeaveTypes/:employeeId')
    .get(ctrlLeave.getLeaveTypes)
   
router
    .route('/leaveTypesgetbyBU')
    .get(ctrlLeave.getLeaveTypesByBUID)
    // .get(ctrlLeave.getAllLeaveTypes)

    router
    .route('/client_id=:client_id')
    .get(ctrlLeave.getAllLeavesClientId)

module.exports = router;