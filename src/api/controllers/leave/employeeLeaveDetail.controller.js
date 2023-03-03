const EmpLeaveDetails = require("../../models/leave/employeeLeaveDetail.model");
const EmpLeaveRequests = require("../../models/leave/empLeaveRequest.model")
const Employee = require('../../models/employee/employee.model')
const Policy = require('../../models/leave/leaveTypes.model')

async function getPolicy(d) {
  return await Policy.find({ employeeList: { $in: d } })
}
//Get EmpLeaveDetails list using Employee Id
module.exports.getAllEmpLeaveDetailsEmployeeId = function (req, res) {
  var offset = 0;
  var count = 10;
  var maxCount = 50;


  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({
      message: "If supplied in querystring count and offset should be a number",
    });
    return;
  }

  if (count > maxCount) {
    res.status(400).json({
      message: "Count limit of " + maxCount + " exceeded",
    });
    return;
  }

  EmpLeaveDetails.find({ emp_id: req.params.emp_id })
    .skip(offset)
    .exec(function (err, empLeaveDetails) {
      if (err) {

        res.status(500).json(err);
      } else {

        res.json(empLeaveDetails);
      }
    });
};

////////
//Get Employee Leave Details list
module.exports.getAllEmpLeaveDetails = function (req, res) {
  var offset = 0;
  var count = 5;
  var maxCount = 10;


  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({
      message: "If supplied in querystring count and offset should be a number",
    });
    return;
  }

  if (count > maxCount) {
    res.status(400).json({
      message: "Count limit of " + maxCount + " exceeded",
    });
    return;
  }

  EmpLeaveDetails.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, empLeaveDetails) {
      if (err) {

        res.status(500).json(err);
      } else {

        res.json(empLeaveDetails);
      }
    });
};

//Get Single EmpLeaveDetails using empLeaveDetails id and emp id
module.exports.getOneEmpLeaveDetailsEmployeeId = function (req, res) {
  var empLeaveDetailsId = req.params.empLeaveDetailsId;
  var emp_id = req.params.emp_id;


  EmpLeaveDetails.find({ _id: empLeaveDetailsId, emp_id: emp_id }).exec(
    function (err, doc) {
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
          message: "EmpLeaveDetails ID not found",
        };
      }
      res.status(response.status).json(response.message);
    }
  );
};

