const Employee = require("../../models/employee/employee.model");
var Promise = require("promise");
const mongoose = require("mongoose");
var nodemailer = require("nodemailer");
const EmpLeaveRequest = require("../../models/leave/empLeaveRequest.model");
const AdjustAttendance = require("../../models/attendance/attendance.model");
const Client = require("../../models/client/client.model");
const Zonee = require("../../models/organisationSetup/zone.model");
const Role = require("../../models/role/role.model");
const LastCode = require("../../models/lastCode/lastCode.model");
//const NumberAllocator = require("number-allocator").NumberAllocator;
const Organisation = require("../../models/organisation/organisation.model");
const Onboarding = require("../../models/employee/onBoarding.model");
const OrgSpocs = require("../../models/bussinessUnit/orgSpocs.model");

async function getReportingManager(obj) {
  let d = await Employee.find({ employee_email: obj })
  return d[0].EmpCognitoID
}

const getLocationCode = (locationName) => {
  // If we get mumbai then the location code should be MUM, similarly for all
  let locationCode = locationName.substring(0, 3).toUpperCase();

  return locationCode;
};

const getClientCode = (clientName) => {

  // if client is "Bajaj electrical ltd" then the clientCode should be "BEL" similarly for all name for ex : "Coal India Limited" we get "CIL"

  let a = clientName.split(" ");

  if (a.length === 1) {
    let clientCode = clientName.substring(0, 3);

    return clientCode.toUpperCase();
  } else if (a.length === 2) {
    let clientCode = clientName.substring(0, 2) + a[1].substring(0, 1);

    return clientCode.toUpperCase();
  } else {
    let clientCode =
      clientName.substring(0, 1) + a[1].substring(0, 1) + a[2].substring(0, 1);

    return clientCode.toUpperCase();
  }
};

// const getClientUid = function (lastCode) {
//   var lastCodeUpdated = lastCode.empLastCode + 1;
//   var str = "" + lastCodeUpdated;
//   var pad = "0000";
//   empUid = pad.substring(0, pad.length - str.length) + str;
//   var clientUid = empUid + "-" + new Date().getFullYear();
//
//   return clientUid;
// };

function getClientUid(req, res, orgName, locationCode, clientCode) {
  let clientUid, empCode;
  return new Promise((resolve, reject) => {
    LastCode.findOne({ organisation_id: req.body.organisation_id }).exec(
      function (err, lastCode) {
        var lastCodeUpdated;
        if (err) {
        } else {
          if (lastCode == null) {
            lastCode = 0;

            lastCodeUpdated = 1;
            LastCode.create(
              {
                organisation_id: req.body.organisation_id,
                empLastCode: 1,
              },
              function (err, lastCode) {
                if (err) {
                } else {
                }
              }
            );
          } else {
            lastCodeUpdated = lastCode.empLastCode + 1;
            LastCode.findOne({
              organisation_id: req.body.organisation_id,
            }).exec(function (err, lastCode) {
              if (err) {
                // res.status(400).json(err)
                reject(err);
                //
              } else {
                //  res.status(200).json(lastCode)
                if (lastCode == null) {
                } else {
                  lastCode.empLastCode = lastCodeUpdated;
                  lastCode.save(function (err, lastCodeUpdated) {
                    if (err) {
                      reject(err);
                    } else {
                    }
                  });
                }
              }
            });
          }
          var str = lastCodeUpdated.toString();
          var pad = "0000";
          empUid = pad.substring(0, pad.length - str.length) + str;
          clientUid = empUid + "-" + new Date().getFullYear();
        }
        empCode =
          orgName + "-" + locationCode + "-" + clientCode + "-" + clientUid;
        resolve(empCode);
      }
    );
  })
    .then((result) => {
      Employee.findOne(
        { EmpCognitoID: req.body.EmpCognitoID },
        function (err, docs) {
          if (err) {
          } else {
            var reslt;
            docs.update(
              { organisation_id: req.body.organisation_id, emp_id: empCode },
              function (err, result) {
                if (err) {
                } else {
                  reslt = result;
                  res.status(204).json(result);
                }
              }
            );
          }
        }
      );
    })
    .catch((err) => { });
}

