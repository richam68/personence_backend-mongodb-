const teamStatus = require('../../models/attendance/clockInOut.model')
const Holiday = require('../../models/holidays/holidays.model');
const Leave = require('../../models/leave/empLeaveRequest.model');
const Employee = require('../../models/employee/employee.model');
const mongoose = require('mongoose')
const BreakHour = require('../../models/attendance/breakHour.model')
const EmployeeActivity = require('../../models/employeeActivity/empActivity.model');

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

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

  }

}

module.exports.getTotalPresentEmpByDate = function (req, res) {

  teamStatus
    .aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "employeeId",
          foreignField: "EmpCognitoID",
          as: "employeedata"
        }
      },

      { $match: { clockInOutDate: req.params.clockInOutDate, organisation_id: req.params.organisation_id } },

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
        let count = []
        let emp = []
        employeeList.forEach((e) => {
          if (e.client_id == req.params.Buid) {
            emp.push(e)
          }
          count.push(e)

          if (employeeList.length <= 1) {
            res.json({ count: emp.length, empList: emp })
          }

          if (employeeList.length == count.length + 1) {
            setTimeout(() => {
              res.json({ count: emp.length, empList: emp })
            }, 300);
          }
        })

      }
    })

}




module.exports.getTeamEmployeeDate = async function (req, res) {
  try {
    let employeeList = await teamStatus.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "employeeId",
          foreignField: "EmpCognitoID",
          as: "employeedata"
        }
      },
      {
        $match: { organisation_id: req.params.organisation_id, clockInOutDate: req.params.date }
      },

      {
        $group: { _id: "$employeeId", clockIn: { $first: "$clockIn" }, clockOut: { $last: "$clockOut" }, location: { $addToSet: "$clockInLatLang" }, totalWorkHrs: { $sum: "$totalHours" }, employeedata: { $addToSet: "$employeedata" }, EmpCognitoID: { $addToSet: "$employeeId" }, employeelstname: { $first: "$employeedata.l_name" }, name: { $first: "$employeedata.name" }, client_id: { $addToSet: "$employeedata.client_id" }, clockInAddress: { $addToSet: "$clockInLocation" }, clockOutAddress: { $addToSet: "$clockOutLocation" }, date: { $addToSet: "$clockInOutDate" } }
      }



    ])

    let count = []
    let emp = []
    employeeList.forEach((e) => {
      if (e.client_id == req.params.Buid) {
        emp.push(e)
      }
      count.push(e)

      if (employeeList.length <= 1) {
        res.json(emp)
      }

      if (employeeList.length == count.length + 1) {
        setTimeout(() => {
          res.json(emp)
        }, 100);
      }
    })

    // employeeList.forEach((e) => {
    //   if (e.client_id == req.params.Buid) {
    //     emp.push(e)
    //   }
    //   count.push(e)
    //   if (employeeList.length == count.length + 1) {
    //     setTimeout(() => {
    //       let resp = []
    //       emp.map(async (k) => {
    //         let idleHrs = await getEmpActivity(k, req.params.date)
    //         let breakHrs = await getBreakHours(k, req.params.date)
    //         let productivity = k.totalWorkHrs - (idleHrs + breakHrs)

    //         Object.assign(k, { productivity: productivity })
    //         resp.push(k)

    //         if (emp.length == resp.length + 1) {
    //           setTimeout(() => {
    //             res.json(resp)
    //           }, 100);
    //         }
    //       })

    //     }, 100);
    //   }
    // })
  } catch (error) {

  }

}


module.exports.getTeamEmployee = async function (req, res) {

  let employeeList = await teamStatus.aggregate([
    {
      $lookup: {
        from: "employees",
        localField: "employeeId",
        foreignField: "EmpCognitoID",
        as: "employeedata"
      }
    },
    {
      $match: { organisation_id: req.params.organisation_id }
    },
    {
      $group: { _id: "$employeeId", employeedata: { $addToSet: "$employeedata" }, EmpCognitoID: { $addToSet: "$employeeId" }, employeelstname: { $first: "$employeedata.l_name" }, name: { $first: "$employeedata.name" }, empStatus: { $addToSet: "$employeedata.status" }, client_id: { $addToSet: "$employeedata.client_id" } }
    }

  ])

  if (employeeList.err) {

  }
  else {
    let count = []
    let emp = []
    employeeList.forEach((e) => {
      if (e.client_id == req.params.Buid && e.empStatus == 'true') {
        emp.push(e)
      }
      count.push(e)

      if (employeeList.length <= 1) {
        res.json(emp)
      }

      if (employeeList.length == count.length + 1) {
        setTimeout(() => {
          res.json(emp)
        }, 300);
      }
    })
  }
}

// Get total employees CHECK_IN_TYPE{MOBILE|WEB|BOTH} on a particular date
module.exports.getTotalCheckInByDate = function (req, res) {

  teamStatus
    .aggregate([
      {
        $match: {
          clockInOutDate: req.params.searchDate,
          organisation_id: req.params.organisation_id
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
          name: { $addToSet: "$employeedata.name" }, lastname: { $addToSet: "$employeedata.l_name" }, client_id: { $addToSet: "$employeedata.client_id" }
        }
      }
    ])
    .exec(function (err, employeeList) {
      if (err) {

        res
          .status(500)
          .json(err)
      }
      else {
        let count = []
        let emp = []
        employeeList.forEach((e) => {
          if (e.client_id == req.params.Buid) {
            emp.push(e)
          }
          count.push(e)

          if (employeeList.length <= 1) {
            res.json(emp)
          }

          if (employeeList.length == count.length + 1) {
            setTimeout(() => {
              res.json(emp)
            }, 300);
          }
        })
      }
    })
}

