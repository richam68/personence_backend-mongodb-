// var mongoose = require('mongoose');
// const attendanceCalendar = require("../../models/attendance/attendanceCalendar.model");
const clockInOut = require("../../models/attendance/clockInOut.model");

//this api is used for desktop calendar data


module.exports.getAttendanceCalendar = function (req, res) {

  clockInOut.find({ employeeId: req.params.emp_id })
    .exec(function (err, attendanceCalendar) {
      if (err) {

        res.status(500).json(err);
      } else {

        res.json(attendanceCalendar);
      }
    });
};

module.exports.getOneAttendanceCalendar = async function (req, res) {

  let attendance = await clockInOut.aggregate([
    {
      $match: { employeeId: req.params.emp_id }
    },
    {
      $group: { _id: "$clockInOutDate", clockIn: { $first: "$clockIn" }, clockOut: { $last: "$clockOut" }, location: { $addToSet: "$clockInLatLang" }, totalWorkHrs: { $sum: "$totalHours" } }
    }
  ])

  if (attendance.err) {

  }
  else {


    res.json(attendance)
  }
}

//this api is used for mobile calendar data
module.exports.getAttendanceCalendarByDate = function (req, res) {

  clockInOut.find({ employeeId: req.body.emp_id, clockInOutDate: req.body.date })
    .exec(function (err, attendanceCalendar) {
      if (err) {

        res.status(500).json(err);
      } else {

        res.json(attendanceCalendar);
      }
    });
};