module.exports.getEmployeeCode = (req, res) => {
  if (
    req.body.orgName == "" ||
    req.body.location_name == "" ||
    req.body.client_name == ""
  ) {
    res.status(400).json("Bad Reuest");
  } else {
    var orgName = getClientCode(req.body.orgName);
    var locationCode = getLocationCode(req.body.location_name);
    var clientCode = getClientCode(req.body.client_name);
    getClientUid(req, res, orgName, locationCode, clientCode);
  }
};
const Zone = require("../../models/organisationSetup/zone.model");

module.exports.employeeAddOne = function (req, res) {

  Employee.create(req.body, function (err, employee) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(employee);
      Onboarding.create({
        EmpCognitoID: req.body.EmpCognitoID,
        empstatus: 'true'
      })
    }
  });
};

module.exports.bulkEmployeeAddOne = function (req, res) {

  Employee.create(req.body.data, function (err, employee) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(employee);
      Onboarding.create({
        EmpCognitoID: req.body.data.EmpCognitoID,
        empstatus: 'true'
      })
    }
  });
}
//Create bulk Employee
module.exports.employeeBulkCreate = function (req, res) {
  Employee.insertMany(req.body)
    .then(function () { })
    .catch(function (error) { });
};

// //this function is used for Get Employee list by organisation Id
// module.exports.getAllEmployee = function (req, res) {
//   Employee.find({ organisation_id: req.params.organisation_id }).exec(function (
//     err,
//     employee
//   ) {
//     if (err) {
//
//       res.status(500).json(err);
//     } else {
//
//       res.json(employee);
//     }
//   });
// };
//Get Single Employee
module.exports.getOneEmployeeByEmpCognitoID = function (req, res) {
  var EmpCognitoID = req.params.EmpCognitoID;

  Employee.find({ EmpCognitoID: EmpCognitoID }).exec(function (err, doc) {
    var response = {
      status: 200,
      message: doc,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!doc) {
      // res;
      response.status = 404;
      response.message = {
        message: " EmpCognitoID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Get Employee Using ContractualClientID
module.exports.getEmployeesByContractualClientId = function (req, res) {
  var client_id = req.params.client_id;
  var organisation_id = req.params.organisation_id;

  Employee.find({
    $and: [{ client_id: client_id }, { organisation_id: organisation_id }],
  }).exec(function (err, doc) {
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
        message: " Route error",
      };
    } else if (!doc) {
      res;
      response.status = 404;
      response.message = {
        message: " contractual_client not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.employeeUpdateByEmpCognitoID = function (req, res) {
  var EmpCognitoID = req.body.EmpCognitoID;

  organisation_id = req.body.organisation_id;
  isfirstlogin = req.body.isfirstlogin;
  Employee.findOne({ EmpCognitoID: EmpCognitoID }, function (err, docs) {
    if (err) {
    } else {
      var reslt;
      docs.update(
        { organisation_id: organisation_id, isfirstlogin: isfirstlogin },
        function (err, result) {
          if (err) {
          } else {
            reslt = result;
            res.status(204).json();
          }
        }
      );
    }
  });
};

module.exports.employeeDeleteOne = function (req, res) {
  var _id = req.params.id;

  Employee.findByIdAndRemove(_id).exec(function (err, client) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(204).json();
    }
  });
};

module.exports.updateEmployeeDetailsByEmpCognitoID = function (req, res) {
  var EmpCognitoID = req.body.EmpCognitoID;

  Employee.findById({ _id: req.body._id })
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
          message: "EmpCognitoID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        doc.name = req.body.name;
        doc.emp_id = req.body.emp_id;
        doc.employee_gender = req.body.employee_gender;
        doc.employment_type = req.body.employment_type;
        doc.replacement_of = req.body.replacement_of;
        doc.notice_tenure = req.body.notice_tenure;
        doc.dob = req.body.dob;
        doc.phone_number = req.body.phone_number;
        doc.blood_group = req.body.blood_group;
        doc.joining_date = req.body.joining_date;
        doc.profile_pic = req.body.profile_pic;
        doc.m_name = req.body.m_name;
        doc.l_name = req.body.l_name;
        doc.alternate_number = req.body.alternate_number;
        doc.address = req.body.address;
        doc.country = req.body.country;
        doc.state = req.body.state;
        doc.city = req.body.city;
        doc.work_email = req.body.work_email;
        doc.probation_type = req.body.probation_type;
        doc.probation_duration = req.body.probation_duration;
        doc.resignationDate = req.body.resignationDate;
        doc.reason_of_leaving = req.body.reason_of_leaving;
        doc.dateOfLeaving = req.body.dateOfLeaving;
        doc.actualDateOfLeaving = req.body.actualDateOfLeaving;
        doc.uanNumber = req.body.uanNumber;
        doc.pfNumber = req.body.pfNumber;
        doc.esicNumber = req.body.esicNumber;
        doc.insuranceNumber = req.body.insuranceNumber;
        doc.insurancePF = req.body.insurancePF;
        doc.pincode = req.body.pincode;
        doc.comapny = req.body.comapny;
        doc.education = req.body.education;

        doc.save(function (err, employeeUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            Employee.updateMany(
              { reporting_manager_id: req.body.EmpCognitoID },
              { reporting_manager_name: req.body.name }
            ).exec(function (err, doc) {
              if (err) {
                res.status(500).json(err);
              } else {
                res.status(204).json({
                  message: "successfully update",
                });
              }
            });
          }
        });
      }
    });
};

// org chart
module.exports.checkEmployee = function (req, res) {
  // organisation_id: req.params.organisation_id;
  Employee.find({ organisation_id: req.params.organisation_id }).exec(function (
    err,
    employee
  ) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(employee);
    }
  });
};

