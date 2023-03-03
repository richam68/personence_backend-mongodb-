var express = require('express');
var router = express.Router();
var ctrlUtilities = require('../../controllers/reimbursement/advance.controller');



router

    // .route('/ReimbursementData/:organisation_id/:client_id/:employeeId')
    .route('/ReimbursementData/:organisation_id')

    .get(ctrlUtilities.getreimbursementData)
    .post(ctrlUtilities.createReimburesement)

router

    .route('/GetOtherAdvance/:organisation_id')
    .get(ctrlUtilities.getOtherAdvance)
    .post(ctrlUtilities.createOtherAdvance)
router
    .route('/DeleteAdvanceReport/:travelId')
    .delete(ctrlUtilities.travelAdvanceDeleteOne)



router
    .route('/updateAdvanceReport/:travelId')
    .put(ctrlUtilities.travelAdvanceUpdateOne)


// router
//     // .route('/PettExpenceClaim/:organisation_id/:client_id/:employeeId')
//     .route('/PettExpenceClaim/:organisation_id/:employeeId')
//     .get(ctrlUtilities.getPettExpenceClaim)
//     .post(ctrlUtilities.createPettExpenceClaim)

// router
//     // .route('/PettExpenceClaim/:organisation_id/:client_id/:employeeId')
//     .route('/TravelClaim/:organisation_id/')

//     .get(ctrlUtilities.getExpncClmTrvlExpnc)
//     .post(ctrlUtilities.createExpncClmTrvlExpnc)

//     router
//     .route('/DeleteAdvanceReport/:travelId')
//     .delete(ctrlUtilities.travelAdvanceDeleteOne)
//     // .put(ctrlUtilities.travelAdvanceUpdateOne)

    
    router
    .route('/updateAdvanceReport/:travelId')
    // .delete(ctrlUtilities.travelAdvanceDeleteOne)
    .put(ctrlUtilities.travelAdvanceUpdateOne)
    
    // router
    // .route('/updateOtherAdvanceReport/:otherAdvanceId')
    // .put(ctrlUtilities.otherAdvanceUpdateOne)


module.exports = router;