//Get Single Employee Leave Details
module.exports.getOneEmpLeaveDetails = function (req, res) {
  var _id = req.params.empLeaveDetailsId;

  EmpLeaveDetails.findById(_id).exec(function (err, doc) {
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
        message: "EmpLeaveDetails ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Add a new LeaveDetails
module.exports.empLeaveDetailsAddOne = function (req, res) {

  EmpLeaveDetails.create(
    {
      // leave_id: req.body.leave_id,
      leaveType_id: req.body.leaveType_id,
      pendingLeave: req.body.pendingLeave,
      totalLeave: req.body.totalLeave,
      lastLeaveAmount: req.body.lastLeaveAmount,
      lastLeaveAmountDate: req.body.lastLeaveAmountDate,
      emp_id: req.body.emp_id,
    },
    function (err, empLeaveDetails) {
      if (err) {

        res.status(400).json(err);
      }

      // if ({emp_id:{$ne:null}},
      //   leaveType_id,
      //   totalLeave){
      //   
      //   res.status(201).json
      // }
      else {

        res.status(201).json(empLeaveDetails);
      }
    }
  );
};

//Update module
module.exports.empLeaveDetailsUpdateOne = function (req, res) {
  var empLeaveDetailsId = req.params.empLeaveDetailsId;


  EmpLeaveDetails.findById(empLeaveDetailsId)
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
          message: "leaveDetails ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        // doc.leave_id = req.body.leave_id;
        doc.leaveType_id = req.body.leaveType_id;
        doc.pendingLeave = req.body.pendingLeave;
        doc.totalLeave = req.body.totalLeave;
        doc.lastLeaveAmount = req.body.lastLeaveAmount;
        doc.lastLeaveAmountDate = req.body.lastLeaveAmountDate;
        doc.emp_id = req.body.emp_id;

        doc.save(function (err, empLeaveDetailsUpdated) {
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
module.exports.empLeaveDetailsDeleteOne = function (req, res) {
  var empLeaveDetailsId = req.params.empLeaveDetailsId;

  EmpLeaveDetails.findByIdAndRemove(empLeaveDetailsId).exec(function (
    err,
    empLeaveDetails
  ) {
    if (err) {
      res.status(404).json(err);
    } else {

      res.status(204).json();
    }
  });
};

module.exports.getEmpLeaveDetail = function (req, res) {

  try {
    EmpLeaveDetails.aggregate([
      { $match: { employeeId: req.params.employeeId } },
      {
        $group: {
          _id: "$leaveType_id",
          pendingLeave: { $addToSet: "$pendingLeave" },
          totalLeave: { $addToSet: "$totalLeave" },
          balance: { $sum: "$pendingLeave" },
          maxValue: { $max: "$totalLeave" },
          minValue: { $min: "$pendingLeave" },
          color: { $addToSet: "$color" }
        }
      },
      {
        $addFields: {
          used: { $subtract: ["$maxValue", "$minValue"] }
        }
      }

    ])

      .exec(
        function (err, data) {

          EmpLeaveDetails.aggregate([
            { $match: { employeeId: req.params.employeeId } },
            {
              $group: {
                _id: "$employeeId",
                pendingLeave: { $sum: "$pendingLeave" },
                totalLeave: { $sum: "$totalLeave" },
              }
            },

            {
              $addFields: {
                totalused: { $subtract: ["$totalLeave", "$pendingLeave"] }
              }
            }

          ]).exec(function (err, response) {
            res.json({ data, response })
          })
        }
      )
  } catch (error) {
    res.json(error)
  }
  ;
}

module.exports.getEmpLeaveUsageByMonth = function (req, res) {


  EmpLeaveRequests.aggregate([
    { $match: { employeeId: req.params.employeeId, status: 'approved' } },
    {
      $group: {
        _id: { month: { $month: { $toDate: "$fromDate" }, toDate: { $addToSet: "$toDate" }, fromDate: { $addToSet: "$fromDate" } } },

      }
    },

    {
      $addFields: {
        leave: { $subtract: ["$toDate", "$fromDate"] }
      }
    }
  ])
    .exec(function (err, response) {
      if (err) {
        res.json(err)
      }

      else {
        res.json(response)
      }
    })
}

module.exports.creditEmployeeLeave = function (req, res) {
  Employee.find({ EmpCognitoID: 'b515badc-7719-4f40-952b-2d21b76a829f' })
    .exec((err, result) => {
      result.map(async (d) => {
        let policy = await getPolicy(d.EmpCognitoID)
        var monthMilliseconds = 1000 * 60 * 60 * 24 * 30
        policy.map(async(m) => {
          if (m.effectiveFrom == 'dateOfJoining') {
            monthMilliseconds = monthMilliseconds * m.effectiveAfter
            let effectiveFrom = new Date(d.joining_date) - new Date('Jan 1 1970 19:00:00 GMT-0500')
            effectiveFrom = effectiveFrom + monthMilliseconds
            if (new Date() > new Date(effectiveFrom)) {

              if (m.accural == 'monthly') {

                let leavepermonth = m.totalNoOfLeaveInYear / 12
                if (new Date().getDate() == 1) {
                  EmpLeaveDetails.find({ employeeId: d.EmpCognitoID, leaveType_id: m.code })
                    .exec((err, doc) => {

                      if (doc == '') {
                        EmpLeaveDetails.create({
                          leaveType_id: m.code,
                          pendingLeave: leavepermonth,
                          totalLeave: leavepermonth,
                          employeeId: d.EmpCognitoID,
                          color: m.color
                        })
                      }
                      else if (doc[0].employeeId==d.EmpCognitoID && doc[0].leaveType_id==m.code) {
                        doc[0].pendingLeave = doc[0].pendingLeave + leavepermonth,
                          doc[0].totalLeave = doc[0].totalLeave + leavepermonth
                        doc[0].save()
                      }
                      else if (doc[0].employeeId!=d.EmpCognitoID && doc[0].leaveType_id!=m.code){
                        EmpLeaveDetails.create({
                          leaveType_id: m.code,
                          pendingLeave: leavepermonth,
                          totalLeave: leavepermonth,
                          employeeId: d.EmpCognitoID,
                          color: m.color
                        })
                      }
                    })
                }
              }

              else if (m.accural == 'quarterly') {
                let leavepermonth = m.totalNoOfLeaveInYear / 4
                if (new Date().getDate() == 1 && new Date().getMonth() == 0 || new Date().getMonth() == 3 || new Date().getMonth() == 7 || new Date().getMonth() == 11) {
                  EmpLeaveDetails.find({ employeeId: d.EmpCognitoID, leaveType_id: m.code })
                    .exec((err, doc) => {
                      if (doc == '') {
                        EmpLeaveDetails.create({
                          leaveType_id: m.code,
                          pendingLeave: leavepermonth,
                          totalLeave: leavepermonth,
                          employeeId: d.EmpCognitoID,
                          color: m.color
                        })
                      }
                      else if (doc[0].employeeId == d.EmpCognitoID && doc[0].leaveType_id == m.code) {
                        doc[0].pendingLeave = doc[0].pendingLeave + leavepermonth,
                          doc[0].totalLeave = doc[0].totalLeave + leavepermonth
                        doc[0].save()
                      }
                      else if (doc[0].employeeId != d.EmpCognitoID || doc[0].leaveType_id != m.code) {
                        EmpLeaveDetails.create({
                          leaveType_id: m.code,
                          pendingLeave: leavepermonth,
                          totalLeave: leavepermonth,
                          employeeId: d.EmpCognitoID,
                          color: m.color
                        })
                      }
                    })
                }
              }

              else if (m.accural == 'yearly') {

                EmpLeaveDetails.find({ employeeId: d.EmpCognitoID, leaveType_id: m.code })
                  .exec((err, doc) => {
                    if (doc == '') {
                      EmpLeaveDetails.create({
                        leaveType_id: m.code,
                        pendingLeave: m.totalNoOfLeaveInYear,
                        totalLeave: m.totalNoOfLeaveInYear,
                        employeeId: d.EmpCognitoID,
                        color: m.color
                      })
                    }
                    else if (doc[0].employeeId==d.EmpCognitoID && doc[0].leaveType_id==m.code) {
                      doc[0].pendingLeave = doc[0].pendingLeave + m.totalNoOfLeaveInYear,
                        doc[0].totalLeave = doc[0].totalLeave + m.totalNoOfLeaveInYear
                      doc[0].save()
                    }
                    else if (doc[0].employeeId != d.EmpCognitoID || doc[0].leaveType_id != m.code) {
                      EmpLeaveDetails.create({
                        leaveType_id: m.code,
                        pendingLeave: m.totalNoOfLeaveInYear,
                        totalLeave: m.totalNoOfLeaveInYear,
                        employeeId: d.EmpCognitoID,
                        color: m.color
                      })
                    }
                  })
              }

              else if (m.accural == 'biMonthly') {
                let leavepermonth = policy[0].totalNoOfLeaveInYear / 24

                EmpLeaveDetails.find({ employeeId: d.EmpCognitoID, leaveType_id: m.code })
                  .exec((err, doc) => {
                    if (doc == '') {
                      EmpLeaveDetails.create({
                        leaveType_id: m.code,
                        pendingLeave: leavepermonth,
                        totalLeave: leavepermonth,
                        employeeId: d.EmpCognitoID,
                        color: m.color
                      })
                    }
                    else if (doc[0].employeeId == d.EmpCognitoID && doc[0].leaveType_id == m.code) {
                      doc[0].pendingLeave = doc[0].pendingLeave + leavepermonth,
                        doc[0].totalLeave = doc[0].totalLeave + leavepermonth
                      doc[0].save()
                    }
                    else if (doc[0].employeeId != d.EmpCognitoID || doc[0].leaveType_id != m.code) {
                      EmpLeaveDetails.create({
                        leaveType_id: m.code,
                        pendingLeave: leavepermonth,
                        totalLeave: leavepermonth,
                        employeeId: d.EmpCognitoID,
                        color: m.color
                      })
                    }
                  })
              }

              else if (m.accural == 'halfYearly') {
                let leavepermonth = m.totalNoOfLeaveInYear / 6

                EmpLeaveDetails.find({ employeeId: d.EmpCognitoID, leaveType_id: m.code })
                  .exec((err, doc) => {
                    if (doc == '') {
                      EmpLeaveDetails.create({
                        leaveType_id: m.code,
                        pendingLeave: leavepermonth,
                        totalLeave: leavepermonth,
                        employeeId: d.EmpCognitoID,
                        color: m.color
                      })
                    }
                    else if (doc[0].employeeId == d.EmpCognitoID && doc[0].leaveType_id == m.code) {
                      doc[0].pendingLeave = doc[0].pendingLeave + leavepermonth,
                        doc[0].totalLeave = doc[0].totalLeave + leavepermonth
                      doc[0].save()
                    }
                    else if (doc[0].employeeId != d.EmpCognitoID || doc[0].leaveType_id != m.code) {
                      EmpLeaveDetails.create({
                        leaveType_id: m.code,
                        pendingLeave: leavepermonth,
                        totalLeave: leavepermonth,
                        employeeId: d.EmpCognitoID,
                        color: m.color
                      })
                    }
                  })
              }
            }
          }

          else if (m.effectiveFrom == 'dateOfConfirmation') {
            monthMilliseconds = monthMilliseconds * m.effectiveAfter
            let effectiveFrom = new Date(d.dateOfConfirmation) - new Date('Jan 1 1970 19:00:00 GMT-0500')
            effectiveFrom = effectiveFrom + monthMilliseconds
            if (new Date() > new Date(effectiveFrom)) {

              if (m.accural == 'monthly') {
                let leavepermonth = m.totalNoOfLeaveInYear / 12
                if (new Date().getDate() == 1) {

                  EmpLeaveDetails.find({ employeeId: d.EmpCognitoID, leaveType_id: m.code })
                    .exec((err, doc) => {
                      if (doc == '') {
                        EmpLeaveDetails.create({
                          leaveType_id: m.code,
                          pendingLeave: leavepermonth,
                          totalLeave: leavepermonth,
                          employeeId: d.EmpCognitoID,
                          color: m.color
                        })
                      }
                      else if (doc[0].employeeId == d.EmpCognitoID && doc[0].leaveType_id == m.code) {
                        doc[0].pendingLeave = doc[0].pendingLeave + leavepermonth,
                          doc[0].totalLeave = doc[0].totalLeave + leavepermonth
                        doc[0].save()
                      }
                      else if (doc[0].employeeId != d.EmpCognitoID || doc[0].leaveType_id != m.code) {
                        EmpLeaveDetails.create({
                          leaveType_id: m.code,
                          pendingLeave: leavepermonth,
                          totalLeave: leavepermonth,
                          employeeId: d.EmpCognitoID,
                          color: m.color
                        })
                      }
                    })
                }
              }

              else if (m.accural == 'quarterly') {
                let leavepermonth = m.totalNoOfLeaveInYear / 4
                if (new Date().getDate() == 1 && new Date().getMonth() == 0 || new Date().getMonth() == 3 || new Date().getMonth() == 7 || new Date().getMonth() == 11) {
                  EmpLeaveDetails.find({ employeeId: d.EmpCognitoID, leaveType_id: m.code })
                    .exec((err, doc) => {
                      if (doc == '') {
                        EmpLeaveDetails.create({
                          leaveType_id: m.code,
                          pendingLeave: leavepermonth,
                          totalLeave: leavepermonth,
                          employeeId: d.EmpCognitoID,
                          color: m.color
                        })
                      }
                      else if (doc[0].employeeId == d.EmpCognitoID && doc[0].leaveType_id == m.code) {
                        doc[0].pendingLeave = doc[0].pendingLeave + leavepermonth,
                          doc[0].totalLeave = doc[0].totalLeave + leavepermonth
                        doc[0].save()
                      }
                      else if (doc[0].employeeId != d.EmpCognitoID || doc[0].leaveType_id != m.code) {
                        EmpLeaveDetails.create({
                          leaveType_id: m.code,
                          pendingLeave: leavepermonth,
                          totalLeave: leavepermonth,
                          employeeId: d.EmpCognitoID,
                          color: m.color
                        })
                      }
                    })
                }
              }

              else if (m.accural == 'yearly') {

                EmpLeaveDetails.find({ employeeId: d.EmpCognitoID, leaveType_id: m.code })
                  .exec((err, doc) => {
                    if (doc == '') {
                      EmpLeaveDetails.create({
                        leaveType_id: m.code,
                        pendingLeave: m.totalNoOfLeaveInYear,
                        totalLeave: m.totalNoOfLeaveInYear,
                        employeeId: d.EmpCognitoID,
                        color: m.color
                      })
                    }
                    else if (doc[0].employeeId==d.EmpCognitoID && doc[0].leaveType_id==m.code) {
                      doc[0].pendingLeave = doc[0].pendingLeave + m.totalNoOfLeaveInYear,
                        doc[0].totalLeave = doc[0].totalLeave + m.totalNoOfLeaveInYear
                      doc[0].save()
                    }
                    else if (doc[0].employeeId != d.EmpCognitoID || doc[0].leaveType_id != m.code) {
                      EmpLeaveDetails.create({
                        leaveType_id: m.code,
                        pendingLeave: m.totalNoOfLeaveInYear,
                        totalLeave: m.totalNoOfLeaveInYear,
                        employeeId: d.EmpCognitoID,
                        color: m.color
                      })
                    }
                  })
              }

              else if (m.accural == 'biMonthly') {
                let leavepermonth = policy[0].totalNoOfLeaveInYear / 24

                EmpLeaveDetails.find({ employeeId: d.EmpCognitoID, leaveType_id: m.code })
                  .exec((err, doc) => {
                    if (doc == '') {
                      EmpLeaveDetails.create({
                        leaveType_id: m.code,
                        pendingLeave: leavepermonth,
                        totalLeave: leavepermonth,
                        employeeId: d.EmpCognitoID,
                        color: m.color
                      })
                    }
                    else if (doc[0].employeeId == d.EmpCognitoID && doc[0].leaveType_id == m.code) {
                      doc[0].pendingLeave = doc[0].pendingLeave + leavepermonth,
                        doc[0].totalLeave = doc[0].totalLeave + leavepermonth
                      doc[0].save()
                    }
                    else if (doc[0].employeeId != d.EmpCognitoID || doc[0].leaveType_id != m.code) {
                      EmpLeaveDetails.create({
                        leaveType_id: m.code,
                        pendingLeave: leavepermonth,
                        totalLeave: leavepermonth,
                        employeeId: d.EmpCognitoID,
                        color: m.color
                      })
                    }
                  })
              }

              else if (m.accural == 'halfYearly') {
                let leavepermonth = m.totalNoOfLeaveInYear / 6

                EmpLeaveDetails.find({ employeeId: d.EmpCognitoID, leaveType_id: m.code })
                  .exec((err, doc) => {
                    if (doc == '') {
                      EmpLeaveDetails.create({
                        leaveType_id: m.code,
                        pendingLeave: leavepermonth,
                        totalLeave: leavepermonth,
                        employeeId: d.EmpCognitoID,
                        color: m.color
                      })
                    }
                    else if (doc[0].employeeId == d.EmpCognitoID && doc[0].leaveType_id == m.code) {
                      doc[0].pendingLeave = doc[0].pendingLeave + leavepermonth,
                        doc[0].totalLeave = doc[0].totalLeave + leavepermonth
                      doc[0].save()
                    }
                    else if (doc[0].employeeId != d.EmpCognitoID || doc[0].leaveType_id != m.code) {
                      EmpLeaveDetails.create({
                        leaveType_id: m.code,
                        pendingLeave: leavepermonth,
                        totalLeave: leavepermonth,
                        employeeId: d.EmpCognitoID,
                        color: m.color
                      })
                    }
                  })
              }
            }
          }
        })
      })
    })

}