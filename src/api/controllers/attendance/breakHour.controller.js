const BreakHour = require('../../models/attendance/breakHour.model')
var mongoose = require('mongoose')
const Employee = require('../../models/employee/employee.model')

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
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


async function getEmployeeData(data) {
  try {
    let employeeData = await Employee.aggregate([
      {
        $match: { EmpCognitoID: data }
      },

    ])
    return employeeData
  } catch (error) {

  }

}

module.exports.getBreakHourByEmployee = async function (req, res) {
  var employeeId = req.params.emp_Id;
  try {
    let breakHour = await BreakHour.find({ employeeId: employeeId })
    res.json(breakHour)
  } catch (error) {

  }

};

module.exports.insertBreakHour = async function (req, res) {

  let Buid = await getEmployeeData(req.body.employeeId)

  BreakHour
    .create({
      employeeId: req.body.employeeId,
      date: req.body.date,
      organisation_id: req.body.organisation_id,
      startTime: new Date(),
      endTime: 'null',
      organisation_id: req.body.organisation_id,
      Buid: Buid[0].client_id
    }, function (err, breakHour) {
      if (err) {

        res
          .status(400)
          .json(err);
      } else {

        let id = breakHour._id

        let auto = new Date().setHours(23, 00)

        let timeOut = new Date(auto) - new Date()

        setTimeout(() => {
          BreakHour
            .findById(id)
            .exec(function (err, res) {
              if (res.endTime == 'null') {
                BreakHour
                  .findById(id)
                  .exec(function (err, doc) {
                    if (err) {
                      res
                        .status(err)
                        .json(err);
                    } else {
                      doc.endTime = new Date()
                      doc.totalBreakHours = new Date() - new Date(doc.startTime)
                      doc.save()
                    }
                  })
              }
              else {

              }
            })
        }, timeOut)

        res
          .status(201)
          .json(breakHour);
      }
    });

};
module.exports.updateBreakHour = function (req, res) {
  let totalbreak = new Date() - new Date(req.body.startTime)
  BreakHour
    .findById(req.body.id)
    .select(" ")
    .exec(function (err, doc) {

      doc.employeeId = req.body.employeeId,
        doc.totalBreakHours = totalbreak,
        doc.endTime = new Date(),
        doc.save(function (err, breakHourUpdated) {
          if (err) {

          }
          else {

            res.json(breakHourUpdated)
          }
        });
    }
    );

}

module.exports.getBreakHrs = async function (req, res) {
  var employeeId = req.params.emp_Id;
  var date = req.params.date;
  try {
    let breakHour = await BreakHour.aggregate([
      {
        $match: { date: date, employeeId: employeeId }
      },
      {
        $group: { _id: "$date", totalQuantity: { $sum: "$totalBreakHours" } }
      }
    ])
    res.json(breakHour)
  } catch (error) {

  }

};

module.exports.getBreakHrsbyPeriod = async function (req, res) {
  var employeeId = req.body.employeeId;

  var fromdate = new Date(req.body.fromdate).setHours(00,00)
  let todate = new Date(req.body.todate).setHours(23,59)
 
  try {
    let breakHour = await BreakHour.aggregate([
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
      }
      ,
      {
        $group: { _id: "$employeeId", totalBreakHour: { $sum: "$totalBreakHours" } }
      }
    ])
    res.json(breakHour)
  } catch (error) {

  }
  
};

module.exports.getTeamBreakHrs = async function (req, res) {
  var todate = new Date(req.params.todate).setHours(00,00)
  var fromdate = new Date(req.params.fromdate).setHours(23,59)

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
      try {
        let teamBreakHrs = await BreakHour.aggregate([
          {
            $match: { employeeId: { "$in": empIdArray } }
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
  })
}


// this Api Used for Get EmpBreakDetailsByDate created by Jasvant  on 13-01-2023

module.exports.getEmpBreakDetailsByDate = function (req, res) {
  var employeeId = req.params.emp_id;
  var breakDate = req.params.date;

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

  BreakHour.find({ employeeId: employeeId, date: breakDate })

    .exec(function (err, breakdetails) {
      if (err) {

        res.status(500).json(err);
      }
      else {
        let brk = []
        breakdetails.map((d) => {
          console.log('test value', d);
          let startTime = new Date(d.startTime).toLocaleTimeString([], { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
          let endTime = d.endTime == 'null' ? '' : new Date(d.endTime).toLocaleTimeString([], { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
          let date = formatDdyymm(d.date)
          let Hour = pad(Duration(d.totalBreakHours).hours, 2)
          let Minute = pad(Duration(d.totalBreakHours).minutes, 2)
          let Second = pad(Duration(d.totalBreakHours).seconds, 2)

          if (isNaN(Hour)) Hour = ''
          if (isNaN(Minute)) Minute = ''
          if (isNaN(Second)) Second = ''
          let totalHour = Hour + ':' + Minute + ':' + Second
          brk.push({ date: date, startTime: startTime, endTime: endTime, totalBreakHours: totalHour })

        })
        setTimeout(() => {
          res.json(brk)
        }, 300);

      }
    });
};