// Update Employee Mapping Details
module.exports.UpdateEmpMappingDetails = function (req, res) {
  var EmpCognitoID = req.body.EmpCognitoID;

  Employee.findOne({ EmpCognitoID: EmpCognitoID }, function (err, docs) {
    if (err) {
    } else {
      var reslt;
      docs.update(
        {
          zone_id: req.body.zone_id,
          zone_name: req.body.zone_name,

          department_id: req.body.department_id,
          department_name: req.body.department_name,

          division_id: req.body.division_id,
          division_name: req.body.division_name,

          location_id: req.body.location_id,
          location_name: req.body.location_name,

          designation_id: req.body.designation_id,
          designation_name: req.body.designation_name,

          client_id: req.body.client_id,
          client_name: req.body.client_name,

          reporting_manager_id: req.body.reporting_manager_id,
          reporting_manager_name: req.body.reporting_manager_name,

          reporting_manager_email: req.body.reporting_manager_email
        },
        function (err, result) {
          if (err) {
          } else {
            reslt = result;
            res.status(204).json(result);
          }
        }
      );
    }
  });
};

// Update Employment Details
module.exports.UpdateEmploymentDetails = function (req, res) {
  var EmpCognitoID = req.body.EmpCognitoID;

  employment_type = req.body.employment_type;
  joining_date = req.body.joining_date;
  notice_expiry = req.body.notice_expiry;
  probation_type = req.body.probation_type;
  probation_duration = req.body.probation_duration;
  confirmation_date = req.body.confirmation_date;
  resignationDate = req.body.resignationDate;
  reason_of_leaving = req.body.reason_of_leaving;
  dateOfLeaving = req.body.dateOfLeaving;
  actualDateOfLeaving = req.body.actualDateOfLeaving;
  uan_no = req.body.uan_no;
  pf_no = req.body.pf_no;
  esic_no = req.body.esic_no;
  insurance_no = req.body.insurance_no;
  insurance_pf = req.body.insurance_pf;

  Employee.findOne({ EmpCognitoID: EmpCognitoID }, function (err, docs) {
    if (err) {
    } else {
      var reslt;
      docs.update(
        {
          employment_type: employment_type,
          joining_date: joining_date,
          notice_expiry: notice_expiry,
          probation_type: probation_type,
          probation_duration: probation_duration,
          confirmation_date: confirmation_date,
          resignationDate: resignationDate,
          reason_of_leaving: reason_of_leaving,
          dateOfLeaving: dateOfLeaving,
          actualDateOfLeaving: actualDateOfLeaving,
          uan_no: uan_no,
          pf_no: pf_no,
          esic_no: esic_no,
          insurance_no: insurance_no,
          insurance_pf: insurance_pf,
          roleId: req.body.roleId ? req.body.roleId : "",
        },
        function (err, result) {
          if (err) {
          } else {
            reslt = result;
            res.status(204).json(result);
          }
        }
      );
    }
  });
};

