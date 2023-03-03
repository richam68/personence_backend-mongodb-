var express = require("express");
var router = express.Router();

var attendanceCalendar = require("../../controllers/attendance/attendanceCalendar.controller");


// router
//   .route("/:attendanceCalendar")
//   .get(attendanceCalendar.getAllattendanceCalendar)
//   .post(attendanceCalendar.attendanceCalendarAddOne);

//  router
//    .route("/:attendanceCalendar/:attendanceCalendarId")
//    .get(attendanceCalendar.getOneattendanceCalendar)
//    .put(attendanceCalendar.attendanceCalendarUpdateOne)
//    .delete(attendanceCalendar.attendanceCalendarDeleteOne);

router
.route("/attendance/emp_id=:emp_id")
.get(attendanceCalendar.getOneAttendanceCalendar)

   router
   .route("/attendanceCalendar/emp_id=:emp_id")
   .get(attendanceCalendar.getAttendanceCalendar)

      router
   .route("/attendanceCalendar/")
   .get(attendanceCalendar.getAttendanceCalendarByDate)
   .post(attendanceCalendar.getAttendanceCalendarByDate)

  module.exports = router