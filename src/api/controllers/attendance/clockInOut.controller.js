const ClockInOut = require('../../models/attendance/clockInOut.model');
const Holiday = require('../../models/holidays/holidays.model');
const Leave = require('../../models/leave/empLeaveRequest.model');
const Employee = require('../../models/employee/employee.model');
const AttendancePolicy = require('../../models/attendance/attendancePolicies.model')
var NodeGeocoder = require('node-geocoder')
const mongoose = require('mongoose')
const moment = require('moment-timezone')
const EmployeeActivity = require('../../models/employeeActivity/empActivity.model')

const BreakHour = require('../../models/attendance/breakHour.model')

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
function formatDdyymm(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
}

//this function is used for empActivity of day
async function getEmpActivity(data, clockDate) {
  try {
    let Activity = await EmployeeActivity.find({ employeeId: data._id, eventDateTime: { $regex: clockDate } })
    let mouseactivity = []
    Activity.forEach(element => {
      let pCount = mouseactivity.length == '0' ? 0 : mouseactivity[mouseactivity.length - 1].element.eventCounting
      if (element.eventCounting > pCount) {
        let mousecount = element.eventCounting - pCount
        let percent = mousecount / 20 * 100
        if (percent >= 100) {
          mouseactivity.push({ element, productivity: 100 })
        }
        else {
          mouseactivity.push({ element, productivity: percent < 0 ? 0 : percent })
        }
      }
      else {
        mouseactivity.push({ element, productivity: 0 })
      }
    })
    let idleHrs = mouseactivity.filter((m) => m.productivity == 0).length * 120000
    return idleHrs
  } catch (error) {

  }

}

//this function is used for break hour day
async function getBreakHours(data, clockDate) {
  try {
    let breakHour = await BreakHour.aggregate([
      {
        $match: { date: clockDate, employeeId: data._id }
      },
      {
        $group: { _id: "$date", totalQuantity: { $sum: "$totalBreakHours" } }
      }
    ])
    return breakHour
  } catch (error) {
    console.log(error)
  }

}

//this function is used for getting employee data 
async function getEmployeeData(data) {
  try {
    let employeeData = await Employee.aggregate([
      {
        $match: { EmpCognitoID: data }
      },

    ])
    return employeeData
  } catch (error) {
    console.log(error)
  }

}

//Get clock in & out details by _id 
module.exports.getClockInOutDetailsById = function (req, res) {
  var attId = req.params.attId;


  ClockInOut
    .find({ _id: attId })
    .exec(function (err, doc) {
      var response = {
        status: 200,
        message: doc
      }

      if (err) {

        response.status = 500;
        response.message = err;
      } else if (!doc) {
        res
        response.status = 404;
        response.message = {
          "message": "attId not found"
        };
      }
      res
        .status(response.status)
        .json(response.message);

    });

};

//Get clock in & out by employeeId 
module.exports.getEmpClockInOutByDate = function (req, res) {
  var employeeId = req.params.employeeId;
  var clockInDate = req.params.clockIn;


  ClockInOut
    .find({ employeeId: employeeId, clockIn: clockInDate })
    .sort({ createdAt: -1 })
    .exec(function (err, doc) {
      var response = {
        status: 200,
        message: doc22
      }
      try {
        if (err) {

          response.status = 500;
          response.message = err;
        } else if (!doc) {
          res
          response.status = 404;
          response.message = {
            "message": "employeeId not found"
          };
        }
        res
          .status(response.status)
          .json(response.message);

      } catch (error) {
        res.json(error)
      }

    });

};

