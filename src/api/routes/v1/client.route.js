var express = require('express');
var router = express.Router();

var ctrlClient = require('../../controllers/client/client.controller');

router
    .route('/client')
    .post(ctrlClient.createClient);

router
    .route('/client/:client_id')
    .put(ctrlClient.updateClient)
    .delete(ctrlClient.clientDeleteOne)
router
    .route('/organisation/:organisationID')
    .get(ctrlClient.getClientByOrg_Id)

//To Create Client's Meetings
router 
    .route('/client/Meetings')
    .post(ctrlClient.createClientMeetings)
    
  //To Create Client's Meetings prospect  
    router 
    .route('/ClientProspect')
    .post(ctrlClient.createClientMeetingProspect)

 //This route use for get Client's Meetings prospect List by organisation_id
    router 
    .route('/ClientProspect/:organisation_id')
    .get(ctrlClient.GetMeetingProspectList)

//To Get all Client's Meetings
router 
    .route('/client/Meetings/:organisation_id/:employee_id/:date')
    .get(ctrlClient.GetMeeting)
   // .delete(ctrlClient.deleteClientMeeting)
    
router 
    .route('/client/Meetings/:_id')
    .put(ctrlClient.updateClientMeetings)


// router
//     .route('/clientContactPrsn')
//     .post(ctrlClient.clientContactPrsnInsert)
//     .put (ctrlClient.clientContactPrsnUpdate)
//     .delete(ctrlClient.clientContactPrsnDelete)

 router
    .route('/clientList')
    .post(ctrlClient.createClientList)
    .put (ctrlClient.updateClientList)

 router
    .route('/clientList/:organisation_id')
    .get(ctrlClient.getClientListByOrg_Id)

    router
    .route('/clientContact')
    .get(ctrlClient.getAllClientContact)


module.exports = router;
