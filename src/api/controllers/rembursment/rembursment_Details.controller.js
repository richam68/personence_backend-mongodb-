const rembursmentDetails = require('../../models/reimbursement/rembursment_Details.model');
const Employee = require("../../models/employee/employee.model");
const reimbursementLevelDetails = require('../../models/reimbursement/reimbursmentLevel.model');
const mongoose = require('mongoose');

//To Create RembursmentDetails 
module.exports.createRembursmentDetails = async function (req, res) {
    rembursmentDetails.insertMany(req.body,
        // create({
        //     client_id : req.body.client_id,
        //     emp_id : req.body.emp_id,
        //     organisation_id : req.body.organisation_id,
        //     rembursment_id : req.body.rembursment_id,
        //     rembursment_detail_id : req.body.rembursment_detail_id,
        //     bill_date : req.body.bill_date,
        //     select_claim_type : req.body.select_claim_type,
        //     remark : req.body.remark,
        //     amount  : req.body.amount,
        //     attachment : req.body.attachment
        // },
        function (err, rembursmentDetails) {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
                console.log("Found Rembursments", rembursmentDetails.length);
                res.status(201).json(rembursmentDetails);
            }
        });
};

//To get Rembursment details
module.exports.getRembursmentDetails = async function (req, res) {
    rembursmentDetails.find().exec(function (err, rembursmentDetails) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        else {
            console.log("Found Rembursments Details total : ", rembursmentDetails.length);
            res.status(200).json(rembursmentDetails);
        }
    })
}

// Module to update reimbursment 
module.exports.updateRembursmentDetails = function (req, res) {
    let _id = req.params._id;
    console.log("rembursmentDetailsId", _id);
    rembursmentDetails.findById({ _id: req.params._id })
        .select(" ")
        .exec(function (err, docs) {
            var response = {
                status: 200,
                message: docs,
            };
            if (err) {
                console.log("Error finding Rembursment Details");
                res.status = 500;
                response.message = err;
            } else if (!docs) {
                res;
                response.status = 404;
                response.message = {
                    message: "Rembursment Details not found"
                };
            }
            if (response.status !== 200) {
                res.status(response.status).json(response.message);
            } else {
                // docs.client_id = req.body.client_id;
                // docs.emp_id = req.body.emp_id;
                docs.organisation_id = req.body.organisation_id;
                docs.rembursment_id = req.body.rembursment_id;
                docs.rembursment_detail_id = req.body.rembursment_detail_id;
                docs.bill_date = req.body.bill_date;
                docs.select_claim_type = req.body.select_claim_type;
                docs.remark = req.body.remark;
                docs.amount = req.body.amount;
                docs.attachment = req.body.attachment;
                docs.save(function (err, rembursmentDetailsUpdated) {
                    if (err) {
                        res.status(500).json('code error',err);
                    } else {
                        res.status(204).json(rembursmentDetailsUpdated);
                    }
                });
            }
        });
}

//delete
module.exports.rembursmentDetailsDeleteOne = function (req, res) {
  var rembursment_detail_id = req.params.rembursment_detail_id;

  rembursmentDetails.findByIdAndRemove(rembursment_detail_id ).exec(function (err, rembursmentDetails) {
    if (err) {
      res.status(404).json(err);
    } else {
      
      res.status(204).json();
    }
  });
};

// // Update API

module.exports.updateRembursmentDetails = function (req, res) {
    var rembursment_detail_id = req.params.rembursment_detail_id;
    rembursmentDetails.findById(rembursment_detail_id).select(" ").exec(function (err, doc) {
        var response = {
            status: 200,
            message: doc,
        };
        if(err) {
            response.status = 500;
            response.message = err;
        } else if (!doc) {
            res;
            response.status = 404;
            response.message = {
                message: "rembrusment_detail_id ID not found",
            };
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            doc.bill_date = req.body.bill_date,
        doc.select_claim_type = req.body.select_claim_type,
        doc.remark = req.body.remark,
        doc.amount  = req.body.amount,
        doc.attachment = req.body.attachment

        doc.save(function (err, rembursmentDetails){
                    if (err) {
                      res.status(500).json(err);
                    } else {
                      res.status(204).json(rembursmentDetails);
                    }
                  });
        }
    })
}


// >>>>>>>>>>> Approval Setting Api's <<<<<<<<<<<<<

// get BU wise All Employee

module.exports.getAllEmpByBuId = function (req, res) {
    Employee.aggregate([
      { $match: { organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id), client_id : new mongoose.Types.ObjectId(req.params.Buid) }},
    ]).exec(function (err, employee) {
      if (err) {
        
        res.status(500).json(err);
      } else {
  
  
        res.json(employee);
  
      }
    })
  }

  //this function create for Get Employee list by organisation_id for Select Approver
  