module.exports.insertClockInOut = async function (req, res) {
  try {
    let policy = await AttendancePolicy.find({ employeeList: { $in: req.body.employeeId } })
    let fromTime = new Date().setHours(policy[0].lanientMode.fromTime == '' ? '00' : policy[0].lanientMode.toTime.slice(0, 2), policy[0].lanientMode.fromTime == '' ? '00' : policy[0].lanientMode.toTime.slice(4, 6))
    let web = policy[0].webCheckInOut == 'Enable' ? 'web' : null
    let mobile = policy[0].mobileCheckInOut == 'Enable' ? 'mobile' : null
    let Desktop = policy[0].desktopCheckInOut == 'Enable' ? 'Desktop' : null

    let Buid = await getEmployeeData(req.body.employeeId)

    if (req.body.deviceType == web || req.body.deviceType == mobile || req.body.deviceType == Desktop) {
      if (new Date(fromTime) < new Date()) {

        var options = {
          provider: 'google',

          
          httpAdapter: 'https',
          apiKey: 'AIzaSyCUi5YXbyXl7PcXttFlvZb1EpmaUF25cJk',
          formatter: null
        };

        var geocoder = NodeGeocoder(options)

        const clockInAddress = async () => {
          return await geocoder.reverse({ lat: req.body.clockInLatLang.latitude, lon: req.body.clockInLatLang.longitude })
        }

        ClockInOut
          .create({

            employeeId: req.body.employeeId,
            clockIn: moment.tz(new Date(), "Asia/Kolkata"),
            clockInOutDate: formatDate(new Date()),
            clockInLocation: req.body.clockInLatLang == undefined ? '' : await clockInAddress(),
            clockInImg: req.body.clockInImg,
            clockInServerTime: req.body.clockInServerTime,
            clockInLatLang: req.body.clockInLatLang,
            clockOut: "null",
            clockOutLocation: req.body.clockOutLocation,
            clockOutImg: req.body.clockOutImg,
            clockOutServerTime: req.body.clockOutServerTime,
            totalHours: req.body.totalHours,
            systemId: req.body.systemId,
            organisation_id: req.body.organisation_id,
            deviceType: req.body.deviceType,
            Buid: Buid[0].client_id
          }, function (err, clockinout) {
            if (err) {

              res
                .status(400)
                .json(err);
            } else {


              let id = clockinout._id

              let auto = moment.tz(new Date().setHours(23, 00), "Asia/Kolkata")

              let timeOut = new Date(auto) - new Date()

              setTimeout(() => {
                ClockInOut
                  .findById(id)
                  .exec(function (err, res) {
                    if (res.clockOut == 'null') {
                      ClockInOut
                        .findById(id)
                        .exec(function (err, doc) {
                          if (err) {
                            res
                              .status(err)
                              .json(err);
                          } else {
                            doc.clockOut = moment.tz(new Date(), "Asia/Kolkata"),

                              doc.save()

                          }
                        })
                    }
                    else {

                    }
                  })
              }, timeOut);

              res.json(clockinout);
            }
          });
      }
      else {

      }
    }
    else {
      res.status(400).json('please login from correct device')
    }
  } catch (error) {
    res.json(error)
  }

};

async function getLastAttendance(emp) {
  try {
    let clockInOut = await ClockInOut.find({ employeeId: emp })
      .sort({ updatedAt: -1 })
      .limit(1)
    if (clockInOut.err) {

    }
    else {
      let punchInTime = clockInOut[0].clockIn
      let punchOutTime = clockInOut[0].clockOut
      let punchDate = clockInOut[0].clockInOutDate
      let attendanceId = clockInOut[0]._id

      let deviceType = clockInOut[0].deviceType
      return ({ punchInTime, punchOutTime, punchDate, attendanceId, deviceType })
    }
  } catch (error) {

  }

}

module.exports.updateClockOut = async function (req, res) {
  try {
    let punchData = await getLastAttendance(req.body.employeeId)
    let policy = await AttendancePolicy.find({ employeeList: { $in: req.body.employeeId } })
    let toTime = new Date().setHours(policy[0].lanientMode.toTime == '' ? '23' : policy[0].lanientMode.toTime.slice(0, 2), policy[0].lanientMode.toTime == '' ? '59' : policy[0].lanientMode.toTime.slice(4, 6))

    if (req.body.deviceType == punchData.deviceType) {

      if (new Date(toTime) > new Date()) {

        var options = {
          provider: 'google',

          httpAdapter: 'https',
          apiKey: 'AIzaSyCUi5YXbyXl7PcXttFlvZb1EpmaUF25cJk',
          formatter: null
        };

        var geocoder = NodeGeocoder(options)

        const clockOutAddress = async () => {
          return await geocoder.reverse({ lat: req.body.clockOutLatLang.latitude, lon: req.body.clockOutLatLang.longitude })
        }

        let working = new Date() - new Date(punchData.punchInTime)

        ClockInOut
          .findById(punchData.attendanceId)
          .select(" ")
          .exec(async function (err, doc) {
            var response = {
              status: 200,
              message: doc
            }
            if (err) {

              response.status = 500;
              response.message = err;
            } else {
              doc.employeeId = req.body.employeeId,
                doc.clockOut = moment.tz(new Date(), "Asia/Kolkata"),
                doc.clockOutLocation = req.body.clockOutLatLang == undefined ? '' : await clockOutAddress(),
                doc.clockOutImg = req.body.clockOutImg,
                doc.clockOutServerTime = req.body.clockOutServerTime,
                doc.clockOutLatLang = req.body.clockOutLatLang,
                doc.totalHours = working,
                doc.systemId = req.body.systemId,
                doc.mobileCheckInOut = req.body.mobileCheckInOut,
                doc.organisation_id = req.body.organisation_id,
                doc.deviceType = req.body.deviceType
              doc.save(function (err, clockOutUpdated) {
                if (err) {
                  res
                    .status(500)
                    .json(err);

                } else {
                  res.json(clockOutUpdated);

                }
              });

            }
          });
      }
    }
    else {
      res.status(400)
      res.json('please login from correct device')
    }
  } catch (error) {
    res.json(error)
  }

}



