const EmployeeActivity = require("../../models/employeeActivity/empActivity.model")
const Employee = require("../../models/employee/employee.model")
const EmployeeScreenActivity = require("../../models/employeeActivity/empScreenActiviy.model")
EmpMostUsedApplication=require("../../models/employeeActivity/empMostUsedApplication.model")
EmpMostUsedWebsite =require("../../models/employeeActivity/empMostUsedWebsite.model")
const fs = require('fs');
const AWS = require('aws-sdk');
const ID = 'AKIAYEMLIMTXF5KDDQEH';
const SECRET = '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';
const BUCKET_NAME = 'orgzstack';
const mongoose = require('mongoose')
const webp = require('webp-converter');
const path = require("path");
const formidable = require('formidable')
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  region: 'ap-south-1'
})
const BreakHour = require('../../models/attendance/breakHour.model')
const Policy = require('../../models/attendance/attendancePolicies.model')

const getBreakHourPolicy = async (d) => {
  try {
    let breakHour = await Policy.find({ employeeList: d })
    return breakHour[0].breakTime
  } catch (error) {

  }

}

const getEmployeeBreakHour = async (emp, date) => {
  try {
    let breakHour = await BreakHour.aggregate([
      { $match: { employeeId: emp, date: date } },
      { $group: { _id: '$employeeId', total: { $sum: "$totalBreakHours" } } }
    ])
    return breakHour[0].total
  } catch (error) {
  }
}

const getEmployeeBreakHoursByPolicy = async (emp, fromDate, toDate) => {
  try {
    let breakHour = await BreakHour.aggregate([
      { $match: { employeeId: emp } },
      {
        $match: {
          createdAt: {
            $gte: new Date(fromDate),
            $lte: new Date(toDate)
          }
        }
      },
      { $group: { _id: '$date', total: { $sum: "$totalBreakHours" } } }
    ])
    let breakHourByPolicy = await Policy.find({ employeeList: emp })
    breakHourByPolicy = breakHourByPolicy[0].breakTime
    var time = breakHourByPolicy
    var timeParts = time.split(":")
    breakHourByPolicy = (+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000)
    let count = []
    let totalBreakHour = []
    breakHour.map((d) => {
      if (breakHourByPolicy > d.total) {
        count.push(d)
        totalBreakHour.push(d.total)
      }
      else {
        count.push(d)
        totalBreakHour.push(breakHourByPolicy)
      }
    })
    return totalBreakHour.reduce((a, b) => a + b)
  } catch (error) {

  }

}

