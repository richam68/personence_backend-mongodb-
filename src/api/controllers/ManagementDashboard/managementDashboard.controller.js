const teamStatus = require('../../models/attendance/clockInOut.model')
const Holiday = require('../../models/holidays/holidays.model');
const Leave = require('../../models/leave/empLeaveRequest.model');
const Employee = require("../../models/employee/employee.model");
const mongoose = require("mongoose");



//To get Active Employee
//To get Active Employee
module.exports.getActiveEmployee = async function (req, res) {
  // status = req.params.status;
  fromdate = req.params.createdAt;
  todate = new Date();
  console.log(new Date(fromdate));
  console.log(new Date(todate));


  Employee.aggregate([

    {
      $match: {
        organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id),
        client_id: new mongoose.Types.ObjectId(req.params.client_id),
        createdAt:
        {
          $gte: new Date(fromdate),
          $lte: new Date(todate)
        }

      }
    },
    { $group: { _id: "$name", count: { $sum: 1 } }, },
    // {
    //   $group: {
    //     _id: "$organisation_id",
    //     count: { $sum: 1 }
    //   },
    // },
  ])
    .exec(function (err, empdata) {
      if (err) {

        res.status(500).json(err);
      } else {

        res.status(200).json(
          {
            name: empdata,
            total: empdata.length
          }
        );
      }
    });
};


//To get maleFemale data
module.exports.getMaleFemaleData = function async(req, res) {
  let fromdate = req.params.fromdate;
  let todate = new Date();
  // var client_id = req.params.client_id;
  Employee.aggregate([{
    $match: {
      organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id),
      client_id: new mongoose.Types.ObjectId(req.params.client_id),
      createdAt:
      {
        $gte: new Date(fromdate),
        $lte: new Date(todate)
      }
    },

  },
  { $group: { _id: "$employee_gender", count: { $sum: 1 }, }, },])
    .exec(function (err, empdata) {
      if (err) {

        res.status(500).json(err);
      } else {
        let malfl = []


        empdata.map(emp => {
          malfl.push({ ...emp, color: emp._id == "Male" ? "#619EE5" : emp._id == "Female" ? "#EB97D3" : "black" })
        })


        res.status(200).json(malfl);
      }
    });
};


//To Get Employee Left Details
module.exports.getEmployeeLeftDetails = async function (req, res) {
  const actualDateOfLeaving = req.params.actualDateOfLeaving;
  const organisation_id = req.params.organisation_id;
  const client_id = req.params.client_id;
  // var client_id = req.params.client_id;

  if (actualDateOfLeaving.length == 10) {
    var my = req.params.actualDateOfLeaving.slice(7)
  }
  else {
    var my = req.params.actualDateOfLeaving;
  }

  Employee.aggregate
    ([
      { $match: { actualDateOfLeaving: { $regex: my } } },
      // { $match: { client_id: req.params.client_id} },
      { $match: { client_id: new mongoose.Types.ObjectId(req.params.client_id) } },

      { $match: { organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id) } },
      {
        $group: { _id: "$name", count: { $sum: 1 } },
      }])
    .exec(function (err, data) {
      if (err) {

        res.status(500).json(err);
      }
      else {

        res.status(200).json(
          {
            name: data,
            total: data.length
          });
      }
    })

}


//To get data of new Joinee 
// change to remove joining_date and bind only month
module.exports.getNewJoineeDetails = async function (req, res) {
  const joining_date = req.params.joining_date;
  //const organisation_id = req.params.organisation_id;
  // const client_id = req.params.client_id;

  if (joining_date.length == 10) {
    var my = req.params.joining_date.slice(7)
  }
  else {
    var my = req.params.joining_date;
  }

  Employee.aggregate
    ([
      { $match: { joining_date: { $regex: my } } },
      {
        $match: {
          organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id),
          client_id: new mongoose.Types.ObjectId(req.params.client_id)

        }
      },
      { $group: { _id: "$name", count: { $sum: 1 } }, }])
    .exec(function (err, data) {
      if (err) {

        res.status(500).json(err);
      }
      else {

        res.status(200).json(
          {
            name: data,
            total: data.length
          }
        );
      }
    })
}