module.exports.updateOrganisation = function (req, res) {
  var organisation_id = req.params.organisation_id;

  var query = { _id: organisation_id };
  var updatedValues = { $set: { name: req.params.name } };

  Organisation
    .updateOne(query, updatedValues, function (err, doc) {
      var response = {
        status: 200,
        message: doc
      }
      if (err) {

        response.status = 500;
        response.message = err;
      }
      else {
        doc.name = req.body.name,
          doc.no_of_employee = req.body.no_of_employee,
          doc.legal_status = req.body.legal_status,
          doc.gstin = req.body.gstin,
          doc.org_pan = req.body.org_pan,
          doc.org_logo = req.body.org_logo,
          doc.group_companies = req.body.group_companies,
          doc.mobile_number = req.body.mobile_number,
          doc.code = req.body.code,
          doc.address1 = req.body.address1,
          doc.address2 = req.body.address2,
          doc.org_city = req.body.org_city,
          doc.org_state = req.body.org_state,
          doc.org_pincode = req.body.org_pincode,
          doc.org_country = req.body.org_country
      }
    });
};



module.exports.deleteOrganisation = function (req, res) {
  var organisation_id = req.params.organisation_id;

  Organisation
    .findById(organisation_id)
    .select("")
    .exec(function (err, doc) {
      var response = {
        status: 200,
        message: doc
      }
      if (err) {

        response.status = 500;
        response.message = err;
      } else if (!doc) {
        res
        response.status = 404;
        response.message = {
          "message": "organisation ID not found"
        };
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        doc.isActive = req.body.IsActive,
          doc.save(function (err, organisationUpdated) {
            var response = {
              status: 200,
              message: 'organisation Updated'
            }
            if (err) {
              res
                .status(500)
                .json(err);

            } else {
              res
                .status(204)
                .json();

            }
          });
      }
    });
};




module.exports.getAllAttendenceByDate = async function (req, res) {
  var employeeId = req.params.empId;
  var clockInDate = req.params.date;
  try {
    var clockinout = await ClockInOut.find({ employeeId: employeeId, clockInOutDate: clockInDate }) .sort({ updatedAt: -1 })

    if (clockinout.err) {

      res.status(500).json(err);
    }
    else {

      res.json(clockinout);
    }
  } catch (error) {

  }

};

module.exports.getAllAttendence = async function (req, res) {

  var employeeId = req.params.empId
  try {
    let clockInOut = await ClockInOut.find({ employeeId: employeeId })
      .sort({ updatedAt: -1 })
      .limit(1)
    if (clockInOut.err) {

    }
    else {
      let punchDetail = clockInOut
      let punchInTime = punchDetail[punchDetail.length - 1].clockIn
      let punchOutTime = punchDetail[punchDetail.length - 1].clockOut
      let punchDate = punchDetail[punchDetail.length - 1].clockInOutDate
      let attendanceId = punchDetail[punchDetail.length - 1]._id
      let clockInImg = punchDetail[punchDetail.length - 1].clockInImg
      let clockOutImg = punchDetail[punchDetail.length - 1].clockOutImg
      let clockInLatLang = punchDetail[punchDetail.length - 1].clockInLatLang
      let clockOutLatLang = punchDetail[punchDetail.length - 1].clockOutLatLang
      res.json({ clockInImg, clockOutImg, clockInLatLang, clockOutLatLang, punchInTime, punchOutTime, punchDate, attendanceId })
    }
  } catch (error) {
    res.json(error)
  }

};

module.exports.getAttenClockInOutByDate = function (req, res) {
  var fromDate = req.body.fromDate;
  var todate = formatDate(req.body.toDate);
  var employeeId = req.body.employeeId;



  ClockInOut
    .find({ //query today up to tonight

      // createdAt: {
      //     $gte: new Date(fromDate),
      //     $lte: new Date(toDate),
      //     employeeId:employeeId
      //   }
      createdAt: {
        $gte: new Date(fromDate),
        $lt: new Date(todate),

      },
      employeeId: employeeId
    })
    .exec(function (err, doc) {
      try {
        var response = {
          status: 200,
          message: doc
        }

        if (err) {

          response.status = 500;
          response.message = err;
        } else if (!doc) {
          res
          response.status = 404;
          response.message = {
            "message": "clockIn not found"
          };
        }
        res
          .status(response.status)
          .json(response.message)
      } catch (error) {

      }
      ;

    });

};