module.exports.getEmployeeActivityByOrgId = function (req, res) {
  var organisationID = req.params.organisationID;


  EmployeeActivity.find({ organisation_id: organisationID }).exec(function (
    err,
    doc
  ) {
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
        message: "organisationID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Get Employee Activity by employeeId
module.exports.getEmpActivityByEmpId = function (req, res) {
  var employeeId = req.params.employeeId;


  EmployeeActivity.find({ employeeId: employeeId }).exec(function (err, doc) {
    var response = {
      status: 200,
      message: doc22,
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

//Get Single Employee Activity
module.exports.getOneEmpActivity = function (req, res) {
  var _id = req.params.empActivityId;


  EmployeeActivity.findById(_id).exec(function (err, doc) {
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
        message: "empActivityId ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Get Employee Activity list
module.exports.getAllEmpActivity = function (req, res) {
  EmployeeActivity.find()
    .exec(function (err, EmployeeActivity) {
      if (err) {

        res.status(500).json(err);
      } else {

        res.json(EmployeeActivity);
      }
    });
};

// Function used for create a new organisation (insert)
module.exports.insertEmpActivity = function (req, res) {
  EmployeeActivity.create(
    req.body
    ,
    function (err, empActivity) {
      if (err) {

        res.status(400).json(err);
      } else {

        res.status(201).json(empActivity);
      }
    }
  );
};


module.exports.getEmpScreenActivityByEmpId = function (req, res) {
  var employeeId = req.params.employeeId;


  EmployeeScreenActivity.find({ employeeId: employeeId, empDateTime: { $regex: req.params.date } })
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
          message: "employeeId not found",
        };
      }
      res.status(response.status).json(response.message);
    });
};

module.exports.getAllEmpScreenActivity = function (req, res) {
  EmployeeScreenActivity.find()


    .exec(function (err, EmployeeScreenActivity) {
      if (err) {

        res.status(500).json(err);
      } else {

        res.json(EmployeeScreenActivity);
      }
    });
};

const uploadFile = (fileName, fields, res) => {
  var absolutePath = path.resolve(fileName);
  console.log(absolutePath);
  // Read content from the file
  let fileLocation = "";
  // fileSrc = fs.readFile(fileName);

  fs.readFile(absolutePath, function (error, data) {
    if (error) {
      throw error;
    } else {
      let webPBuffer = webp.buffer2webpbuffer(data, "jpg", "-q 5", absolutePath);
      webPBuffer.then(async function (result) {
        // you access the value from the promise her\
        let empid = fields.employeeId;
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
        let TimeStamp = empid + '_' + date + '_' + time + '.webp';
        let empdetail = await Employee.find({ EmpCognitoID: empid })
        console.log('empdetail', empdetail, empdetail[0].organisation_id)
        let org = empdetail[0].organisation_id;

        //let bu="";
        let folder = org + '/' + "screenshots/";
        let objectKey = folder + TimeStamp
        console.log('timestamp', objectKey);

        const params = {

          Bucket: BUCKET_NAME,
          Key: `${objectKey.toString()}`, // File name you want to save as in S3
          Body: result,
          ContentType: 'image/webp'
        };

        // Uploading files to the bucket
        s3.upload(params, function (err, data) {
          if (err) {

            console.log(err)
          }
          console.log('location file upload', data)
          let changeurl = data.Location.replace('https://orgzstack.s3.ap-south-1.amazonaws.com', ' https://dz24ebjpd9u45.cloudfront.net');
          console.log('changeurl', changeurl)
          EmployeeScreenActivity.create({
            empUrl: changeurl,
            empDateTime: fields.empDateTime,
            employeeId: fields.employeeId
          }, function (err, employeeScreenshot) {
            if (err) {

              res.status(400).json(err);
            } else {

              res.status(201).json(employeeScreenshot);
            }
          })
          console.log(`File uploaded successfully. ${data.Location}`);
          fileLocation = data.Location;
          fs.unlink(absolutePath, function (err) {
            if (err) {
              // do something with error
            }
            else {
              // delete successful
            }
          });
        });


      });
    }
  });

  return fileLocation
}

module.exports.insertEmpScreenActivity = function (req, res) {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
      return;
    }
    uploadFile(files.image.filepath, fields, res)
    console.log(uploadFile)
  })
};


module.exports.getEmpIdleHrs = async function (req, res) {
  EmployeeActivity.find({ employeeId: req.params.employeeId, eventDateTime: { $regex: req.params.date } })
    .exec(async function (err, Activity) {
      if (err) {
        res.json(err)
      }

      else {

        let idlehrs = []

        let workhrs = []
        Activity.forEach(element => {

          let pCount = workhrs.length == '0' ? 0 : workhrs[workhrs.length - 1].element.eventCounting
          let eventDateTime = workhrs.length == '0' ? 0 : workhrs[workhrs.length - 1].element.eventDateTime

          if (element.eventCounting >= pCount & element.eventDateTime != eventDateTime) {
            workhrs.push({ element, productivity: 'productive' })
          }
          else {
            idlehrs.push({ element, productivity: 'idle' })
          }
        });

        res.json(idlehrs)
      }
    })
}

module.exports.getEmpIdleHrsPeriod = async function (req, res) {
  EmployeeActivity.find({ employeeId: req.params.employeeId, createdAt: { $gte: new Date(req.params.fromDate), $lte: new Date(req.params.toDate) } })
    .exec(async function (err, Activity) {
      if (err) {
        res.json(err)
      }

      else {

        let idlehrs = []

        let workhrs = []
        Activity.forEach(element => {

          let pCount = workhrs.length == '0' ? 0 : workhrs[workhrs.length - 1].element.eventCounting
          let eventDateTime = workhrs.length == '0' ? 0 : workhrs[workhrs.length - 1].element.eventDateTime

          if (element.eventCounting >= pCount & element.eventDateTime != eventDateTime) {
            workhrs.push({ element, productivity: 'productive' })
          }
          else {
            idlehrs.push({ element, productivity: 'idle' })
          }
        });
        idlehrs = idlehrs.length * 120000
        res.json(idlehrs)
      }
    })
}

module.exports.getEmpMouseActivity = async function (req, res) {
  EmployeeActivity.find({ employeeId: req.params.emp_id, eventDateTime: { $regex: req.params.date } })
    .exec(async function (err, Activity) {
      try {
        if (err) {
          res.json(err)
        }
        else {
  
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
  
          let breakHour = await getBreakHourPolicy(req.params.emp_id)
          var time =await breakHour;
          var timeParts = time.split(":")
          breakHour = (+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000)
  
          let employeeBreak = await getEmployeeBreakHour(req.params.emp_id, req.params.date)==undefined?0:await getEmployeeBreakHour(req.params.emp_id, req.params.date)
          let idleHrs = employeeBreak > breakHour ? mouseactivity.filter((m) => m.productivity == 0).length * 120000 - breakHour : mouseactivity.filter((m) => m.productivity == 0).length * 120000 - employeeBreak
  
          res.json({ mouseactivity, idleHrs })
        }
      } catch (error) {
        
      }
      
    })
}

module.exports.getEmpMouseActivityPeriod = async function (req, res) {
  EmployeeActivity.find({ employeeId: req.params.emp_id, createdAt: { $gte: new Date(req.params.fromDate), $lte: new Date(req.params.toDate) } })
    .exec(async function (err, Activity) {
      try {
        if (err) {
          res.json(err)
        }
        else {
  
          let activity = []
          Activity.forEach(element => {
            let pCount = activity.length == '0' ? 0 : activity[activity.length - 1].element.eventCounting
            if (element.eventCounting > pCount) {
              let mousecount = element.eventCounting - pCount
              let percent = mousecount / 20 * 100
              if (percent >= 100) {
                activity.push({ element, productivity: 100 })
              }
              else {
                activity.push({ element, productivity: percent < 0 ? 0 : percent })
              }
            }
            else {
              activity.push({ element, productivity: 0 })
            }
          })
  
          let idleHrs = activity==''?0:activity.filter((m) => m.productivity == 0).length * 120000 - await getEmployeeBreakHoursByPolicy(req.params.emp_id, req.params.fromDate, req.params.toDate) == undefined ? 0 : await getEmployeeBreakHoursByPolicy(req.params.emp_id, req.params.fromDate, req.params.toDate)
          res.json({ activity, idleHrs })
        }
      } catch (error) {
        
      }
     
    })
}

module.exports.getTeamIdleHrsManager = async function (req, res) {

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
      })

      let teamIdleHrs = []

      empIdArray.map(async (d) => {
        let Activity = await EmployeeActivity.find({ employeeId: d, createdAt: { $gte: new Date(req.params.fromDate), $lte: new Date(req.params.toDate) } })

        let activity = []
        Activity.forEach(element => {
          let pCount = activity.length == '0' ? 0 : activity[activity.length - 1].element.eventCounting
          if (element.eventCounting > pCount) {
            let mousecount = element.eventCounting - pCount
            let percent = mousecount / 20 * 100
            if (percent >= 100) {
              activity.push({ element, productivity: 100 })
            }
            else {
              activity.push({ element, productivity: percent < 0 ? 0 : percent })
            }
          }
          else {
            activity.push({ element, productivity: 0 })
          }
        })
        let idleHrs = activity.filter((m) => m.productivity == 0).length * 120000
        teamIdleHrs.push(idleHrs)

        if (employee.length <= 1) {
          res.json(teamIdleHrs.reduce((a, b) => a + b))
        }

        if (empIdArray.length == teamIdleHrs.length + 1) {
          setTimeout(() => {
            res.json(teamIdleHrs.reduce((a, b) => a + b))
          }, 100)
        }
      }
      )


    }
  })
}