//To get  new Employee employee joined by month
module.exports.getNewJoineeByMonth = function async(req, res) {
  {
    let TODAY = "2022-11-14";

    let YEAR_BEFORE = "2021-11-14";
    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    Employee.aggregate([

      { $match: { joining_date: { $gte: YEAR_BEFORE, $lte: TODAY } } },
      //   organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id),
      //       client_id: new mongoose.Types.ObjectId(req.params.client_id),
      //  },
      // { $match: {client_id: req.params.client_id} } ,

      {
        $match: {
          organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id),
          client_id: new mongoose.Types.ObjectId(req.params.client_id),
          // createdAt: {
          //   $gte: new Date(req.params.fromdate),
          //   $lte: new Date()
          // }
        }
      },


      // {
      // $match: {
      //   joining_date: { $gte: YEAR_BEFORE, $lte: TODAY }
      // },
      // { $match: { client_id: new mongoose.Types.ObjectId(req.params.client_id) } }},

      {
        $group: {
          _id: { "year_month": { $substrCP: ["$joining_date", 0, 7] } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year_month": 1 }
      },
      {
        $project: {
          _id: 0,
          count: 1,
          month_year: {
            $concat: [
              { $arrayElemAt: [monthsArray, { $subtract: [{ $toInt: { $substrCP: ["$_id.year_month", 5, 2] } }, 1] }] },
              "-",
              { $substrCP: ["$_id.year_month", 0, 4] }
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          data: { $push: { k: "$month_year", v: "$count" } }
          //  k: "$month_year", v: "$count" 

        }
      },
      {
        $project: {
          //  $arrayToObject: "$data" ,
          //  data: "$data" ,



          data: { $arrayToObject: "$data" },
          _id: 0
        }
      }]).exec(function (err, empdata) {
        if (err) {
          res.status(500).send("Internal server error")

        }
        else if (empdata.length > 0) {
          console.log('checking data of emp===', empdata)

          // let newHidt=[]

          // let tempArr = [];

          // console.log("Employee of rty======", empdata)
          // empdata.map(emp => {
          //   newHidt.push({ ...emp, name: emp.data >0 ? "SSC" :  "Sep 2022"})
          // })

          res.status(200).json(empdata[0].data);
          // res.status(200).json(newHidt);

          // json(
          //   {
          //     "data" : empdata,
          //     "empdata" : empdata.data,
          //     "month_year" : empdata.count
          //   });
          // else
          // {
          //   res.status(200).json(empdata[0].data);

          // }
        }
        else {
          console.log('checking data of emp===', empdata)

          res.status(200).json(empdata);

        }
      })
  }
}

//To get Employee Distribution by function

module.exports.getEmpDetailsAvg = function async(req, res) {
  const _id = req.params.organisation_id;
  const date = req.params.date;



  function formatDate() {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      year = "" + d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (year.length < 2) year = "0" + year;

    return [year, month].join("-");
  }

  md = formatDate(date);
  //


  Employee.aggregate([
    {
      $match: { joining_date: { $regex: md } }

    },
    {
      $group: {
        _id: "$department",
        count: { $sum: 1 }
      }
    },

  ])
    .exec(function (err, empdata) {
      if (err) {

        res.status(500).json(err);
      } else {
        res.status(200).json(empdata[0]);
      }
    });

};


// To get Employee Qualification Details
module.exports.getEmpQualificationDetails = function async(req, res) {
  organisation_id = req.params.organisation_id;
  fromdate = req.params.fromdate;
  todate = new Date();

  Employee.aggregate([
    {
      $match: {
        organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id),
        client_id: new mongoose.Types.ObjectId(req.params.client_id),
        createdAt:
        {
          $gte: new Date(fromdate),
          $lte: new Date(todate)
        }

      }
    },
    {
      $group: {
        _id: "$education.education_detail",
        count: { $sum: 1 },

      },
    },
  ])

    .exec(function (err, empdata) {
      if (err) {

        res.status(500).json(err);
      } else {





        // empdata.map((emp) => {
        //   

        // })


        let tempArr = [];


        empdata.map(emp => {
          tempArr.push({ ...emp, education: emp._id == "Ssc" ? "SSC" : emp._id == "Hsc" ? "HSC" : emp._id == "Grad" ? "Grad" : emp._id == "PG" ? "PG" : "other" })
        })
        // 


        // let tempArr = [];
        // empdata.map(data => {
        //   
        //   tempArr.push({ name: data._id.length > 0 ? data._id[0] : '', count: data.count },
        // {name:'ssc',count: data.count},
        // {name:'Grad',count: data.count},{name:'Post Grad',count: data.count},{name:'Other',count: data.count}
        // )
        // }
        // )

        // empdata.name = 'garduation';
        res.status(200).json(tempArr);


      }
    });
};


// module.exports.getEmpQualificationDetails = function async(req, res) {
//   organisation_id = req.params.organisation_id;

//   // give by ashu
//   // qualification={
//   //   SSC,Grad,PostGrad,Others
//   // }
//   Employee.aggregate([
//     { $match: { organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id) } },
//     {
//       $group: {
//         _id: "$education.course_name",
//         count: { $sum: 1 },
//       },
//     },
//   ])
//     .exec(function (err, empdata) {
//       if (err) {
//         
//         res.status(500).json(err);
//       } else {
//         
//         res.status(200).json(empdata)
//       }
//     });
// };

//To get Employee state wise details
// {
//   module.exports.getEmpStateDetails = function async(req, res) {
//     organisation_id = req.params.organisation_id;
//     Employee.aggregate([
//       // given by me only match
//       { $match: { organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id) } },
//       {
//         $group: {
//           _id: "$state",
//           count: { $sum: 1 },
//         },
//       },
//     ])
//       .exec(function (err, empdata) {
//         if (err) {
//           
//           res.status(500).json(err);
//         } else {
//           
//           // res.status(200).json({name :empdata,total : empdata.length});
//           res.status(200).json(empdata);

//         }
//       });
//   };
// }




module.exports.getEmpStateDetails = function async(req, res) {
  organisation_id = req.params.organisation_id;
  Employee.aggregate([
    // given by me only match
    {
      $match: {
        organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id),
        client_id: new mongoose.Types.ObjectId(req.params.client_id),
        // createdAt: {
        //   $gte: new Date(req.params.fromdate),
        //   $lte: new Date()
        // }
      }
    },
    {
      $group: {
        _id: "$state",
        count: { $sum: 1 },
      },
    },
  ])
    .exec(function (err, empdata) {
      if (err) {

        res.status(500).json(err);
      } else {

        // res.status(200).json({name :empdata,total : empdata.length});
        res.status(200).json(empdata);

      }
    });
};


// To get age Status of Employees
module.exports.getEmpAgeData = function async(req, res) {
  organisation_id = req.params.organisation_id;
  Employee.aggregate([
    {
      $match:
      {
        organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id),
        client_id: new mongoose.Types.ObjectId(req.params.client_id),
        createdAt: {
          $gte: new Date(req.params.date),
          $lte: new Date()
        }
      }
    },

    {
      $group: { _id: "$dob" },
    }])
    .exec(function (err, empdata) {
      if (err) {

        res.status(500).json(err);
      } else {



        let agerange1 = 0;
        let agerange2 = 0;
        let agerange3 = 0;
        let agerange4 = 0;

        function GetAge(dob) {
          var today = new Date();
          var birthDate = new Date(dob);
          var age = today.getFullYear() - birthDate.getFullYear();
          var m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return age;
        }
        empdata.map((emp) => {

          var age = GetAge(emp._id);


          if (age >= 19 && age <= 29) {
            agerange1++;
          }
          else if (age >= 30 && age <= 39) {
            agerange2++;
          }
          else if (age >= 40 && age <= 49) {
            agerange3++;
          }
          else {
            agerange4++;
          }
        })



        res.status(200).json([{ AgeRange: agerange1, name: '20-30 yrs' }, { AgeRange: agerange2, name: '30-40 yrs' },
        { AgeRange: agerange3, name: '40-50 yrs' }, { AgeRange: agerange4, name: '>50 yrs' }],
          // {
          //   dob: empdata,
          //   AgeRange20To30: agerange1,
          //   AgeRange31To40: agerange2,
          //   AgeRange41To50: agerange3,
          //   AgeRange51To60: agerange4
          // }
        );

      }
    });
}