module.exports.getWorkingHrsByDate = function (req, res) {
  var employeeId = req.params.employeeId;
  var date = req.params.date;


  ClockInOut.aggregate([
    {
      $match: { clockInOutDate: date, employeeId: req.params.employeeId }
    },
    {
      $group: { _id: "$clockInOutDate", totalQuantity: { $sum: "$totalHours" } }
    }
  ])

    .exec(function (err, doc) {
      try {
        var response = {
          status: 200,
          message: doc
        }

        if (err) {

          response.status = 500;
          response.message = err;
        } else if (!doc) {
          res
          response.status = 404;
          response.message = {
            "message": "employeeId not found"
          };
        }
        res
          .status(response.status)
          .json(response.message);
      } catch (error) {

      }

    });

};

module.exports.getWorkingHrsPeriodByDate = async function (req, res) {
  var employeeId = req.body.employeeId;

  var fromdate = formatDate(req.body.fromdate)
  let todate = new Date(req.body.todate);
  // todate.setDate(todate.getDate() + 1);
  // let Todate = formatDate(todate);

  try {
    let workingHrs = await ClockInOut.aggregate([
      {
        $match: { employeeId: req.body.employeeId }
      },
      {
        $match: {
          createdAt: {
            $gte: new Date(fromdate),
            $lte: new Date(todate)
          }
        }
      },
      {
        $group: { _id: "$employeeId", totalQuantity: { $sum: "$totalHours" } }
      }
    ])
    res.json(workingHrs)
  } catch (error) {

  }

};

//GET Attendence Summary between given Dates using emp cognito id
module.exports.getTimePeriodAttendenceSummary = async function (req, res) {


  var weekendDays = 0;
  var totalDays = 0;
  var workingDays = 0;
  var holidayCount = 0, leaveDaysCount = 0;

  ClockInOut
    .find({
      clockInOutDate: {
        $gte: req.params.fromDate,
        $lt: req.params.toDate,
      },
      employeeId: req.params.employeeId
    })
    .exec(async function (err, doc) {
      if (err) {


      }
      else {
        var dayMilliseconds = 1000 * 60 * 60 * 24
        let start = new Date(req.params.fromDate),
          finish = new Date(req.params.toDate);
        var weekendDays = 0;
        var totalDays = 0;
        var workingDays = 0;
        for (; start <= finish; start = new Date(+start + dayMilliseconds)) {
          totalDays++;
          var day = start.getDay()
          //For Sundays count
          if (day == 0) {
            //For saturday and sundays count
            // if (day == 0 || day == 6) {
            weekendDays++;
          }
        }


        // workingDays = getWorkingDays( req.params.fromDate, req.params.toDate, req.params.employeeId);
        let present1
        try {
          present1 = await ClockInOut
            .aggregate([
              { $match: { employeeId: req.params.employeeId } },
              { $match: { clockInOutDate: { $gte: req.params.fromDate, $lte: req.params.toDate } } },
              { $group: { _id: '$clockInOutDate' } },
              {
                $count: "count"
              }
            ])
        }
        catch (err) {

        }

        Holiday.find({
          date: {
            $gte: req.params.fromDate,
            $lt: req.params.toDate,
          },

          organisation_id: req.params.organisation_id
        }).countDocuments()

          .exec(function (err, holiday) {
            if (err) {


            }


          })

        Leave
          .find({
            fromDate: {
              $gte: req.params.fromDate,
              $lte: req.params.toDate,
            },
            status: 'approved',
            emp_id: req.params.employeeId
          })
          .exec(function (err, leave) {
            if (err) {

            }
            else {

              if (leave.length > 0) {
                leave.map((data, i) => {

                  var d1 = new Date(data.toDate);
                  var d2 = new Date(data.fromDate);
                  var d3 = new Date(req.params.toDate);
                  if (d1 > d3) {

                    if (d3.getTime() == d2.getTime()) {
                      leaveDaysCount = 1;
                    } else {
                      leaveDaysCount = (d3.getTime() - d2.getTime()) / (1000 * 3600 * 24);
                      // var head=d2,tail=d3;
                      // while (head <= tail) {
                      //     leaveDaysCount++;
                      //     head = new Date(+head + (1000 * 60 * 60 * 24));
                      // }
                    }
                  } else {

                    if (d1 == d2) {
                      leaveDaysCount = 1
                    } else {
                      leaveDaysCount += (d1.getTime() - d2.getTime()) / (1000 * 3600 * 24)
                    }
                  }
                })
              } else {
                leaveDaysCount = 0
              }
              if (present1.length > 0) {
                workingDays = present1[0].count
              }
              var response = {
                status: 200,
                message: {
                  presentDaysCount: workingDays,
                  workingDays: totalDays - holidayCount - weekendDays,
                  totalDays: totalDays,
                  weeklyOff: weekendDays,
                  holidayCount: holidayCount,
                  leave: leaveDaysCount,
                  absentWithoutPay: (totalDays - holidayCount - weekendDays) - (workingDays + leaveDaysCount)
                }
              }
              res
                .status(response.status)
                .json(response.message)
            }
          })
      }
    })

}


