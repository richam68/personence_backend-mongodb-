const onBoarding = require("../../models/employee/onBoarding.model");
const Employee = require("../../models/employee/employee.model");

//Create Employee
//Do check create api
module.exports.onboardingAddOne = function (req, res) {
  


  onBoarding.create({
    EmpCognitoID: req.body.EmpCognitoID,
    empstatus: req.body.empstatus,
    panNumber: req.body.panNumber,
    pan_imgUrl: req.body.pan_imgUrl,
    aadharNumber: req.body.aadharNumber,
    aadhar_imgUrl: req.body.aadhar_imgUrl,
    passportNumber: req.body.passportNumber,
    passport_imgUrl: req.body.passport_imgUrl,
    father_fName: req.body.father_fName,
    father_sName: req.body.father_sName,
    father_lName: req.body.father_lName,
    mother_fName: req.body.mother_fName,
    mother_sName: req.body.mother_sName,
    mother_lName: req.body.mother_lName,
    maritalStatus: req.body.maritalStatus,
    spouseName: req.body.spouseName,
    anniversary_Date: req.body.anniversary_Date,
    NO_ofchildren: req.body.NO_ofchildren,
    ChildrenDetail: req.body.ChildrenDetail,
    nominee: req.body.nominee,
    nominee_dob: req.body.nominee_dob,
    relationship: req.body.relationship,
    bankName: req.body.bankName,
    accountNumber: req.body.accountNumber,
    ifscCode: req.body.ifscCode,
    cheque_imgUrl: req.body.cheque_imgUrl,
    hobbies: req.body.hobbies,
    sports: req.body.sports
  },
    function (err, onBoarding) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(onBoarding);
      }
    });
};

// module.exports.onboardingAddOne = function (req, res) {
//   

//   onBoarding.find({EmpCognitoID: req.body.EmpCognitoID},
//     function (err, employee) {
//       if (err) {
//         
//         res.status(400).json(err);
//       } else {
//         
//         res.status(201).json(employee);
//         
//         if(employee.EmpCognitoID != null || employee.EmpCognitoID != undefined){
//           onBoarding.find({ EmpCognitoID: EmpCognitoID })
//     .exec(function (err, doc) {
//       var response = {
//         status: 200,
//         message: doc,
//       };

//       if (err) {
//         
//         response.status = 500;
//         response.message = err;
//       } else if (!doc) {
//         res;
//         response.status = 404;
//         response.message = {
//           message: "EmpCognitoID not found",
//         };
//       }
//       if (response.status !== 200) {
//         res.status(response.status).json(response.message);
//       } else {
//         doc.name = req.body.name;
//         doc.emp_id = req.body.emp_id;
        
//         doc.empstatus= req.body.empstatus,
//         doc.panNumber= req.body.panNumber,
//         doc.pan_imgUrl= req.body.pan_imgUrl,
//         doc.aadharNumber= req.body.aadharNumber,
//         doc.aadhar_imgUrl= req.body.aadhar_imgUrl,
//         doc.passportNumber= req.body.passportNumber,
//         doc.passport_imgUrl= req.body.passport_imgUrl,
//         doc.father_fName= req.body.father_fName,
//         doc.father_sName= req.body.father_sName,
//         doc.father_lName= req.body.father_lName,
//         doc.mother_fName= req.body.mother_fName,
//         doc.mother_sName= req.body.mother_sName,
//         doc.mother_lName= req.body.mother_lName,
//         doc.maritalStatus= req.body.maritalStatus,
//         doc.spouseName= req.body.spouseName,
//         doc.anniversary_Date= req.body.anniversary_Date
//         doc.NO_ofchildren= req.body.NO_ofchildren,
//         doc.ChildrenDetail= req.body.ChildrenDetail,
//         doc.nominee= req.body.nominee,
//         doc.dob= req.body.dob,
//         doc.relationship= req.body.relationship,
//         doc.bankName= req.body.bankName,
//         doc.accountNumber= req.body.accountNumber,
//         doc.ifscCode= req.body.ifscCode,
//         doc.cheque_imgUrl= req.body.cheque_imgUrl,
//         doc.hobbies= req.body.hobbies,
//         doc.sports= req.body.sports

