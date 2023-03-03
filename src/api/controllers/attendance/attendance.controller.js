// var mongoose = require('mongoose');

const AdjustAttendance = require("../../models/attendance/attendance.model");
const Employee = require("../../models/employee/employee.model")

const ClockInOut = require('../../models/attendance/clockInOut.model')

const moment = require('moment-timezone')

module.exports.getEmpAdjustAttendance = function (req, res) {
  var employeeId = req.params.employeeId;



  AdjustAttendance.find({ employeeId: employeeId }).exec(function (err, doc) {
    var response = {
      status: 200,
      message: doc,
    };

    if (err) {

      response.status = 500;
      response.message = err;
    } else if (!doc) {
      res;
      response.status = 404;
      response.message = {
        message: "employeeId not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};


//Get Adjust Attendance list
module.exports.getAllAdjustAttendance = function (req, res) {
  AdjustAttendance.find()
    // .skip(offset)
    // .limit(count)
    .exec(function (err, AdjustAttendance) {
      if (err) {

        res.status(500).json(err);
      } else {

        res.json(AdjustAttendance);
      }
    });
};

// Function used for create a new adjustAttendance

module.exports.insertAdjustAttendance = function (req, res) {


  AdjustAttendance.create(
    {
      employeeId: req.body.employeeId,
      clockIn: req.body.clockIn,
      preClockInDateTime: req.body.preClockInDateTime,
      clockOut: req.body.clockOut,
      preClockOutDateTime: req.body.preClockOutDateTime,
      regularize: req.body.regularize,
      date: req.body.date,
      clockInReason: req.body.clockInReason,
      clockOutReason: req.body.clockOutReason,
      status: "pending",
      attendanceId: req.body.attendanceId,
      organisation_id: req.body.organisation_id,
      entry:req.body.entry
    },
    function (err, adjustAttendance) {
      if (err) {

        res.status(400).json(err);
      } else {

        res.json(adjustAttendance);
      }
    }
  );
};

module.exports.AdjustAttendanceUpdate = function (req, res) {
  var adjustAttendanceId = req.params.adjustAttendanceId;


  AdjustAttendance.findById(req.body.attendanceId)
    .select(" ")
    .exec(function (err, doc) {
      var response = {
        status: 200,
        message: doc,
      };

      if (err) {

        response.status = 500;
        response.message = err;
      } else if (!doc) {
        res;
        response.status = 404;
        response.message = {
          message: "adjustAttendance ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {

        doc.adjustAttendance_id = req.body.adjustAttendance_id;
        doc.clockIn = req.body.clockIn;

        doc.clockOut = req.body.clockOut;

        doc.regularize = req.body.regularize;

        doc.clockInReason = req.body.clockInReason;
        doc.clockOutReason = req.body.clockOutReason;
        doc.employeeId = req.body.employeeId;

        doc.organisation_id = req.body.organisation_id
        doc.save(function (err, adjustAttendanceUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.json(adjustAttendanceUpdated);
          }
        });
      }
    });
};


module.exports.deleteAdjustAttendance = function (req, res) {
  var adjustAttendanceId = req.params.adjustAttendanceId;

  AdjustAttendance
    .findByIdAndRemove(adjustAttendanceId)
    .exec(function (err, adjustAttendance) {
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        var message = {
          "message": "adjustAttendance Details Deleted"
        };

        res
          .status(204)
          .json(message);
      }
    });
};

module.exports.getApprovalRegularistion = async function (req, res) {


  Employee.aggregate([
    { $match: { reporting_manager_id: req.params.emp_id } },
  ]).exec(async function (err, employee) {
    if (err) {

      res.status(500).json(err);
    } else {

      let empIdArray = [];
      employee.forEach((item) => {
        empIdArray.push(item.EmpCognitoID)
      })
      let approvalRegualarisation = await AdjustAttendance.aggregate([
        {
          $lookup: {
            from: "employees",
            localField: "employeeId",
            foreignField: "EmpCognitoID",
            as: "regularisation"
          }
        },

        { $match: { employeeId: { "$in": empIdArray }, status: "pending" } },


      ])
      res.json(approvalRegualarisation)
    }
  });
};

module.exports.updateApprovalRegularisation = function (req, res) {
  var adjustAttendanceId = req.body.adjustAttendanceId;


  AdjustAttendance.findById(adjustAttendanceId)
    .select(" ")
    .exec(function (err, doc) {
      var response = {
        status: 200,
        message: doc,
      };

      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        if (req.body.status == 'approved') {
          ClockInOut.findById(req.body.data.attendanceId)
            .select(" ")
            .exec(function (err, doc) {
              // let clockIn = moment.tz(new Date(doc.clockIn).setHours(String(req.body.data.clockIn).slice(0, 2), String(req.body.data.clockIn).slice(3, 5)), "Asia/Kolkata")
              // clockIn = moment.tz(new Date(clockIn), "Asia/Kolkata")
              // let clockOut = moment.tz(new Date(doc.clockOut), "Asia/Kolkata")
              // clockOut = moment.tz(new Date(clockOut).setHours(String(req.body.data.clockOut).slice(0, 2), String(req.body.data.clockOut).slice(3, 5)), "Asia/Kolkata")
              doc.clockIn = req.body.data.clockIn
              doc.clockOut = req.body.data.clockOut
              doc.totalHours = new Date(req.body.data.clockOut) - new Date(req.body.data.clockIn)

              doc.save()
            })
        }

        doc.status = req.body.status,
          doc.remark = req.body.remark
        doc.save(function (err, approvalRegularisationUpdated) {
          if (err) {
            res.json(err);
          } else {
            res.json(approvalRegularisationUpdated);
          }
        });
      }
    });
};