// this function create for get total present employee for datewise

module.exports.getTotalPresentEmpByDate = function (req, res) {
  Employee.find({ organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id) })
    .exec(async function (err, employee) {
      if (err) {
        res.status(500).json(err);
      } else {
        let tree = [];
        let directIndirectTree = [];

        function getChildsTree(childs) {

        }
        function getChilds(id) {
          let childs = employee.filter(ele => { if (ele.reporting_manager_id == id) { return ele; } })
          if (childs.length > 0) {

            tree.push({
              EmpCognitoID: id,
              childs: childs
            })
            childs.forEach(ele => {
              directIndirectTree.push(ele.EmpCognitoID)
              // getChildsTree(ele.EmpCognitoID)
            })

          }
        }
        getChilds(req.params.emp_id)

        ClockInOut
          .aggregate([
            {
              $lookup: {
                from: "employees",
                localField: "employeeId",
                foreignField: "EmpCognitoID",
                as: "employeedata"
              }
            },

            { $match: { clockInOutDate: req.params.clockInOutDate, employeeId: { $in: directIndirectTree } } },

            {
              $group: {
                _id: "$employeeId", clockIn: { $first: "$clockIn" }, clockOut: { $last: "$clockOut" },
                profile_pic: { $addToSet: "$employeedata.profile_pic" },
                name: { $addToSet: "$employeedata.name" }, lastname: { $addToSet: "$employeedata.l_name" }, client_id: { $addToSet: "$employeedata.client_id" }
              }
            }
          ])
          .exec(function (err, employeeList) {

            if (err) {

            }
            else {
              res.json({ count: employeeList.length, empList: employeeList })

            }
          })
      }
    })

}




//Change here
module.exports.getTeamEmployeeDate = function (req, res) {


  Employee.find({ organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id), status: 'true' })
    .exec(async function (err, employee) {
      if (err) {
        res.status(500).json(err);
      } else {
        let tree = [];
        let directIndirectTree = [];

        function getChildsTree(childs) {
          childs.forEach(childNode => {
            getChilds(childNode.EmpCognitoID);
          })
        }
        function getChilds(id) {
          let childs = employee.filter(ele => { if (ele.reporting_manager_id == id) { return ele; } })
          if (childs.length > 0) {

            tree.push({
              EmpCognitoID: id,
              childs: childs
            })
            childs.forEach(ele => {
              directIndirectTree.push(ele.EmpCognitoID)
            })
            // getChildsTree(childs)
          }
        }
        getChilds(req.params.emp_id);

        ClockInOut.aggregate([
          {
            $lookup: {
              from: "employees",
              localField: "employeeId",
              foreignField: "EmpCognitoID",
              as: "employeedata"
            }
          },
          {
            $match: { employeeId: { $in: directIndirectTree }, clockInOutDate: req.params.date }
          },
          {
            $group: {
              _id: "$employeeId",
              clockIn: { $first: "$clockIn" }, clockOut: { $last: "$clockOut" },
              location: { $addToSet: "$clockInLatLang" },
              totalWorkHrs: { $sum: "$totalHours" },
              employeedata: { $addToSet: "$employeedata" },
              EmpCognitoID: { $addToSet: "$employeeId" },
              employeelstname: { $first: "$employeedata.l_name" },
              name: { $first: "$employeedata.name" },
              clockInAddress: { $addToSet: "$clockInLocation" },
              clockOutAddress: { $addToSet: "$clockOutLocation" },
              date: { $addToSet: "$clockInOutDate" }
            }
          }
        ]).exec(function (err, result) {
          try {
            if (err) {
              res.json(err)
            } else {
              res.json(result)
              // let resp = []
              // result.map(async (k) => {
              //   let idleHrs = await getEmpActivity(k, req.params.date)
              //   let breakHrs = await getBreakHours(k, req.params.date)
              //   let productivity = k.totalWorkHrs - (idleHrs + breakHrs)

              //   Object.assign(k, { productivity: productivity })
              //   resp.push(k)

              //   if (result.length == resp.length + 1) {
              //     setTimeout(() => {
              //       res.json(resp)
              //     }, 100);
              //   }
              // })
            }
          } catch (error) {

          }

        })

      }
    })

}