// module.exports.getAllEmployeeForApprover = async function (req, res) {
//   const emp = await Employee.aggregate([
//     {
//       $match: {
//         organisation_id: new mongoose.Types.ObjectId(
//           req.params.organisation_id
//         ), status:'true'
//       },
//     },
//     // {
//     //   $lookup: {
//     //     from: "clients",
//     //     localField: "client_id",
//     //     foreignField: "_id",
//     //     as: "clientsdetails",
//     //   },
//     // },
//     // {
//     //   $lookup: {
//     //     from: "onboardings",
//     //     localField: "EmpCognitoID",
//     //     foreignField: "EmpCognitoID",
//     //     as: "onBoardingDetails",
//     //   },
//     // },
//     // {
//     //   $lookup: {
//     //     from: "Organisation",
//     //     localField: "_id",
//     //     foreignField: "organisation_id",
//     //     as: "OrganisationDetails",
//     //   },
//     // },
//     { $sort: { createdAt: -1, posts: 1 } },
//   ]);
//   const employee = await Employee.populate(emp, { path: "Employee" });

//   res.json(employee);
// };

module.exports.getAllEmployeeForApprover = function (req, res) {
  Employee.aggregate([
    { $match: { organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id), status:'true' }},
  ]).exec(function (err, employee) {
    if (err) {
      
      res.status(500).json(err);
    } else {


      res.json(employee);

    }
  })
}

// To post Reimburstment level details

module.exports.createRembursmentLevelDetails = async function (req,res){
  // reimbursementLevelDetails.create({
  //     businessUnit : req.body.businessUnit,
  //     levelofApproval : req.body.levelofApproval,
  //     employeeId : req.body.employeeId,
  //     employeeName : req.body.employeeName,
  //     firstApprover : req.body.firstApprover,
  //     secondApprover : req.body.secondApprover,
  //     thirdApprover : req.body.thirdApprover,
  //     fourthApprover : req.body.fourthApprover,
  //     firstApproverId : req.body.firstApproverId,
  //     secondApproverId : req.body.secondApproverId,
  //     thirdApproverId : req.body.thirdApproverId,
  //     fourthApproverId : req.body.fourthApproverId,
  //     organisation_id : req.body.organisation_id
  // },function(err,reimbursementLevelDetails)
  reimbursementLevelDetails.insertMany(req.body
    
  ,function(err,reimbursementLevelDetails)
  {
      if(err)
      {
          console.log("Error in Creating Reimburstment Level Details");
          res.status(500).json(err);
      }
      else 
      {
          console.log("Reimburstment Level Details Created Succesfully");
          res.status(201).json(reimbursementLevelDetails);
      }
  })};

// To get All Reimburstment level details
module.exports.getRembursmentLevelDetails = async function(req,res)
{
  reimbursementLevelDetails.find().exec(function(err,reimbursementLevelDetails){
      if(err)
      {
          console.log("Error in Getting Reimburstment Level Details"); 
          res.status(500).json(err);
      }
      else 
      {
          console.log("Found Reimburstment Level Details : " , reimbursementLevelDetails.lenght);
          res.status(200).json(reimbursementLevelDetails);
      }
  })
}

//To Update Reimburstment Level Details
module.exports.updateRembursmentLevelDetails = async function(req,res)
{
  let businessUnit = req.body.businessUnit;
  reimbursementLevelDetails.findById({_id:req.body._id})
  .select(" ")
  .exec(function(err,doc){
      var response = {
          status : 200,
          MessageChannel : doc,
      };
      if(err)
      {
          console.log("Error in Finding Reimburstment Level Details");
          response.status = 500;
          response.message = err;
      }
      else if(!doc)
      {
          console.log("Reimburstment Level Details not Found");
          response.status = 404;
          response.message = {"Message" : "Reimburstment Level Details not Found"};
      }
      if(response.status !== 200)
      {
          res.status(response.status).json(response.message);
      }
      else
      {
          doc.businessUnit = req.body.businessUnit;
          doc.levelofApproval = req.body.levelofApproval;
          doc.employeeId = req.body.employeeId;
          doc.employee_name = req.body.employee_name;
          doc.firstApprover = req.body.firstApprover;
          doc.secondApprover = req.body.secondApprover;
          doc.thirdApprover = req.body.thirdApprover;
          doc.fourthApprover = req.body.fourthApprover;
          doc.firstApproverId = req.body.firstApproverId;
          doc.secondApproverId = req.body.secondApproverId;
          doc.thirdApproverId = req.body.thirdApproverId;
          doc.fourthApproverId = req.body.fourthApproverId;
          doc.organisation_id = req.body.organisation_id;
          doc.save(function(err,updatedRembursmentLevelDetails){
              if(err)
              {
                  console.log("Error in Updating Reimburstment Level Details");
                  res.status(500).json(err);
              }
              else 
              {
                  console.log("Reimburstment Level Details Updated Succesfully");
                  res.status(204).json(updatedRembursmentLevelDetails);
              }
       }) }
      })


}
