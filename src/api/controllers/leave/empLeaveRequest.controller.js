// var mongoose = require('mongoose');
const EmpLeaveRequest = require("../../models/leave/empLeaveRequest.model");
const EmpLeaveDetails = require("../../models/leave/employeeLeaveDetail.model");
const Employee = require('../../models/employee/employee.model')


module.exports.getAllEmpLeaveRequest = async function (req, res) {
  try {
    let empLeaveRequest=await EmpLeaveRequest.find()
    res.json(empLeaveRequest)
  } catch (error) {
    
  }     
    
};

module.exports.getEmpLeaveRequestById = function (req, res) {


  EmpLeaveRequest.find({ employeeId: req.params.emp_id })
    .exec(function (err, EmpLeaveRequest) {
      try {
        if (err) {
          console.log("Error finding EmpLeaveRequest");
          res.status(500).json(err);
        } else {
          console.log("Found EmpLeaveRequest", EmpLeaveRequest.length);
          res.json(EmpLeaveRequest);
        }
      } catch (error) {
        
      }
      
    });
};

module.exports.empLeaveRequestAddOne = function (req, res) {
  console.log("Request body for employee :", req.body);
  EmpLeaveDetails.find({ employeeId: req.body.employeeId, leaveType_id: req.body.leaveType_id })

    .exec(function (err, EmpLeaveDetail) {
      if (err) {
        console.log(err)
      }
      else {

        if (EmpLeaveDetail[0].pendingLeave >= req.body.totalDays) {
          EmpLeaveRequest.create({
            comments: req.body.comments,
            employeeId: req.body.employeeId,
            fromDate: req.body.fromDate,
            leaveReqDateTime: req.body.leaveReqDateTime,
            toDate: req.body.toDate,
            leaveType_id: req.body.leaveType_id,
            totalDay: req.body.totalDays,
            status: "pending",
            attendanceId: req.body.attendanceId,

            empLeaveDetailId: EmpLeaveDetail[0]._id,
            organisation_id: req.body.organisation_id
          }, function (err, employeeLeaveRequest) {
            if (err) {
              console.log("Error creating emp leave request");
              res.status(400).json(err);
            } else {
              console.log("Employee leave request applyed", employeeLeaveRequest);
              res.json(employeeLeaveRequest);
              EmpLeaveDetails.find({ employeeId: req.body.employeeId, leaveType_id: req.body.leaveType_id })
                .exec((err, doc) => {
                  if (err) {

                  }
                  else {
                    doc[0].pendingLeave = doc[0].pendingLeave - req.body.totalDays

                    doc[0].save()
                  }
                })
            }
          });
        }
        else {
          res.json({
            message: 'you dont have sufficient leave'
          })
        }
      }
    })

};
//Update module
module.exports.empLeaveDetailsUpdateOne = function (req, res) {
  var empLeaveRequestId = req.params.empLeaveRequestId;
  console.log("GET the empLeaveRequest Id :", empLeaveRequestId);

  EmpLeaveRequest.findById(empLeaveRequestId)
    .select(" ")
    .exec(function (err, doc) {
      var response = {
        status: 200,
        message: doc,
      };

      if (err) {
        console.log("Error finding empLeaveRequest");
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        res;
        response.status = 404;
        response.message = {
          message: "empLeaveRequest ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        doc.leave_id = req.body.leave_id;
        doc.leaveType = req.body.leaveType;
        doc.leaveTypeReqDateTime = req.body.leaveTypeReqDateTime,
          doc.comments = req.body.comments;
        doc.fromDate = req.body.fromDate;
        doc.toDate = req.body.toDate;
        doc.noOfLeaveRequest = req.body.noOfLeaveRequest;
        leaveRequestedByEmp_Id = req.body.leaveRequestedByEmp_Id;
        doc.noOfWorkingHour = req.body.noOfWorkingHour;
        doc.isApproved = req.body.isApproved;
        doc.approvedByEmp_id = req.body.approvedByEmp_id;
        doc.approvalDateTime = req.body.approvalDateTime;
        doc.createdBy = req.body.createdBy;
        doc.createdDateTime = req.body.createdDateTime;
        doc.modifyBy = req.body.modifyBy;
        doc.modifyDateTime = req.body.modifyDateTime;
        doc.isPlanned = req.body.isPlanned;
        doc.status = req.body.status;

        doc.save(function (err, empLeaveRequestUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(204).json();
          }
        });
      }
    });
};

//Delete module
module.exports.empLeaveRequestDeleteOne = function (req, res) {
  var empLeaveRequestId = req.params.empLeaveRequestId;

  EmpLeaveRequest.findByIdAndRemove(empLeaveRequestId).exec(function (
    err,
    empLeaveRequest
  ) {
    if (err) {
      res.status(404).json(err);
    } else {
      console.log("empLeaveRequest  Deleted, id", empLeaveRequestId);
      res.status(204).json();
      EmpLeaveDetails.findById(req.params.empLeaveDetailId)
      .exec((err, doc) => {
        if (err) {
        }
        else {

           doc.pendingLeave=parseInt(doc.pendingLeave)+parseInt(req.params.totalDay)
           doc.save()
        }
      })
    }
  });
};