module.exports.getTeamEmployee = async function (req, res) {
  Employee.aggregate([
    {
      $match: {
        reporting_manager_id: req.params.emp_id,
        organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id),
        status: 'true'
      },
    },
  ]).exec(async function (err, employee) {
    if (err) {

      res.status(500).json(err);
    } else {

      let empIdArray = [];
      employee.forEach((item) => {
        empIdArray.push(item.EmpCognitoID);
      });
      try {
        let teamemployeelist = await ClockInOut.aggregate([
          {
            $lookup: {
              from: "employees",
              localField: "employeeId",
              foreignField: "EmpCognitoID",
              as: "employeedata"
            }
          },
          {
            $match: { employeeId: { $in: empIdArray } }
          },
          {
            $group: { _id: "$employeeId", employeedata: { $addToSet: "$employeedata" }, employeelstname: { $first: "$employeedata.l_name" }, name: { $first: "$employeedata.name" } }
          }

        ])

        if (teamemployeelist.err) {

        }
        else {

          res.json(teamemployeelist)
        }
      } catch (error) {

      }

    }
  })
}

// Get total employees CHECK_IN_TYPE{MOBILE|WEB|BOTH} on a particular date
module.exports.getTotalCheckInByDate = function (req, res) {
  Employee.find({ organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id) })
    .exec(async function (err, employee) {
      if (err) {
        res.status(500).json(err);
      } else {
        let tree = [];
        let directIndirectTree = [];

        function getChildsTree(childs) {
          childs.forEach(childNode => {
            getChilds(childNode.EmpCognitoID);
          })
        }
        function getChilds(id) {
          let childs = employee.filter(ele => { if (ele.reporting_manager_id == id) { return ele; } })
          if (childs.length > 0) {

            tree.push({
              EmpCognitoID: id,
              childs: childs
            })
            childs.forEach(ele => {
              directIndirectTree.push(ele.EmpCognitoID)
            })
            // getChildsTree(childs)
          }
        }
        getChilds(req.params.emp_id);

        ClockInOut
          .aggregate([
            {
              $match: {
                employeeId: { $in: directIndirectTree },
                clockInOutDate: req.params.searchDate,
              }
            },
            {
              $lookup: {
                from: "employees",
                localField: "employeeId",
                foreignField: "EmpCognitoID",
                as: "employeedata"
              }
            },
            {
              $group: {
                _id: "$employeeId", clockIn: { $first: "$clockIn" }, deviceType: { $last: "$deviceType" }, clockOut: { $last: "$clockOut" },
                profile_pic: { $addToSet: "$employeedata.profile_pic" },
                name: { $addToSet: "$employeedata.name" }

                , lastname: { $addToSet: "$employeedata.l_name" }
              }
            }
          ])
          .exec(function (err, doc) {
            if (err) {

              res
                .status(500)
                .json(err)
            }
            else {
              // 
              // var count = 0;
              // if (doc.length > 0) {
              //     count = doc.length
              // }

              res.status(200)
                .json(
                  doc
                )
            }
          })
      }
    })
}
module.exports.getTeamWorkingHours = async function (req, res) {

  var todate = req.body.todate;
  var fromdate = req.body.fromdate


  Employee.aggregate([
    { $match: { reporting_manager_id: req.body.emp_id, organisation_id: new mongoose.Types.ObjectId(req.body.organisation_id) } },
  ]).exec(async function (err, employee) {
    if (err) {

      res.status(500).json(err);
    } else {

      let empIdArray = [];
      employee.forEach((item) => {
        empIdArray.push(item.EmpCognitoID)
      })
      try {
        let workingHrs = await ClockInOut.aggregate([
          {
            $match: { employeeId: { $in: empIdArray } }
          },
          {
            $match: {
              createdAt: {
                $gte: new Date(fromdate),
                $lte: new Date(todate)
              }
            }
          }
          ,
          {
            $group: { _id: "$organisation_id", totalQuantity: { $sum: "$totalHours" } }
          }
        ])

        if (workingHrs.err) {

        }
        else {

          res.json(workingHrs)
        }
      } catch (error) {

      }

    }

  })
}
// this api create for get average present employee for a time period for a team 