// to get employee Distribution by function
module.exports.getEmpDistribtnByFunc = function async(req, res) {
  organisation_id = req.params.organisation_id;
  // _id = "$education.course_name"
  Employee.aggregate([
    {
      $match: {
        organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id),
        client_id: new mongoose.Types.ObjectId(req.params.client_id),
        createdAt:
        {
          $gte: new Date(req.params.fromdate),
          $lte: new Date()
        }
      }
    },
    {
      $group: {
        _id: "$department_name",
        count: { $sum: 1 },
      },
    },
  ])
    .exec(function (err, empdata) {
      if (err) {

        res.status(500).json(err);
      } else {
        let empDbnFn = []
        empdata.map(emp => {
          empDbnFn.push({
            ...emp, color: emp._id == "Accounts" ? "#DA7DC0" : emp._id == "Operations" ? "#1B6AC7" : emp._id == "Management" ? "red" : emp._id == "Human Resources" ? "#D176C2" : emp._id == "Software" ? "#8884d8" : emp._id == "FSS" ? "pink" :
              emp._id == "Recruitment" ? "#D176C2" : emp._id == "Executive Search" ? "#41D519" : "green"
          })
        })

        // res.status(200).json(empdata);
        res.status(200).json(empDbnFn);
      }
    });
};