module.exports.getTeamIdleHrsAdmin = async function (req, res) {

  Employee.aggregate([
    {
      $match: {
        client_id: new mongoose.Types.ObjectId(req.params.Buid),
        organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id),
        status: 'true',
      },
    },
  ]).exec(async function (err, employee) {
    if (err) {

      res.status(500).json(err);
    } else {

      let teamIdleHrs = []

      employee.map(async (d) => {
        let Activity = await EmployeeActivity.find({ employeeId: d.EmpCognitoID, createdAt: { $gte: new Date(req.params.fromDate), $lte: new Date(req.params.toDate) } })


        let activity = []
        Activity.forEach(element => {
          let pCount = activity.length == '0' ? 0 : activity[activity.length - 1].element.eventCounting
          if (element.eventCounting > pCount) {
            let mousecount = element.eventCounting - pCount
            let percent = mousecount / 20 * 100
            if (percent >= 100) {
              activity.push({ element, productivity: 100 })
            }
            else {
              activity.push({ element, productivity: percent < 0 ? 0 : percent })
            }
          }
          else {
            activity.push({ element, productivity: 0 })
          }
        })
        let idleHrs = activity.filter((m) => m.productivity == 0).length * 120000
        teamIdleHrs.push(idleHrs)

        if (employee.length <= 1) {
          res.json(teamIdleHrs.reduce((a, b) => a + b))
        }

        if (employee.length == teamIdleHrs.length + 1) {
          setTimeout(() => {
            res.json(teamIdleHrs.reduce((a, b) => a + b))
          }, 100)
        }

      })

    }
  })
}