module.exports.getAvgPrsntEmpByDate = function (req, res) {
  Employee.aggregate([
    { $match: { reporting_manager_id: req.params.emp_id, organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id) } },
  ]).exec(async function (err, employee) {
    if (err) {

      res.status(500).json(err);
    } else {

      let empIdArray = [];
      employee.forEach((item) => {
        empIdArray.push(item.EmpCognitoID)
      })
      ClockInOut
        .aggregate([
          { $match: { employeeId: { $in: empIdArray } } },
          {
            $match: {
              createdAt: {
                $gte: new Date(req.params.fromdate),
                $lte: new Date(req.params.todate)
              }
            }
          },

          {

            $lookup: {
              from: "employees",
              localField: "employeeId",
              foreignField: "EmpCognitoID",
              as: "employeedata"
            }
          },

          {
            $group: {
              _id: { employeeId: "$employeeId", clockInOutDate: "$clockInOutDate" },
              name: { $addToSet: "$employeedata.name" }
            }
          }
        ])
        .exec(function (err, empList) {


          if (err) {

          }
          else {
            let diffInDays
            if (formatDate(req.params.todate) == formatDate(req.params.fromdate)) {
              diffInDays = 1
            }
            else {
              const diffInMs = new Date(req.params.todate) - new Date(req.params.fromdate)
              diffInDays = diffInMs / (1000 * 60 * 60 * 24);
              if (!diffInDays.isNumber) {
                diffInDays = parseInt(diffInDays) + 1
              }
            }

            var Avg = empList.length / diffInDays;
            res.json(Avg)
          }
        })

    }
  })

}
// Get total employees on leave
module.exports.getTotalEmployeeOnLeave = function (req, res) {

  Leave
    .aggregate(
      [
        {
          $match: {
            organisation_id: req.params.organisation_id,
            // status: 'approved',
            $expr: {
              $lte: [req.params.searchDate, "$toDate"]
            }
          }
        }
      ]
    )
    .exec(function (err, doc) {

      try {
        if (err) {

          res
            .status(500)
            .json(err)
        }
        else {

          let empIdArray = [];
          doc.forEach((item) => {
            if (req.params.searchDate >= item.fromDate) {
              empIdArray.push(item.employeeId)
            }
          })


          Employee.find({ EmpCognitoID: { $in: empIdArray }, reporting_manager_id: req.params.emp_id, organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id) }, {}, function (err, empFinalList) {
            if (err) {

              res.status(500).json(err)
            }
            else {

              res.status(200).json(
                {
                  searchDate: req.params.searchDate,
                  count: empFinalList.length,
                  list: empFinalList
                }
              )
            }
          })
        }
      } catch (error) {

      }

    })
}

// Get TOTAL employees Late CHECK_IN on particular date
module.exports.getTotalEmployeeLateCheckIn = function (req, res) {

  let lateTime = new Date(req.params.searchDate).setHours(09, 30)

  Employee.find({ organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id) })
    .exec(async function (err, employee) {

      try {
        if (err) {
          res.status(500).json(err);
        } else {
          let tree = [];
          let directIndirectTree = [];

          function getChildsTree(childs) {
            childs.forEach(childNode => {
              getChilds(childNode.EmpCognitoID);
            })
          }
          function getChilds(id) {
            let childs = employee.filter(ele => { if (ele.reporting_manager_id == id) { return ele; } })
            if (childs.length > 0) {

              tree.push({
                EmpCognitoID: id,
                childs: childs
              })
              childs.forEach(ele => {
                directIndirectTree.push(ele.EmpCognitoID)
              })
              // getChildsTree(childs)
            }
          }
          getChilds(req.params.emp_id);

          ClockInOut
            .aggregate([
              {
                $lookup: {
                  from: "employees",
                  localField: "employeeId",
                  foreignField: "EmpCognitoID",
                  as: "employeedata"
                }
              },
              { $match: { employeeId: { $in: directIndirectTree } } },
              { $match: { clockInOutDate: req.params.searchDate } },
              {
                $group: {
                  _id: "$employeeId", clockIn: { $first: "$clockIn" }, clockOut: { $last: "$clockOut" },
                  profile_pic: { $addToSet: "$employeedata.profile_pic" },
                  name: { $addToSet: "$employeedata.name" }, lastname: { $addToSet: "$employeedata.l_name" }
                }
              }

            ])
            .exec(function (err, empList) {
              let employeelist = []
              empList.map((d) => {


                let clockIn = new Date(d.clockIn).getTime()
                if (new Date(clockIn) > new Date(lateTime)) {

                  employeelist.push(d)
                }
              })

              var count = 0;
              if (employeelist.length > 0) {
                count = employeelist.length
              }

              res.json({

                lateCheckIn: count,
                employeesList: employeelist
              })
            })
        }
      } catch (error) {

      }

    })
}


