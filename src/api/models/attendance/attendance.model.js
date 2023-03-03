// attributes:
const mongoose = require("mongoose");
// const { stringify } = require('uuid');

/**
 * Adjust Attendance
 * @private
 */
const adjustAttendance = new mongoose.Schema(
  {

    employeeId: {
      type: String,
    },
    clockIn: {
      type: String,
    },
    preClockInDateTime: {
      type: String,
    },
    clockOut: {
      type: String,
    },
    preClockOutDateTime: {
      type: String,
    },
    regularize: {
      type: String,
    },
    date: {
      type: String,
    },
    clockInReason: {
      type: String,
    },
    clockOutReason: {
      type: String,
    },
    attendanceId: {
      type: String,
    },
    approvedBy: {
      type: String
    },
    approvedDateTime: {
      type: String
    },
    status: {
      type: String
    },
    organisation_id: {
      type: String
    },
    remark:{
      type:String
    },
    entry:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef AdjustAttendance
 */
module.exports = mongoose.model("AdjustAttendance", adjustAttendance);