//Employee Hierarchy View
module.exports.employeesByHierarchyIDAddOne = function (req, res) {
  // var empHierarchyCode = getEmployeeHierarchyCode(req.body.name);
  var empHierarchyUniqueCode;
  // var uniqCode;

  LastCode.findOne({ organisation_id: req.body.organisation_id }).exec(
    function (err, lastCode) {
      if (err) {
        //  res.status(400).json(err);
      } else {
        //  res.status(200).json(lastCode);

        var lastCodeUpdated = lastCode.empLastCode + 1;
        empHierarchyUniqueCode =
          substring(0, length - lastCodeUpdated.length) + lastCodeUpdated;

        // uniqCode = empHierarchyCode + "-" + empHierarchyUniqueCode;
        //

        EmployeeHierarchy.create(
          {
            name: req.body.name,
            location: req.body.location,
            designation: req.body.designation,
            division: req.body.division,
            reporting_manager: req.body.reporting_manager,
            emp_id: req.body.emp_id,
            organisation_id: req.body.organisation_id,
            set_id_series: req.body.set_id_series,
            employee_email: req.body.employee_email,
            work_email: req.body.work_email,
            employee_gender: req.body.employee_gender,
            employee_pan: req.body.employee_pan,
            driving_license: req.body.driving_license,
            employment_type: req.body.employment_type,
            replacement_of: req.body.replacement_of,
            notice_tenure: req.body.notice_tenure,
            leaving_date: req.body.leaving_date,
            leaving_reason: req.body.leaving_reason,
            dob: req.body.dob,
            phone_number: req.body.phone_number,
            blood_group: req.body.blood_group,
            adhaar: req.body.adhaar,
            joining_date: req.body.joining_date,
            confirmation_date: req.body.confirmation_date,
            resignationDate: req.body.resignationDate,
            reason_of_leaving: req.body.reason_of_leaving,
            dateOfLeaving: req.body.dateOfLeaving,
            actualDateOfLeaving: req.body.actualDateOfLeaving,
            notice_expiry: req.body.notice_expiry,
            contractual_client: req.body.contractual_client,
            division: req.body.division,
            department: req.body.department,
            pf_number: req.body.pf_number,
            esic_number: req.body.esic_number,
            insurance_number: req.body.insurance_number,
            profile_pic: req.body.profile_pic,
            EmpCognitoID: req.body.EmpCognitoID,
            isfirstlogin: req.body.isfirstlogin,
            m_name: req.body.m_name,
            l_name: req.body.l_name,
            alternate_number: req.body.alternate_number,
            address: req.body.address,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            comapny: req.body.comapny,
            education: req.body.education,
          },
          function (err, employee) {
            if (err) {
              res.status(400).json(err);
            } else {
              LastCode.findOne({
                organisation_id: req.body.organisation_id,
              }).exec(function (err, lastCode) {
                if (err) {
                  // res.status(400).json(err)
                } else {
                  //  res.status(200).json(lastCode)
                  lastCode.employeeLastCode = empHierarchyUniqueCode;
                  lastCode.save(function (err, empHierarchyUniqueCode) {
                    if (err) {
                    } else {
                    }
                  });
                }
              });
              res.status(201).json(employee);
            }
          }
        );
      }
    }
  );
};

// this api for create get employees applied leave data by manager id

module.exports.getLeaveDataByReportManager = function (req, res) {
  Employee.aggregate([
    { $match: { reporting_manager_id: req.params.emp_id } },
  ]).exec(function (err, employee) {
    if (err) {
      res.status(500).json(err);
    } else {
      let empIdArray = [];
      employee.forEach((item) => {
        empIdArray.push(item.EmpCognitoID);
      });

      EmpLeaveRequest.find({ employeeId: { $in: empIdArray } }).exec(function (
        err,
        EmpLeaveRequest
      ) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(EmpLeaveRequest);
        }
      });
    }
  });
};