module.exports.insertRegularisation = async function (req, res) {

  let totalHours = new Date(req.body.clockOut) - new Date(req.body.clockIn)
  try {
    ClockInOut
      .create({

        employeeId: req.body.employeeId,
        clockIn: moment.tz(new Date(req.body.clockIn), "Asia/Kolkata"),
        clockInOutDate: formatDate(req.body.date),
        clockInLocation: req.body.clockInLatLang == undefined ? '' : await clockInAddress(),
        clockInImg: req.body.clockInImg,
        clockInServerTime: req.body.clockInServerTime,
        clockInLatLang: req.body.clockInLatLang,
        clockOut: moment.tz(new Date(req.body.clockOut), "Asia/Kolkata"),
        clockOutLocation: req.body.clockOutLocation,
        clockOutImg: req.body.clockOutImg,
        clockOutServerTime: req.body.clockOutServerTime,
        totalHours: totalHours,
        systemId: req.body.systemId,
        organisation_id: req.body.organisation_id,
        deviceType: req.body.deviceType,
        Buid: req.body.Buid
      }, function (err, clockinout) {
        if (err) {

          res
            .status(400)
            .json(err);
        } else {

          res.json(clockinout);
        }
      })
  } catch (error) {

  }

}

//this api used for get employee Attendance log bye date created by rushikesh on 13-10-2023
module.exports.getEmpAttendanceLogByDate = function (req, res) {
  var employeeId = req.params.emp_id;
  var clockInDate = req.params.date;

  const Duration = (difference) => {
    let secondsInMiliseconds = 1000,
      minutesInMiliseconds = 60 * secondsInMiliseconds,
      hoursInMiliseconds = 60 * minutesInMiliseconds;

    var differenceInHours = difference / hoursInMiliseconds,
      differenceInMinutes = differenceInHours % 1 * 60,
      differenceInSeconds = differenceInMinutes % 1 * 60;
    return {
      "hours": Math.floor(differenceInHours),
      "minutes": Math.floor(differenceInMinutes),
      "seconds": Math.floor(differenceInSeconds)
    }
  }

  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  ClockInOut.find({ employeeId: employeeId, clockInOutDate: clockInDate })

    .exec(function (err, clockinout) {
      try {
        if (err) {

          res.status(500).json(err);
        }
        else {
          let att = []
          clockinout.map((d) => {
            console.log('test value', d);
            let clockIn = new Date(d.clockIn).toLocaleTimeString([], { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
            let clockOut = d.clockOut == 'null' ? '' : new Date(d.clockOut).toLocaleTimeString([], { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
            let clockInOutDate = formatDdyymm(d.clockInOutDate)
            let Hour = pad(Duration(d.totalHours).hours, 2)
            let Minute = pad(Duration(d.totalHours).minutes, 2)
            let Second = pad(Duration(d.totalHours).seconds, 2)

            if (isNaN(Hour)) Hour = ''
            if (isNaN(Minute)) Minute = ''
            if (isNaN(Second)) Second = ''
            console.log('secondssss', Hour)
            let totalHour = Hour + ':' + Minute + ':' + Second
            att.push({ clockIn: clockIn, clockOut: clockOut, clockInOutDate: clockInOutDate, totalHours: totalHour })

          })
          setTimeout(() => {
            res.json(att)
          }, 300);

        }
      } catch (error) {

      }

    });
};


//this api used for get employee last Attendance id by date used in desktop application created by Jasvant  on 14-10-2023
module.exports.getAttendanceStatus = async function (req, res) {

  var employeeId = req.params.empId
  let currentDate = new Date();
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  md = formatDate(currentDate);
  try {
    let clockInOut = await ClockInOut.find({ employeeId: employeeId })
      .sort({ updatedAt: -1 })
      .limit(1)
    if (clockInOut.err) {

    }
    else {
      let attstatus = []
      let punchDetail = clockInOut
      let punchInTime
      let punchOutTime
      let punchDate
      let attendanceId

      if (clockInOut.length > 0) {

        punchInTime = punchDetail[punchDetail.length - 1].clockIn
        punchOutTime = punchDetail[punchDetail.length - 1].clockOut
        punchDate = punchDetail[punchDetail.length - 1].clockInOutDate
        attendanceId = punchDetail[punchDetail.length - 1]._id
        attstatus.push({ punchInTime, punchOutTime, punchDate, attendanceId })
        res.json(attstatus);
      }
      else { res.json(); }

    }
  } catch (error) {

  }

};