// this function used for insert  most used application 
module.exports.insertUsedApplication = async function (req, res) {
  try {
    let lastEntry = await EmpMostUsedApplication.find({ employeeId: req.body.employeeId }).sort({ updatedAt: -1 }).limit(1)
    // .exec(function (err, result) {
    //   if (err) {
    //   } else {
    //     res.json(result)
    //   }})
   
    if (lastEntry == '') {
            res.json('No data Found');
    }
    else {
      lastEntry[0].endTime = req.body.startTime
      lastEntry[0].save(await function (err, employeeUpdated) {
        if (err) {
          res.status(500).json(err);
          console.log('in save if condition',err)
        } else {               
        EmpMostUsedApplication.create(req.body,
            function (err, empActivity) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json(empActivity);
        }
      }
    )
        }
       
    })}
    // EmpMostUsedApplication.create(req.body,
    //  await function (err, empActivity) {
    //     if (err) {
    //       res.status(400).json(err);
    //     } else {
    //       res.status(201).json(empActivity);
    //     }
    //   }
    // )}
  } catch (error) {

  }
};

module.exports.updateUsedApplication = function (req, res) {
  EmpMostUsedApplication.find({ employeeId: req.body.employeeId })
    .sort({ updatedAt: -1 })
    .limit(1)
    .exec((err, doc) => {
      if (err) {

      }
      else {
        doc.startTime = req.body.startTime,
          doc.endTime = req.body.endTime
        doc.save()
      }
    })

}
// this function used for insert  most used Website  
module.exports.insertUsedWebsite = function (req, res) {
  EmpMostUsedWebsite.create(
    req.body
    ,
    function (err, usedWebsite) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(usedWebsite);
      }
    }
  );
};

module.exports.updateUsedWebsite = function (req, res) {
  EmpMostUsedApplication.find({ employeeId: req.body.employeeId })
    .sort({ updatedAt: -1 })
    .limit(1)
    .exec((err, doc) => {
      if (err) {

      }
      else {
        doc.startTime = req.body.startTime,
          doc.endTime = req.body.endTime
        doc.save()
      }
    })
}