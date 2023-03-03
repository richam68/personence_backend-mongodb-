var express = require('express');
var router = express.Router();

var ctrlEventList = require('../../controllers/socialAdmin/eventList.controller');

router
    .route('/eventList')
    .get(ctrlEventList.getEventList)
    .post(ctrlEventList.insertEventList);

router 
    .route("/eventList/:organisation_id")
    .get(ctrlEventList.getAllEventListByOrgId);

router
    .route("/eventList/date/:date")
    .get(ctrlEventList.getEventListByDate);

//to get data by organisation id and date
router

    .route("/eventList/:organisation_id/:date")
    .get(ctrlEventList.getEventListByOrgIdAndDate);

module.exports = router;