module.exports.getEmpRegularizationByRptManagerId = function (req, res) {
  Employee.aggregate([
    { $match: { reporting_manager_id: req.params.emp_id } },
  ]).exec(function (err, employee) {
    if (err) {
      res.status(500).json(err);
    } else {
      let empIdArray = [];
      employee.forEach((item) => {
        empIdArray.push(item.EmpCognitoID);
      });

      AdjustAttendance.find({ employeeId: { $in: empIdArray } }).exec(function (
        err,
        AdjustAttendanceData
      ) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(AdjustAttendanceData);
        }
      });
    }
  });
};

module.exports.getEmpByRptManagerId = function (req, res) {
  Employee.aggregate([
    {
      $match: {
        reporting_manager_id: req.params.emp_id,
        organisation_id: new mongoose.Types.ObjectId(req.params.org_id),
      },
    },
  ]).exec(function (err, employee) {
    if (err) {
      res.status(500).json(err);
    } else {
      let empIdArray = [];
      employee.forEach((item) => {
        empIdArray.push(item.EmpCognitoID);
      });

      Employee.find({ EmpCognitoID: { $in: empIdArray } }).exec(function (
        err,
        empData
      ) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(empData);
        }
      });
    }
  });
};

//This function create for Get Organisation  Employee Birthday based on organisationId

module.exports.getEmployeeByBirthdayAndOrgId = function (req, res) {
  let currentDate = new Date();
  function formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day].join("-");
  }
  md = formatDate(currentDate);
  Employee.find({
    dob: { $regex: md },
    organisation_id: req.params.organisation_id,
  }).exec(function (err, employee) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(employee);
    }
  });
};

//post employee email send api
module.exports.employeeEmailSendWishes = function (req, res) {
  var Employee = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "richa.maheswari@ipsgroup.co.in",
      pass: "Richa123#",
    },
  });

  var mailOptions = {
    from: "richa.maheswari@ipsgroup.co.in", //sender address
    employee_email: req.body.employee_email, //list of receivers
    description: req.body.description, //subject line
    // text: 'That was easy!'
    html: `<div style="padding: 10px; border-style: ridge"
    <p>You have a new request</p>
    <h3>Birthday Wishes</h3>
    <ul>
    <li>Email: ${req.body.employee_email}</li>
    <li>Description: ${req.body.description}</li>
    </ul>
    >`,
  };

  Employee.sendMail(mailOptions, function (error, Employee) {
    if (error) {
      res.json({ status: true, respMesg: "Error in the CODE" });
    } else {
      //
      res.json({ status: true, respMesg: "Email sent Successfully" });
    }
  });
};

//To Get Employee Details Based on Joining Date  (warm welcome in admin)

module.exports.getEmployeeByJoiningDate = function (req, res) {
  //
  let day = req.params.days;

  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - day);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  currentDate = formatDate(currentDate);
  Employee.find({ 
        organisation_id: req.params.organisation_id,
        joining_date: { $gte: currentDate }
  }).exec(function (err, employee) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(employee);
    }
  });
};

//for Employee Filter
module.exports.getEmployee = function (req, res) {
  Employee.find(
    {
      organisation_id: new mongoose.Types.ObjectId(
        req.params.org_id)
    }
    // { zone: {$in:req.body.zone}
    // location: {$in:req.body.location},
    // department: {$in:req.body.department},
    // designation: {$in:req.body.designation},
    // division: {$in:req.body.division}
    //}
  ).exec(function (err, doc) {
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
        message: "Employee Not find",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//for Employee aggregation
module.exports.getempdtls = function (req, res) {
  Employee.aggregate([
    { $match: { designation_name: req.body.designation_name } },

    {
      $lookup: {
        from: "designations",
        localField: "designation_name",
        foreignField: "name",
        as: "designation_details",
      },
    },
    {
      $lookup: {
        from: "zones",
        localField: "zone_name",
        foreignField: "name",
        as: "zone_details",
      },
    },
  ]).exec(function (err, doc) {
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
        message: "Employee Not find",
      };
    }
    res.status(response.status).json(response.message);
  });
};
//For Cascade Delete
module.exports.getEmployeesDependentData = function (req, res) {
  // var client_id = req.params.client_id;
  // var organisation_id = req.params.organisation_id;
  let searchData;

  searchData = {
    organisation_id: req.params.organisation_id,
    [req.params.searchType]: req.params.searchId,
  };

  Employee.find({
    $and: [searchData],
  }).exec(function (err, doc) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(doc);
    }
  });
};