// to get present employee by date in management dashboard

module.exports.getTotalPresentEmp = function (req, res) {

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

      // { $match: { clockInOutDate: req.params.date, organisation_id: req.params.organisation_id,} },
      { $match: { clockInOutDate: req.params.date, organisation_id: req.params.organisation_id, Buid: req.params.Buid } },

      {
        $group: {
          _id: "$employeeId", clockIn: { $first: "$clockIn" }, clockOut: { $last: "$clockOut" },
          profile_pic: { $addToSet: "$employeedata.profile_pic" },
          name: { $addToSet: "$employeedata.name" }, lname: { $addToSet: "$employeedata.l_name" }
        }
      }
    ])
    .exec(function (err, empList) {


      if (err) {
        console.log("Error in working days", err)
      }
      else {
        var count = empList.length;
        var emplist = {
          count,
          empList
        }
        res.json(emplist)
      }
    })
}

// Get total employees on leave by date in management dashboard

module.exports.getTotalEmployeeOnLeaveByDate = function (req, res) {
  console.log("getTotalEmployeeOnLeave       -------")
  Leave
    .aggregate(
      [
        {
          $match: {
            // organisation_id: req.params.organisation_id,
            organisation_id: req.params.organisation_id, Buid: req.params.Buid,
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
        console.log("Error in finding Leave")
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
        console.log(" EmpIDArray", empIdArray)
        Employee.find({ EmpCognitoID: { $in: empIdArray }, organisation_id: req.params.organisation_id }, {}, function (err, empFinalList) {
          if (err) {
            console.log("Error finding Employees from arrayId", err)
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

// Get total employees with undertime in management dashboard

module.exports.getTotalEmpUndertimeByDate = function (req, res) {

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

      // { $match: { clockInOutDate: req.params.clockInOutDate, organisation_id: req.params.organisation_id} },
      { $match: { clockInOutDate: req.params.clockInOutDate, organisation_id: req.params.organisation_id, Buid: req.params.Buid } },

      {
        $group: {
          _id: { "clockInOutDate": "$clockInOutDate", "employeeId": "$employeeId" }, totalQuantity: { $sum: "$totalHours" },

          employee: { $addToSet: "$employeedata" }
        }
      }
    ])
    .exec(function (err, empList) {
      const employeeList = []
      empList.map((emp) => {
        if (emp.totalQuantity <= 32400000) {
          employeeList.push(emp)
        }
      })

      if (employeeList.length > 0) {

      }

      res.json(employeeList)
    })

}

module.exports.getTotalWorkingHours = async function (req, res) {


  var organisation_id = req.body.organisation_id;
  var todate = req.body.todate;
  var fromdate = req.body.fromdate

  console.log("GET the getTeamWorkingHours :", organisation_id, todate);

  let workingHrs = await teamStatus.aggregate([
    {
      // $match: { organisation_id: req.body.organisation_id }
      $match: { organisation_id: req.body.organisation_id, Buid: req.body.Buid }
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
    console.log("Error in workingHrs ", err)
  }
  else {
    console.log("workingHrs", workingHrs)
    res.json(workingHrs)
  }


}

module.exports.AvgWrkingHrsPerEmployee = function (req, res) {
  var todate = req.params.todate;
  var fromdate = req.params.fromdate;

  teamStatus.aggregate([
    {
      $match: {
        // organisation_id: req.params.organisation_id,
        organisation_id: req.params.organisation_id, Buid: req.params.Buid,
        createdAt: {
          $gte: new Date(fromdate),
          $lte: new Date(todate),
        },
      }
    },
    // {
    //   $group:{
    //     _id : "$organisation_id",
    //     count:{$sum:1}

    //   },

    // },
  ]).exec(function (err, empList) {
    if (err) {
      res.status(500).send("Internal Server Error");
    }
    else {
      res.status(200).json(empList.length);
    }
  })

}



// module.exports.getEmplAvgTenure = function async(req, res) {
//   organisation_id = req.params.organisation_id;
//   current_date = req.params.current_date;
//   // _id = "$education.course_name"
//   Employee.aggregate([
//     {
//       $match: {
//         organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id),
//         status: true
//         // joining_date:current_date

//         // current_date: new Date()
//       }
//     },
//     // {
//     //   $match:{
//     //     joining_date:req.params.current_date
//     //   }
//     // },
//     {
//       $group: {
//         _id: "$emp",
//         // _id: {"joining_date":"$joining_date","current_date":"$current_date"},
//         // _id: {"joining_date":"$joining_date"},

//         // cd:"$urrent_date",
//         count: { $sum: 1 },
//       },
//     },
//   ])
//     .exec(function (err, empdata) {
//       if (err) {
//         console.log("Error finding Employeedata data");
//         res.status(500).json(err);
//       } else {

//         //  var cd=_id-current_date

//         // let empDbnFn = []
//         // console.log("Employee of rty======", empDbnFn)
//         // empdata.map(emp => {
//         //   empDbnFn.push({ ...emp, color: emp._id == "Accounts" ? "#DA7DC0" : emp._id == "Operations" ? "#1B6AC7" : emp._id == "Management"?"red":emp._id == "Human Resources"?"pink":emp._id == "Software"?"#8884d8":"green" })
//         // })
//         console.log("Found Em{ployee's joining_date", empdata.length);
//         // res.status(200).json(empdata);
//         res.status(200).json(empdata);
//       }
//     });
// };

// module.exports.getAllEmployeeByBuId = function (req, res) {
//   Employee.aggregate([
//     { $match: { organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id), status: "true" , client_id : req.params.Buid }},
//   ]).exec(function (err, employee) {
//     if (err) {

//       res.status(500).json(err);
//     } else {


//       res.json(employee);

//     }
//   })
// }
module.exports.getAllEmployeeByBuId = function (req, res) {
  Employee.aggregate([
    { $match: { organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id), client_id: new mongoose.Types.ObjectId(req.params.Buid) } },
  ]).exec(function (err, employee) {
    if (err) {

      res.status(500).json(err);
    } else {


      res.json(employee);

    }
  })
}


// module.exports.getEmpAverageTenure = function async(req, res) {
//   organisation_id = req.params.organisation_id;
//   current_date=req.params.current_date
//   // _id="$education.education_detail"

//   Employee.aggregate([
//     { $match: { organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id) } },
//     {
//       $group: {
//         _id: "$joining_date",
//         count: { $sum: 1 },

//       },
//     },
//   ])
//     .exec(function (err, empdata) {
//       if (err) {
//         console.log("Error finding Employeedata data");
//         res.status(500).json(err);
//       } else {
//         console.log("Found Employee's in getEmpAverageTenure", empdata.length);

//         // empdata.map((emp) => {
//         //   console.log("qualificat", emp._id);
//         // })
//         // console.log('checking datav of malfl',malfl)
//         // let tempArr = [];
//         // empdata.map(data => {
//         //   console.log('checking data in bacend of', data)
//         //   tempArr.push({ name: data._id.length > 0 ? data._id[0] : '', count: data.count },
//             // {name:'ssc',count: data.count},
//             // {name:'Grad',count: data.count},{name:'Post Grad',count: data.count},{name:'Other',count: data.count}
//           // )
//         // }
//         // )
//         // console.log("Final Data======", tempArr)
//         // empdata.name = 'garduation';
//         res.status(200).json(empdata);


//       }
//     });
// };

// module.exports.getTotalEmp = function (req, res) {


//   Employee.find({ organisation_id: req.params.organisation_id, client_id: req.params.client_id })
//     .exec(function (err, empData) {
//       if (err) {

//         res.status(500).json(err);
//       } else {

//         res.json(empData);
//       }
//     });
// }