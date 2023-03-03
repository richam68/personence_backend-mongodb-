//ATTENDENCE REGISTER REPORT API
const Employee = require("../../models/employee/employee.model");
var Promise = require("promise");
const mongoose = require("mongoose");
const ClockInOut = require('../../models/attendance/clockInOut.model');
const Holiday = require('../../models/holidays/holidays.model');
const Leave = require('../../models/leave/empLeaveRequest.model');
const moment = require("moment-timezone");

module.exports.getAttendenceRegisterReportSummary = async function (req, res) {
  console.log("getAttendenceRegisterReportSummary === ", req.params);
  var holidayCount = 0, leaveDaysCount = 0;
  let FINALOUTPUT = [];
  Holiday.find({
    date: {
      $gte: req.params.fromDate,
      $lt: req.params.toDate,
    },
    client_id: req.params.client_id
  })
    .exec(function (err, holiday) {
      if (err) {
        console.log("Err while Finding Holiday:", err)
      }
      else {
        holidayCount = holiday.length
        console.log('holiday value', holiday, holidayCount.length)
      }
    })
  Employee.find({ client_id: req.params.client_id })
    .exec(async function (err, doc1) {
      if (err) {
        console.log("GEt All Emp of BU err :", err)
      }
      else {
        let BUEmpIds = [];
        doc1.forEach((item) => {
          BUEmpIds.push(item.EmpCognitoID);
        });

        var dayMilliseconds = 1000 * 60 * 60 * 24;
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
        console.log(" WeekDays & TotalDays ==  ", weekendDays, totalDays)
        // console.log("getTimePeriodAttendenceSummary doc :", doc)

        let present1 = [];
        let overTime = [];
        BUEmpIds.map(async (empId, i) => {

          let presentDaysOfEmployee = await ClockInOut
            .find({
              clockInOutDate: {
                $gte: req.params.fromDate,
                $lt: req.params.toDate,
              },
              // organisation_id: req.params.organisation_id,
              employeeId: empId
            })
          // console.log("FINAL++++", present1);
          try {
            await ClockInOut
              .aggregate([
                { $match: { employeeId: empId } },
                { $match: { clockInOutDate: { $gte: req.params.fromDate, $lte: req.params.toDate } } },
                { $group: { _id: '$clockInOutDate' } },

              ])
              .exec((err, result) => {
                if (err) {
                  console.log(" ClockInOut Err ")
                } else {
                  present1.push({ dates: result, count: result.length, empId: empId })
                  console.log("Hema:", result.length, present1, i, empId)
                  Leave.find({
                    fromDate: {
                      $gte: req.params.fromDate,
                      $lte: req.params.toDate,
                    },
                    status: 'approved',
                    // emp_id: { $in: BUEmpIds }
                    emp_id: empId
                  })
                    .exec(function (err, leave) {
                      if (err) {
                        console.log("getTimePeriodAttendenceSummary err :", err)
                      }
                      else {
                        console.log('leaves result', leave)
                        if (leave.length > 0) {
                          leave.map((data, i) => {
                            console.log("wwwww====", data)
                            var d1 = new Date(data.toDate);
                            var d2 = new Date(data.fromDate);
                            var d3 = new Date(req.params.toDate);
                            if (d1 > d3) {
                              console.log("d1   and d3====", d1, d3, d3.getTime(), d2.getTime())
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
                              console.log("else d1   and d3====", d1, d3)
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
                        console.log("PRESENT ", present1, present1.length)
                        workingDays = (present1.find(ele => ele.empId == empId)).count;
                        // if (present1.length > 0) {
                        //   if (present1 && present1[i-1].count > 0 ) {
                        //     console.log("pdata", present1[i-1].empId[0], empId)
                        //     workingDays = present1[i-1].count
                        //   }
                        // } else { workingDays = 0; }
                        console.log("Employeee===name and id::", doc1[i].name, doc1[i].emp_id, doc1[i].EmpCognitoID, empId, workingDays,)
                        FINALOUTPUT.push({
                          name: doc1[i].name,
                          empId: doc1[i].emp_id,
                          presentDaysCount: workingDays,
                          workingDays: totalDays - holidayCount - weekendDays,
                          totalDays: totalDays,
                          weeklyOff: weekendDays,
                          holidayCount: holidayCount,
                          leave: leaveDaysCount,
                          absentWithoutPay: (totalDays - holidayCount - weekendDays) - (workingDays + leaveDaysCount)
                        })
                        if (FINALOUTPUT.length == BUEmpIds.length) {
                          console.log("FINALOUTPUT.length==BUEmpIds.length", FINALOUTPUT.length, BUEmpIds.length, FINALOUTPUT)
                          res.json(FINALOUTPUT);
                        }
                      }
                    })

                  console.log("ClockInOut result", result)
                }
              })
            console.log("FINALOUTPUT.length==BUEmpIds.length", FINALOUTPUT.length, BUEmpIds.length)
            if (FINALOUTPUT.length == BUEmpIds.length) {

              console.log("FINAL=======", FINALOUTPUT)
            }
          }
          catch (err) {
            console.log("err", err)
          }
        })
      }
    })
}
//detailed attendence report
module.exports.getTimePeriodAttendenceRegisterReport = async function (req, res) {
  console.log("getDayWiseReportSummary === ", req.params);
  let holidayCount = 0, leaveDaysCount = 0;;
  let holidayDates = [];

  // Holiday need date in yyyy-mm-dd format
  Holiday.find({
    date: {
      $gte: req.params.fromDate,
      $lt: req.params.toDate,
    },
    client_id: req.params.client_id
  })
    .exec(function (err, holiday) {
      if (err) {
        console.log("Err while Finding Holiday:", err)
      }
      else {
        holidayCount = holiday.length;
        holiday.forEach((item) => {
          holidayDates.push(item.date);
        });
        console.log('holiday value', holiday, holidayCount, holidayDates)
      }
    })

  //Get All Employees of BU
  Employee.find({ client_id: req.params.client_id })
    .exec(async function (err, doc) {
      if (err) {
        console.log("GEt All Emp of BU err :", err)
        return 0;
      }
      else {
        let BUEmpIds = [], FINALOUTPUT = [];;
        doc.forEach((item) => {
          BUEmpIds.push(item.EmpCognitoID);
        });
        console.log(BUEmpIds);



        let empPerMonthList = [], empPerMonthAttendenceList = [];
        var dayMilliseconds = 1000 * 60 * 60 * 24;
        let start = new Date(req.params.fromDate),
          finish = new Date(req.params.toDate);
        let tempDate = moment(start).format('YYYY-MM-DD');
        let i;
        var dayMilliseconds = 1000 * 60 * 60 * 24;
        var weekendDays = 0;
        var totalDays = 0;
        var workingDays = 0;
        let weekendDatesArray = [];
        for (; start <= finish; start = new Date(+start + dayMilliseconds)) {
          totalDays++;
          var day = start.getDay()
          //For Sundays count
          if (day == 0) {
            //For saturday and sundays count
            // if (day == 0 || day == 6) {
            weekendDays++;
            weekendDatesArray.push(moment(start).format('YYYY-MM-DD'))
          }
        }
        console.log(" WeekDays & TotalDays ==  ", weekendDays, totalDays, weekendDatesArray)

        //---

        let present1 = [];
        BUEmpIds.map(async (empId, i) => {

          let presentDaysOfEmployee = await ClockInOut
            .find({
              clockInOutDate: {
                $gte: req.params.fromDate,
                $lt: req.params.toDate,
              },
              // organisation_id: req.params.organisation_id,
              employeeId: empId
            })
          // console.log("FINAL++++", present1);
          try {
            ClockInOut
              .aggregate([
                { $match: { employeeId: empId } },
                { $match: { clockInOutDate: { $gte: req.params.fromDate, $lte: req.params.toDate } } },
                { $group: { _id: '$clockInOutDate' } },

              ])
              .exec((err, result) => {
                if (err) {
                  console.log(" ClockInOut Err ")
                } else {
                  present1.push({ dates: result, count: result.length, empId: empId })
                  Leave.find({
                    fromDate: {
                      $gte: req.params.fromDate,
                      $lte: req.params.toDate,
                    },
                    status: 'approved',
                    emp_id: empId
                  })
                    .exec(async function (err, leave) {
                      if (err) {
                        console.log("getTimePeriodAttendenceSummary err :", err)
                      }
                      else {
                        console.log('leaves result', leave)
                        if (leave.length > 0) {
                          leave.map((data, i) => {
                            console.log("wwwww====", data)
                            var d1 = new Date(data.toDate);
                            var d2 = new Date(data.fromDate);
                            var d3 = new Date(req.params.toDate);
                            if (d1 > d3) {
                              console.log("d1   and d3====", d1, d3, d3.getTime(), d2.getTime())
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
                              console.log("else d1   and d3====", d1, d3)
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
                        console.log("PRESENT ", present1)

                        workingDays = (present1.find(ele => ele.empId == empId)).count;
                        // if (present1 && present1[i-1].count > 0) {

                        //   workingDays = present1[i-1].count
                        // } else {
                        //   workingDays = 0;
                        // }
                        console.log("Employeee===name and id::", doc[i].name, doc[i].emp_id)
                        FINALOUTPUT.push({
                          name: doc[i].name,
                          EmpCognitoID: empId,
                          empId: doc[i].emp_id,
                          presentDaysCount: workingDays,
                          workingDays: totalDays - holidayCount - weekendDays,
                          totalDays: totalDays,
                          weeklyOff: weekendDays,
                          holidayCount: holidayCount,
                          leave: leaveDaysCount,
                          absentWithoutPay: (totalDays - holidayCount - weekendDays) - (workingDays + leaveDaysCount)
                        })
                        if (FINALOUTPUT.length == BUEmpIds.length) {
                          console.log("FINALOUTPUT.length==BUEmpIds.length", FINALOUTPUT.length, BUEmpIds.length, FINALOUTPUT)
                          // console.log("FINALOUTPUT",FINALOUTPUT);

                          //----
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
                          start = new Date(req.params.fromDate);
                          finish = new Date(req.params.toDate);
                          let weekendflag = false;
                          let personDetails;
                          let currentEmpSummary;
                          let totalWkgHours;
                          let totalOvertimeHrsCal, tempTotalhrsCal;

                          let monthlyTotalWkgHrs = 0, monthlyTotalOvertimeHrs;
                          for (i = 0, tempEmpID = BUEmpIds[i]; i < BUEmpIds.length;
                            empPerMonthAttendenceList.push(
                              {
                                name: personDetails[0].name,
                                m_name: personDetails[0].m_name,
                                l_name: personDetails[0].l_name, emp_id: personDetails[0].emp_id,
                                monthlyAttendence: [...empPerMonthList],
                                currentEmpSummary: { ...currentEmpSummary },
                                monthlyTotalWkgHrs: Duration(monthlyTotalWkgHrs),
                                overTimeHours: Duration(monthlyTotalOvertimeHrs)
                              }), tempEmpID = BUEmpIds[++i], start = new Date(req.params.fromDate)) {
                            personDetails = await Employee.find({ EmpCognitoID: tempEmpID });
                            // console.log("personDetails:", personDetails)
                            currentEmpSummary = FINALOUTPUT.find(ele => ele.EmpCognitoID == tempEmpID)
                            console.log("currentEmpSummary", currentEmpSummary, tempEmpID)
                            empPerMonthList = [];
                            monthlyTotalWkgHrs = 0, monthlyTotalOvertimeHrs = 0;
                            while (start <= finish) {
                              // weekendflag = weekendDatesArray.find(start);
                              tempDate = moment(start).format('YYYY-MM-DD')
                              console.log("WHILE ", start, tempDate, tempEmpID, i, BUEmpIds.length)
                              try {
                                const oneDayData = await ClockInOut
                                  .aggregate([
                                    {
                                      $match: {
                                        employeeId: tempEmpID,
                                        clockInOutDate: tempDate
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
                                        _id: "$employeeId",
                                        clockIn: { $first: "$clockIn" },
                                        clockOut: { $last: "$clockOut" },
                                        name: { $addToSet: "$employeedata.name" },
                                        lastname: { $addToSet: "$employeedata.l_name" },
                                        empId: { $addToSet: "$emp_id" },
                                        totalHours: { $sum: "$totalHours" }
                                      }
                                    }
                                  ]);

                                tempTotalhrsCal = oneDayData.length > 0 ? oneDayData[0].totalHours > 32400000 ? oneDayData[0].totalHours - 32400000 : 0 : 0;
                                totalOvertimeHrsCal = tempTotalhrsCal > 0 ? Duration(tempTotalhrsCal) : { hours: '00', minutes: '00' };
                                totalWkgHours = oneDayData.length > 0 ? Duration(oneDayData[0].totalHours) : { hours: '00', minutes: '00' }
                                console.log("OP DATA", oneDayData, totalOvertimeHrsCal)
                                monthlyTotalWkgHrs = oneDayData.length > 0 ? monthlyTotalWkgHrs + oneDayData[0].totalHours : monthlyTotalWkgHrs + 0;
                                monthlyTotalOvertimeHrs = monthlyTotalOvertimeHrs + tempTotalhrsCal;
                                empPerMonthList.push(oneDayData.length > 0 ? {
                                  ...oneDayData[0],
                                  clockInTime: new Date(oneDayData[0].clockIn).toLocaleDateString([], { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).split(",")[1],
                                  clockOutTime: new Date(oneDayData[0].clockOut).toLocaleDateString([], { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).split(",")[1],
                                  "totalWkgHours": totalWkgHours.hours ? totalWkgHours.hours + ":" + totalWkgHours.minutes : "00" + ":" + totalWkgHours.minutes ? totalWkgHours.minutes : "00",
                                  "totalDutyHours": "32400000",
                                  "overTimeHours": totalOvertimeHrsCal.hours + ":" + totalOvertimeHrsCal.minutes,
                                  "date": tempDate,
                                } : { "date": tempDate })

                                start = new Date(+start + dayMilliseconds)
                              }
                              catch (err) {
                                console.log("Error in clockinout data==", err)
                                start = new Date(+start + dayMilliseconds)
                              }
                            }
                            console.log("IIIIIII======", i)
                          }
                          console.log("IIIIIIIoooo======", i)
                          if (i == BUEmpIds.length) {
                            res.status(200).json(empPerMonthAttendenceList)
                          }
                        }
                      }
                    })
                  console.log("ClockInOut result", result)
                }
              })
            // console.log("FINALOUTPUT.length==BUEmpIds.length", FINALOUTPUT.length, BUEmpIds.length)
            // if (FINALOUTPUT.length == BUEmpIds.length) {

            //   console.log("FINAL=======", FINALOUTPUT)
            // }
          }
          catch (err) {
            console.log("err", err)
          }
        })
        //---



      }

    });
}

module.exports.getDayWiseReportSummary = async function (req, res) {
  console.log("getDayWiseReportSummary === ", req.params);

  //Get All Employees of BU
  Employee.find({ client_id: req.params.client_id })
    .exec(async function (err, doc) {
      if (err) {
        console.log("GEt All Emp of BU err :", err)
        return 0;
      }
      else {
        let BUEmpIds = [];
        doc.forEach((item) => {
          BUEmpIds.push(item.EmpCognitoID);
        });
        console.log(BUEmpIds)
        let empPerMonthList = [], empPerMonthAttendenceList = [];
        var dayMilliseconds = 1000 * 60 * 60 * 24;
        let start = new Date(req.params.fromDate),
          finish = new Date(req.params.toDate);
        let tempDate = moment(start).format('YYYY-MM-DD');
        let i;
        var dayMilliseconds = 1000 * 60 * 60 * 24;
        var weekendDays = 0;
        var totalDays = 0;
        let weekendDatesArray = [];
        for (; start <= finish; start = new Date(+start + dayMilliseconds)) {
          totalDays++;
          var day = start.getDay()
          //For Sundays count
          if (day == 0) {
            //For saturday and sundays count
            // if (day == 0 || day == 6) {
            weekendDays++;
            weekendDatesArray.push(start)
          }
        }
        console.log(" WeekDays & TotalDays ==  ", weekendDays, totalDays, weekendDatesArray)

        // Holiday.find({
        //   date: {
        //     $gte: req.params.fromDate,
        //     $lt: req.params.toDate,
        //   },
        //   organisation_id: req.params.organisation_id
        // })
        //   .exec(function (err, holiday) {
        //     if (err) {
        //       console.log("get Holiday err :", err)
        //     }
        //     else {
        //       console.log('holiday value', holiday)
        //     }
        //   })
        // Leave.find({
        //     fromDate: {
        //       $gte: req.params.fromDate,
        //       $lte: req.params.toDate,
        //     },
        //     status: 'approved',
        //     emp_id: { $in: BUEmpIds }
        //   })
        //   .exec(function (err, leave) {
        //     if (err) {
        //       console.log("getLeaves err :", err)
        //     } else {
        //       console.log(`Leave of  is ${leave}`)
        //     }
        //   })
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
        start = new Date(req.params.fromDate);
        finish = new Date(req.params.toDate);
        let weekendflag = false;
        let personDetails;
        let totalWkgHours;
        let totalOvertimeHrsCal, tempTotalhrsCal;
        let monthlyTotalWkgHrs = 0, monthlyTotalOvertimeHrs;
        for (i = 0, tempEmpID = BUEmpIds[i]; i < BUEmpIds.length;
          empPerMonthAttendenceList.push({ name: personDetails[0].name, m_name: personDetails[0].m_name, l_name: personDetails[0].l_name, emp_id: personDetails[0].emp_id, monthlyTotalWkgHrs: Duration(monthlyTotalWkgHrs), monthlyTotalOvertimeHrs: Duration(monthlyTotalOvertimeHrs), monthlyAttendence: [...empPerMonthList] }), tempEmpID = BUEmpIds[++i], start = new Date(req.params.fromDate)) {
          personDetails = await Employee.find({ EmpCognitoID: tempEmpID });
          console.log("personDetails:", personDetails)
          empPerMonthList = [];
          monthlyTotalWkgHrs = 0, monthlyTotalOvertimeHrs = 0;
          while (start <= finish) {
            // weekendflag = weekendDatesArray.find(start);
            tempDate = moment(start).format('YYYY-MM-DD')
            console.log("WHILE ", start, tempDate, tempEmpID, i, BUEmpIds.length)
            try {
              const oneDayData = await ClockInOut
                .aggregate([
                  {
                    $match: {
                      employeeId: tempEmpID,
                      clockInOutDate: tempDate
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
                      _id: "$employeeId",
                      clockIn: { $first: "$clockIn" },
                      clockInLocation: { $first: "$clockInLocation" },
                      deviceType: { $last: "$deviceType" },
                      clockOut: { $last: "$clockOut" },
                      clockOutLocation: { $last: "$clockOutLocation" },
                      name: { $addToSet: "$employeedata.name" },
                      lastname: { $addToSet: "$employeedata.l_name" },
                      empId: { $addToSet: "$emp_id" },
                      totalHours: { $sum: "$totalHours" }
                    }
                  }
                ]);
              tempTotalhrsCal = oneDayData.length > 0 ? (oneDayData[0].totalHours > 32400000 ? oneDayData[0].totalHours - 32400000 : 0) : 0;
              totalOvertimeHrsCal = tempTotalhrsCal > 0 ? Duration(tempTotalhrsCal) : { hours: '00', minutes: '00' };
              totalWkgHours = oneDayData.length > 0 ? Duration(oneDayData[0].totalHours) : { hours: '00', minutes: '00' }
              console.log("OP DATA", oneDayData, totalOvertimeHrsCal)
              monthlyTotalWkgHrs = oneDayData.length > 0 ? monthlyTotalWkgHrs + oneDayData[0].totalHours : monthlyTotalWkgHrs + 0;
              monthlyTotalOvertimeHrs = monthlyTotalOvertimeHrs + tempTotalhrsCal;
              empPerMonthList.push(oneDayData.length > 0 ? {
                ...oneDayData[0],
                clockInTime: new Date(oneDayData[0].clockIn).toLocaleDateString([], { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).split(",")[1],
                clockOutTime: new Date(oneDayData[0].clockOut).toLocaleDateString([], { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).split(",")[1],
                totalWkgHours: totalWkgHours.hours ? totalWkgHours.hours + ":" + totalWkgHours.minutes : "00" + ":" + totalWkgHours.minutes ? totalWkgHours.minutes : "00",
                "totalDutyHours": "32400000",
                "overTimeHours": totalOvertimeHrsCal.hours + ":" + totalOvertimeHrsCal.minutes,
                "date": tempDate
              } : { "date": tempDate })

              start = new Date(+start + dayMilliseconds)
              // .exec(function (err, doc) {
              //   if (err) {
              //     res
              //       .status(500)
              //       .json(err)
              //   }
              //   else {
              //     // res
              //     //   .status(200)
              //     //   .json(doc)
              //     console.log("DDDD===", doc)
              //     empPerMonthList.push(doc.length > 0 ? { ...doc[0], "totalDutyHours": "32400000", "overTimeHours": doc[0].totalHours > 32400000 ? doc[0].totalHours - 32400000 : 0, "date": tempDate } : { "date": tempDate })
              //     console.log("PER===", empPerMonthList)
              //   }
              // })
            }
            catch (err) {
              console.log("Error in clockinout data==", err)
              start = new Date(+start + dayMilliseconds)
            }


          }
          console.log("IIIIIII======", i)

        }

        console.log("IIIIIIIoooo======", i)
        if (i == BUEmpIds.length) {
          res.status(200).json(empPerMonthAttendenceList)
        }
      }

    });
}