//Get Employee Details
// module.exports.getOneEmployeeWithZone = async (req, res) => {
//
//     "getOneEmployeeWithZone EmpCognitoID",
//     req.params.organisation_id
//   );
//   const rptmanager = await Employee.find({
//     organisation_id: req.params.organisation_id,
//   }).populate("Employee");
//
//   res.send(rptmanager);
// };

module.exports.getOneEmployeeWithZone = async (req, res) => {
  const emp = await Employee.aggregate([
    {
      $match: {
        organisation_id: new mongoose.Types.ObjectId(
          req.params.organisation_id
        ), status: 'true',
      },
    },
    {
      $lookup: {
        from: "onboardings",
        localField: "EmpCognitoID",
        foreignField: "EmpCognitoID",
        as: "onBoardingDetails",
      },
    },
  ]);
  const abc = await Employee.populate(emp, { path: "Employee" });

  res.json(abc)
};

module.exports.getOneEmployeeWithOnBoarding = async (req, res) => {
  const emp = await Employee.aggregate([
    {
      $match: {
        organisation_id: new mongoose.Types.ObjectId(
          req.params.organisation_id
        ),
        status: 'true',
        EmpCognitoID: req.params.EmpCognitoID
      },
    },
    {
      $lookup: {
        from: "onboardings",
        localField: "EmpCognitoID",
        foreignField: "EmpCognitoID",
        as: "onBoardingDetails",
      },
    },
  ]);
  const abc = await Employee.populate(emp, { path: "Employee" });

  res.json(abc);
};

//this function create for Get Employee list by organisation_id with onboarding details
module.exports.getAllEmployee = async function (req, res) {
  const emp = await Employee.aggregate([
    {
      $match: {
        organisation_id: new mongoose.Types.ObjectId(
          req.params.organisation_id
        )
      },
    },
    {
      $lookup: {
        from: "clients",
        localField: "client_id",
        foreignField: "_id",
        as: "clientsdetails",
      },
    },
    {
      $lookup: {
        from: "onboardings",
        localField: "EmpCognitoID",
        foreignField: "EmpCognitoID",
        as: "onBoardingDetails",
      },
    },
    {
      $lookup: {
        from: "Organisation",
        localField: "_id",
        foreignField: "organisation_id",
        as: "OrganisationDetails",
      },
    },
    { $sort: { createdAt: -1, posts: 1 } },
  ]);
  const employee = await Employee.populate(emp, { path: "Employee" });

  res.json(employee);
};

module.exports.getAllEmployeeByreportingManager = async function (req, res) {
  Employee.aggregate([
    {
      $match: {
        reporting_manager_id: req.params.emp_id, organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id), status: 'true'
      },
    },
  ]).exec(async function (err, employee) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(employee);
    }
  });
};
//For Cascade Update after delete
module.exports.cascadeUpdateAfterDeletion = function (req, res) {
  let setData;

  if (req.params.searchType == "zone_id") {
    setData = {
      zone_id: null,
      zone_name: null,
    };
  } else if (req.params.searchType == "division_id") {
    setData = {
      division_id: null,
      division_name: null,
    };
  } else if (req.params.searchType == "department_id") {
    setData = {
      department_id: null,
      department_name: null,
    };
  } else if (req.params.searchType == "designation_id") {
    setData = {
      designation_id: null,
      designation_name: null,
    };
  }

  Employee.updateMany(
    { [req.params.searchType]: req.params.searchId },
    { $set: setData }
  ).exec(function (err, doc) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(doc);
    }
  });
};

//To Get Employee Service anniversary based on organisationId 

module.exports.getEmployeeServiceAnniversary = function (req, res) {
  let currentDate = new Date();
  function formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate();
    year = "" + d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (year.length < 2) year = "0" + year;

    return [month, day].join("-");
  }
  md = formatDate(currentDate);
  console.log("date find", md);
  Employee.find({
       joining_date: { $regex: md } ,
       joining_date: { $regex: `^((?!${year}).)` } ,
       organisation_id: req.params.organisation_id 
  }).exec(function (err, employee) {
    if (err) {
      console.log("Error in finching employee Details");
      res.status(500).json(err);
    } else {
      
      console.log("Found employee ", employee.length);
      res.status(200).json(employee);
    }
  });
};

