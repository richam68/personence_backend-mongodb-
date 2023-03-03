var express = require("express");
var router = express.Router();

var ctrlEvent = require("../../controllers/socialAdmin/events.controller");

router.route("/events").get(ctrlEvent.getEvents).post(ctrlEvent.insertEvents);

router.route("/events/:organisation_id").get(ctrlEvent.getAllEventsByOrgId);

router.route("/events/date/:date").get(ctrlEvent.getEventsByDate);

//to get data by organisation id and date
router

  .route("/events/:organisation_id/:date")
  .get(ctrlEvent.getEventsByOrgIdAndDate);

router.route("/eventsUpdate/:eventId").put(ctrlEvent.userEventUpdate);

router.route("/eventVisibility").put(ctrlEvent.userVisibilityUpdate);

router.route("/eventDelete/:eventId").delete(ctrlEvent.deleteEventAnnoucment);

module.exports = router;