module.exports.leaveFindAndRequest = function (req, res) {

  EmpLeaveDetails.find({
    emp_id: req.body.emp_id,
    leaveType_id: req.body.leaveType_id
  })
    .exec(function (err, leavedetail) {
      if (err) {
        console.log(" console in error first level  ", leavedetail);
      } else {
        console.log(" in emp leave details console  ", leavedetail);
        if (req.body.noOfLeaveRequest > leavedetail.pendingLeave) {
          console.log(" Dont have sufficent leave ", leavedetail, leavedetail.length);
          var msg = "Dont have sufficent leave";
          res.status(201).json({ msg });
        }
        else {
          console.log(" in console ", leavedetail);
          // res.status(204).json({ msg });
          EmpLeaveRequest.aggregate([
            {
              $match: {
                emp_id: req.body.emp_id,
                leaveType_id: req.body.leaveType_id,
                status: req.body.status,
                fromDate: { $gte: req.body.fromDate },
                toDate: { $lte: req.body.toDate }
              }
            }
          ]
            //  fromDate: {
            //    $gte: req.body.fromDate,

            //  },

            //  toDate: {
            //   $lte: req.body.toDate
            //  }
          )

            .exec(function (err, employeeLeaveRequest) {
              if (employeeLeaveRequest) {
                console.log("creating leave request ", employeeLeaveRequest);
                EmpLeaveRequest.create(
                  {
                    emp_id: req.body.emp_id,
                    leaveType_id: req.body.leaveType_id,
                    leaveReqDateTime: req.body.leaveReqDateTime,
                    comments: req.body.comments,
                    fromDate: req.body.fromDate,
                    toDate: req.body.toDate,
                    noOfLeaveRequest: req.body.noOfLeaveRequest,
                    isApproved: req.body.isApproved,
                    approvedByEmp_id: req.body.approvedByEmp_id,
                    approvalDateTime: req.body.approvalDateTime,
                    createdBy: req.body.createdBy,
                    createdDateTime: req.body.createdDateTime,
                    modifyBy: req.body.modifyBy,
                    modifyDateTime: req.body.modifyDateTime,
                    isPlanned: req.body.isPlanned,
                    status: 'pending'

                  },
                  function (err, leaverequest) {
                    if (err) {
                      console.log("Error creating leave request");
                      res.status(400).json(err);
                    } else {
                      console.log("leave request submitted", leaverequest);
                      async function updateEmpLeaveDetail() {
                        let empLeaveDetail = await EmpLeaveDetails.findOneAndUpdate({
                          $and: [
                            { emp_id: req.body.emp_id },
                            { leaveType_id: req.body.leaveType_id },
                          ],
                        }, { $substract: ["$pendingLeave", req.body.noOfLeaveRequest] },
                          function (err, docs) {
                            if (err) {
                              console.log(err)
                            }
                            else {
                              console.log("Original Doc : ", docs);
                            }
                          }
                        )
                        
                      }

                      updateEmpLeaveDetail()
                      res.status(201).json(leaverequest);
                    }
                  }
                );
              } else {
                console.log(" request already submited for this time period  ", employeeLeaveRequest);
                var msg = "request already submited for this time period wait for approval";
                res.status(500).json({ msg });

              }
            });
        }
      }
    })
};


module.exports.updateApprovalLeave = function (req, res) {
  var adjustLeaveId = req.body.adjustLeaveId;
  console.log("GET the adjustAttendance Id :", adjustLeaveId);

  EmpLeaveRequest.findById(adjustLeaveId)
    .select(" ")
    .exec(function (err, doc) {
      var response = {
        status: 200,
        message: doc,
      };

      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      }
      else {
        if (req.body.status == 'approved') {
          doc.status = req.body.status,
            doc.remark = req.body.remark
          doc.save(function (err, updateApprovalLeaveUpdated) {
            if (err) {
              res.json(err);
            } else {
              res.json(updateApprovalLeaveUpdated);
            }
          });
        }
        else {
          doc.status = req.body.status,
            doc.remark = req.body.remark
          doc.save(function (err, updateApprovalLeaveUpdated) {
            if (err) {
              res.json(err);
            } else {
              res.json(updateApprovalLeaveUpdated);
              EmpLeaveDetails.findById(req.body.data.empLeaveDetailId)
                .exec((err, doc) => {
                  if (err) {

                  }
                  else {

                     doc.pendingLeave=parseInt(doc.pendingLeave)+parseInt(req.body.data.totalDay)
                     doc.save()
                  }
                })
            }
          })
        }
      }
    })
};

module.exports.getApprovalLeave = async function (req, res) {
  Employee.aggregate([
    { $match: { reporting_manager_id: req.params.emp_id } },
  ]).exec(async function (err, employee) {
    if (err) {
      console.log("Error finding Employee");
      res.status(500).json(err);
    } else {
      console.log("Found employee total == ", employee, employee.length);
      let empIdArray = [];
      employee.forEach((item) => {
        empIdArray.push(item.EmpCognitoID)
      })

      let approvalLeave = await EmpLeaveRequest.aggregate([
        {
          $lookup: {
            from: "employees",
            localField: "employeeId",
            foreignField: "EmpCognitoID",
            as: "leave"
          }
        },

        { $match: { employeeId: { $in: empIdArray }, status: "pending" } },

      ])
      res.json(approvalLeave)
    }
  });
}