//To Get Employee details based on  organisationId for anniversary

module.exports.getEmployeeAnniversary = function (req, res) {
  let currentDate = new Date();
  function formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day].join("-");
  }
  md = formatDate(currentDate);

  Onboarding.aggregate([
    {
      $match: { organisation_id: req.params.organisation_id },
    },
    {
      $lookup: {
        from: "employees",
        localField: "EmpCognitoID",
        foreignField: "EmpCognitoID",
        as: "employeedetails",
      },
    },
    {
      $match: { anniversary_Date: { $regex: md } },
    },
  ]).exec(function (err, employee) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(employee);
    }
  });
};

module.exports.getRoleIdForMenu = function (req, res) {
  Employee.findOne(
    { EmpCognitoID: req.params.EmpCognitoID },
    { roleId: 1 }
  ).exec(function (err, employee) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(employee);
    }
  });
};

//use in userRights Module
module.exports.getEmpByOrgIdWithUserRight = async function (req, res) {
  const emp = await Employee.aggregate([
    { $match: { organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id), } },
    {
      $lookup: {
        from: "orgspocs",
        localField: "organisation_id",
        foreignField: "organisation_id",
        as: "orgname"
      }
    }
  ]).exec(async function (err, employee) {
    if (err) {
      console.log("Error finding Employee");
      res.status(500).json(err);
    } else {
      res.status(200).json(employee);
    }
  })
}

module.exports.getOrgSpocsRightsByOrgId = async function (req, res) {
  const emp = await OrgSpocs.aggregate([
    { $match: { EmpCognitoID: req.params.EmpCognitoID } },
    {
      $lookup: {
        from: "Employee",
        localField: "organisation_id",
        foreignField: "organisation_id",
        as: "orgname"
      }
    }
  ]).exec(async function (err, employee) {
    if (err) {
      console.log("Error finding Employee");
      res.status(500).json(err);
    } else {
      res.status(200).json(employee);
    }
  })
}

//use in userRights Module
module.exports.getEmpByOrgIdWithUserRight = async function (req, res) {
  const emp = await Employee.aggregate([
    { $match: { organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id), } },
    {
      $lookup: {
        from: "orgspocs",
        localField: "organisation_id",
        foreignField: "organisation_id",
        as: "orgname"
      }
    }
  ]).exec(async function (err, employee) {
    if (err) {
      console.log("Error finding Employee");
      res.status(500).json(err);
    } else {
      res.status(200).json(employee);
    }
  })
}

module.exports.getOrgSpocsRightsByOrgId = async function (req, res) {
  const emp = await OrgSpocs.aggregate([
    { $match: { EmpCognitoID: req.params.EmpCognitoID } },
    {
      $lookup: {
        from: "Employee",
        localField: "organisation_id",
        foreignField: "organisation_id",
        as: "orgname"
      }
    }
  ]).exec(async function (err, employee) {
    if (err) {
      console.log("Error finding Employee");
      res.status(500).json(err);
    } else {
      res.status(200).json(employee);
    }
  })
}