module.exports.getTeamWorkingHours = async function (req, res) {

  var fromdate = new Date(req.body.fromdate).setHours(00,00)
  var todate = new Date(req.body.todate).setHours(23,59)

  Employee.aggregate([
    { $match: { client_id: new mongoose.Types.ObjectId(req.body.bu) } },
  ]).exec(async function (err, employee) {
    let count = []
    let teamWorkingHrs = []

    employee.map(async (d) => {
      count.push(d._id)
      teamStatus.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(fromdate),
              $lte: new Date(todate)
            }
          }
        },
        {
          $match: { employeeId: d.EmpCognitoID }
        },
        {
          $group: { _id: "employeeId", totalHours: { $sum: "$totalHours" } }
        }
      ])
        .exec((err, d) => {
          teamWorkingHrs.push(d == '' ? 0 : d[0].totalHours)
          if (employee.length <= 1) {
            function sumReducer(accumulator, currentValue) {
              return accumulator + currentValue;
            }
            let teamWork = teamWorkingHrs.reduce(sumReducer)
            res.json([{ totalQuantity: teamWork }])
          }
          if (employee.length == teamWorkingHrs.length + 1) {
            setTimeout(() => {
              function sumReducer(accumulator, currentValue) {
                return accumulator + currentValue;
              }
              let teamWork = teamWorkingHrs.reduce(sumReducer)
              res.json([{ totalQuantity: teamWork }])
            }, 100);
          }
        })

    })
  })


}


// this api create for get average present employee for a time period for a team 

module.exports.getAvgPrsntEmpByDate = function (req, res) {
let fromDate=new Date(req.params.fromdate).setHours(00,00)
let toDate=new Date(req.params.todate).setHours(23,59)
  teamStatus
    .aggregate([
      { $match: { organisation_id: req.params.organisation_id } },
      {
        $match: {
          createdAt: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate)
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
          name: { $addToSet: "$employeedata.name" }, client_id: { $addToSet: "$employeedata.client_id" }
        }
      }
    ])
    .exec(function (err, employeeList) {

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

        let count = []
        let emp = []
        employeeList.forEach((e) => {
          if (e.client_id == req.params.Buid) {
            emp.push(e)
          }
          count.push(e)

          if (employeeList.length <= 1) {
            let Avg = emp.length / diffInDays
            res.json(Avg)
          }

          if (employeeList.length == count.length + 1) {
            setTimeout(() => {
              let Avg = emp.length / diffInDays
              res.json(Avg)
            }, 300);
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
            status: 'approved',
            $expr: {
              $lte: [req.params.searchDate, "$toDate"]
            }
          }
        }
      ]
    )
    .exec(function (err, doc) {
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

        Employee.find({ EmpCognitoID: { $in: empIdArray }, organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id), client_id: new mongoose.Types.ObjectId(req.params.Buid) }, {}, function (err, empFinalList) {
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
    })
}

// Get TOTAL employees Late CHECK_IN on particular date
module.exports.getTotalEmployeeLateCheckIn = function (req, res) {
  // 
  let lateTime = new Date(req.params.searchDate).setHours(09, 30)

  let searchDate = formatDate(req.params.searchDate)

  teamStatus
    .aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "employeeId",
          foreignField: "EmpCognitoID",
          as: "employeedata"
        }
      },
      { $match: { organisation_id: req.params.organisation_id, clockInOutDate: searchDate } },
      {
        $group: {
          _id: "$employeeId", clockIn: { $first: "$clockIn" }, clockOut: { $last: "$clockOut" },
          profile_pic: { $addToSet: "$employeedata.profile_pic" },
          name: { $addToSet: "$employeedata.name" }, lastname: { $addToSet: "$employeedata.l_name" }, client_id: { $addToSet: "$employeedata.client_id" }
        }
      }

    ])
    .exec(function (err, empList) {
      let employeelist = []
      empList.map((d) => {

        let clockIn = new Date(d.clockIn)

        if (new Date(clockIn) > new Date(lateTime)) {

          employeelist.push(d)
        }

      })

      let count = []
      let emp = []
      employeelist.forEach((e) => {
        if (e.client_id == req.params.Buid) {
          emp.push(e)
        }
        count.push(e)

        if (employeelist.length <= 1) {
          res.json({ lateCheckIn: emp.length, employeesList: emp })
        }

        if (employeelist.length == count.length + 1) {
          setTimeout(() => {
            res.json({ lateCheckIn: emp.length, employeesList: emp })
          }, 300);
        }
      })

    })
}

module.exports.getTeamBreakHrs = async function (req, res) {

  var fromdate = new Date(req.params.fromdate).setHours(00,00)
  var todate = new Date(req.params.todate).setHours(23,59)
  try {
    let teamBreakHrs = await BreakHour.aggregate([
      {
        $match: { Buid: req.params.Buid, organisation_id: req.params.organisation_id }
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
        $group: { _id: "$organisation_id", totalBreakHour: { $sum: "$totalBreakHours" } }
      }
    ])

    if (teamBreakHrs.err) {


    }
    else {

      res.json(teamBreakHrs)
    }
  } catch (error) {

  }

};



module.exports.getAllEmployeeByreportingManager = function (req, res) {
  Employee.aggregate([
    { $match: { organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id), client_id: new mongoose.Types.ObjectId(req.params.Buid), status: "true" } },
  ]).exec(function (err, employee) {
    if (err) {

      res.status(500).json(err);
    } else {


      res.json(employee);

    }
  })
}


module.exports.getEmpByRptManagerId = async function (req, res) {
  try {
    var employee = await Employee.find({ organisation_id: req.params.organisation_id })
    res.json(employee)
  } catch (error) {

  }

}