//         doc.save(function (err, employeeUpdated) {
//           if (err) {
//             res.status(500).json(err);
//           } else {
//             res.status(204).json();
//           }
//         });
//       }
//     });
//         }
//         else{
//           onBoarding.create({
//             EmpCognitoID: req.body.EmpCognitoID,
//             empstatus: req.body.empstatus,
//             panNumber: req.body.panNumber,
//             pan_imgUrl: req.body.pan_imgUrl,
//             aadharNumber: req.body.aadharNumber,
//             aadhar_imgUrl: req.body.aadhar_imgUrl,
//             passportNumber: req.body.passportNumber,
//             passport_imgUrl: req.body.passport_imgUrl,
//             father_fName: req.body.father_fName,
//             father_sName: req.body.father_sName,
//             father_lName: req.body.father_lName,
//             mother_fName: req.body.mother_fName,
//             mother_sName: req.body.mother_sName,
//             mother_lName: req.body.mother_lName,
//             maritalStatus: req.body.maritalStatus,
//             spouseName: req.body.spouseName,
//             anniversary_Date: req.body.anniversary_Date,
//             NO_ofchildren: req.body.NO_ofchildren,
//             ChildrenDetail: req.body.ChildrenDetail,
//             nominee: req.body.nominee,
//             dob: req.body.dob,
//             relationship: req.body.relationship,
//             bankName: req.body.bankName,
//             accountNumber: req.body.accountNumber,
//             ifscCode: req.body.ifscCode,
//             cheque_imgUrl: req.body.cheque_imgUrl,
//             hobbies: req.body.hobbies,
//             sports: req.body.sports
//           },
//             function (err, onBoarding) {
//               if (err) {
//                 
//                 res.status(400).json(err);
//               } else {
//                 
//                 res.status(201).json(onBoarding);
//               }
//             });
//         }
//       }
//     })
//     // onBoarding.create({
//     //   EmpCognitoID: req.body.EmpCognitoID,
//     //   empstatus: req.body.empstatus,
//     //   panNumber: req.body.panNumber,
//     //   pan_imgUrl: req.body.pan_imgUrl,
//     //   aadharNumber: req.body.aadharNumber,
//     //   aadhar_imgUrl: req.body.aadhar_imgUrl,
//     //   passportNumber: req.body.passportNumber,
//     //   passport_imgUrl: req.body.passport_imgUrl,
//     //   father_fName: req.body.father_fName,
//     //   father_sName: req.body.father_sName,
//     //   father_lName: req.body.father_lName,
//     //   mother_fName: req.body.mother_fName,
//     //   mother_sName: req.body.mother_sName,
//     //   mother_lName: req.body.mother_lName,
//     //   maritalStatus: req.body.maritalStatus,
//     //   spouseName: req.body.spouseName,
//     //   anniversary_Date: req.body.anniversary_Date,
//     //   NO_ofchildren: req.body.NO_ofchildren,
//     //   ChildrenDetail: req.body.ChildrenDetail,
//     //   nominee: req.body.nominee,
//     //   dob: req.body.dob,
//     //   relationship: req.body.relationship,
//     //   bankName: req.body.bankName,
//     //   accountNumber: req.body.accountNumber,
//     //   ifscCode: req.body.ifscCode,
//     //   cheque_imgUrl: req.body.cheque_imgUrl,
//     //   hobbies: req.body.hobbies,
//     //   sports: req.body.sports
//     // },
//     //   function (err, onBoarding) {
//     //     if (err) {
//     //       
//     //       res.status(400).json(err);
//     //     } else {
//     //       
//     //       res.status(201).json(onBoarding);
//     //     }
//     //   });
// };


module.exports.getAllOnboarding = function (req, res) {
  onBoarding.find({ organisation_id: req.params.organisation_id, EmpCognitoID: req.params.EmpCognitoID }).exec(function (
    err,
    onBoarding
  ) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(onBoarding);
    }
  });
};

module.exports.getOneboardingByEmpCognitoID = function (req, res) {
  var EmpCognitoID = req.params.EmpCognitoID;
  

  onBoarding.find({ EmpCognitoID: EmpCognitoID }).exec(function (err, doc) {
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

module.exports.updateonboardingByEmpCognitoID = function (req, res) {
  //var EmpCognitoID = req.body.EmpCognitoID;
  var _id = req.body._id
  

  onBoarding.findById({_id})
    .select(" ")
    .exec(function (err, doc) {
      var response = {
        status: 200,
        message: doc,
      };

      if (err) {
        
        response.status = 500;
        response.message = err;
      } 
       else {
        
        doc.empstatus= req.body.empstatus;
        doc.panNumber= req.body.panNumber;
        doc.pan_imgUrl= req.body.pan_imgUrl;
        doc.aadharNumber= req.body.aadharNumber;
        doc.aadhar_imgUrl= req.body.aadhar_imgUrl;
        doc.passportNumber= req.body.passportNumber;
        doc.passport_imgUrl= req.body.passport_imgUrl;
        doc.father_fName= req.body.father_fName;
        doc.father_sName= req.body.father_sName;
        doc.father_lName= req.body.father_lName;
        doc.mother_fName= req.body.mother_fName;
        doc.mother_sName= req.body.mother_sName;
        doc.mother_lName= req.body.mother_lName;
        doc.maritalStatus= req.body.maritalStatus;
        doc.spouseName= req.body.spouseName;
        doc.anniversary_Date= req.body.anniversary_Date
        doc.NO_ofchildren= req.body.NO_ofchildren;
        doc.ChildrenDetail= req.body.ChildrenDetail;
        doc.nominee= req.body.nominee;
        doc.nominee_dob= req.body.nominee_dob;
        doc.relationship= req.body.relationship;
        doc.bankName= req.body.bankName;
        doc.accountNumber= req.body.accountNumber;
        doc.ifscCode= req.body.ifscCode;
        doc.cheque_imgUrl= req.body.cheque_imgUrl;
        doc.hobbies= req.body.hobbies;
        doc.sports= req.body.sports;

        doc.save(function (err, employeeUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            Employee.find({EmpCognitoID:req.body.EmpCognitoID})
            .exec((err,result)=>{
              if(err){
                
              }
              else{

                
                result[0].status=req.body.empstatus
                result[0].save()
              }
            })
            res.status(204).json();
          }
        });
      }
    });
};

module.exports.onBoardingDeleteOne = function (req, res) {
  var _id = req.params.id;

  onBoarding
    .findByIdAndRemove(_id)
    .exec(function (err, client) {
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        res
          .status(204)
          .json();
      }
    });
};