module.exports.employeeBulkUpdate = async function (req, res) {

  let errorlist = []
  let count = []
  req.body.data.forEach(async(d) => {

        if (err) {
          errorlist.push(err)
        }
        else {
          let employee = await Employee.findOne({ employee_email: d.employee_email })

          if (!employee) {
            count.push(d.employee_email)
          }

          employee.name = d.name == null ? employee.name : d.name,
            employee.m_name = d.m_name == null ? employee.m_name : d.m_name,
            employee.emp_id = d.emp_id == null ? employee.emp_id : d.emp_id,
            employee.l_name = d.l_name == null ? employee.l_name : d.l_name,
            employee.employee_gender = d.employee_gender == null ? employee.employee_gender : d.employee_gender,
            employee.dob = d.dob == 'null' ? employee.dob : d.dob,
            employee.phone_number = d.phone_number == null ? employee.phone_number : d.phone_number,
            employee.employee_pan = d.employee_pan == null ? employee.employee_pan : d.employee_pan,
            employee.adhaar = d.adhaar == null ? employee.adhaar : d.adhaar,
            employee.joining_date = d.joining_date == 'null' ? employee.joining_date : d.joining_date,
            employee.blood_group = d.blood_group == null ? employee.blood_group : d.blood_group,
            employee.driving_license = d.driving_license == null ? employee.driving_license : d.driving_license,
            employee.alternate_number = d.alternate_number == null ? employee.alternate_number : d.alternate_number,
            employee.address = d.address == null ? employee.address : d.address,
            employee.country = d.country == null ? employee.country : d.country,
            employee.state = d.state == null ? employee.state : d.state,
            employee.city = d.city == null ? employee.city : d.city,
            employee.employment_type = d.employment_type == null ? employee.employment_type : d.employment_type,
            employee.notice_expiry = d.notice_expiry == null ? employee.notice_expiry : d.notice_expiry,
            employee.probation_duration = d.probation_duration == null ? employee.probation_duration : d.probation_duration,
            employee.probation_type = d.probation_type == null ? employee.probation_type : d.probation_type,
            employee.esic_no = d.esic_no == null ? employee.esic_no : d.esic_no,
            employee.insurance_no = d.insurance_no == null ? employee.insurance_no : d.insurance_no,
            employee.insurance_pf = d.insurance_pf == null ? employee.insurance_pf : d.insurance_pf,
            employee.pf_no = d.pf_no == null ? employee.pf_no : d.pf_no,
            employee.uan_no = d.uan_no == null ? employee.uan_no : d.uan_no,
            employee.pincode = d.pincode == null ? employee.pincode : d.pincode,
            employee.personal_email = d.personal_email == null ? employee.personal_email : d.personal_email,
            employee.confirmation_date = d.confirmation_date == 'null' ? employee.confirmation_date : d.confirmation_date,
            employee.employee_level = d.employee_level == null ? employee.employee_level : d.employee_level,
            employee.reporting_manager_id = d.reporting_manager_email == null ? employee.reporting_manager_id : await getReportingManager(d.reporting_manager_email),
            employee.reporting_manager_name = d.reporting_manager_name == null ? employee.reporting_manager_name : d.reporting_manager_name,
            employee.reporting_manager_email = d.reporting_manager_email == null ? employee.reporting_manager_email : d.reporting_manager_email,
            employee.department_id = d.department_id == null ? employee.department_id : d.department_id,
            employee.department_name = d.department_name == null ? employee.department_name : d.department_name,
            employee.department_code = d.department_code == null ? employee.department_code : d.department_code,
            employee.division_id = d.division_id == null ? employee.division_id : d.division_id,
            employee.division_name = d.division_name == null ? employee.division_name : d.division_name,
            employee.division_code = d.division_code == null ? employee.division_code : d.division_code,
            employee.location_id = d.location_id == null ? employee.location_id : d.location_id,
            employee.location_name = d.location_name == null ? employee.location_name : d.location_name,
            employee.location_code = d.location_code == null ? employee.location_code : d.location_code,
            employee.zone_id = d.zone_id == null ? employee.zone_id : d.zone_id,
            employee.zone_name = d.zone_name == null ? employee.zone_name : d.zone_name,
            employee.zone_code = d.zone_code == null ? employee.zone_code : d.zone_code,
            employee.designation_id = d.designation_id == null ? employee.designation_id : d.designation_id,
            employee.designation_name = d.designation_name == null ? employee.designation_name : d.designation_name,
            employee.designation_code = d.designation_code == null ? employee.designation_code : d.designation_code,
            employee.client_id = d.client_id == null ? employee.client_id : d.client_id,
            employee.client_name = d.client_name == null ? employee.client_name : d.client_name,
            employee.client_code = d.client_code == null ? employee.client_code : d.client_code
          employee.roleId = d.roleId == null ? employee.roleId : d.roleId,
            employee.save(function (err, result) {

              if (err) {
                err.push(err)
                count.push(err)
              }

              else {
                count.push(result)
              }

              if (req.body.data.length <= 1) {
                res.json({ err, count })
              }

              if (req.body.data.length == count.length + 1) {
                setTimeout(() => {
                  res.json({ err, count })
                }, 100);
              }

            })


        }

  })

}