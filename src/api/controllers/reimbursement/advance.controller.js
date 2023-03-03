const Reimbursement = require("../../models/rembursement/advance.model");
var mongoose = require('mongoose');

////////

// module.exports.getreimbursementData = async function (req, res) {

//     Reimbursement.aggregate([
//       {
//         $match: {
//           organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id),
//           client_id: new mongoose.Types.ObjectId(req.params.client_id),
//           // createdAt :
//           // {
//           //   $gte : new Date(fromdate),
//           //   $lte : new Date(todate)
//           // }

//         }
//       },
//       {
//         $group: {
//           _id: "$organisation_id",
//           count: { $sum: 1 }
//         },
//       },
//     ])
//       .exec(function (err, empdata) {
//         if (err) {

//           res.status(500).json(err);
//         } else {

//           res.status(200).json(empdata);
//         }
//       });
//   };


module.exports.getreimbursementData = function (req, res) {

  // var employeeId = req.params.employeeId;
  var organisation_id = req.params.organisation_id;
  // var client_id = req.params.client_id;

  // Reimbursement.find({ employeeId: employeeId, client_id: client_id,organisation_id: organisation_id })
  Reimbursement.find({ organisation_id: organisation_id })

    .exec(function (err, reimbursement) {
      if (err) {

        res.status(500).json(err);
      }
      else {

        res.json(reimbursement);
      }
    });
};

//   post of reimburesement
module.exports.createReimburesement = function (req, res) {

  Reimbursement
    .create({
      advance_type: req.body.advance_type,
      trvlFromDate: req.body.trvlFromDate,
      trvltoDate: req.body.trvltoDate,
      locnFrom: req.body.locnFrom,
      locnTo: req.body.locnTo,
      amount: req.body.amount,
      description: req.body.description,
      status: req.body.status,
      coupon_no: req.body.coupon_no,

      // client_id: req.body.client_id,
      // employeeId: req.body.employeeId,
      organisation_id: req.body.organisation_id,
    },
      function (err, reimbursement) {
        if (err) {

          res
            .status(400)
            .json(err);
        } else {

          res
            .status(201)
            .json(reimbursement);
        }
      });
};


//  post controller of other advance 
module.exports.getOtherAdvance = function (req, res) {

  // var employeeId = req.params.employeeId;
  var organisation_id = req.params.organisation_id;
  // var client_id = req.params.client_id;

  // Reimbursement.find({ employeeId: employeeId, client_id: client_id,organisation_id: organisation_id })
  Reimbursement.find({ organisation_id: organisation_id })

    .exec(function (err, reimbursement) {
      if (err) {

        res.status(500).json(err);
      }
      else {

        res.json(reimbursement);
      }
    });
};



// post comtroller of other advance
module.exports.createOtherAdvance = function (req, res) {

  Reimbursement
    .create({
      advance_type: req.body.advance_type,
      amount: req.body.amount,
      description: req.body.description,
      status: req.body.status,
      organisation_id: req.body.organisation_id,

    },
      function (err, reimbursement) {
        if (err) {

          res
            .status(400)
            .json(err);
        } else {

          res
            .status(201)
            .json(reimbursement);
        }
      });
};

// controller of Expence Claim

// get Controller of petty expence Claim

//   module.exports.getPettExpenceClaim = function (req, res) {

//     var employeeId = req.params.employeeId;
//     var organisation_id = req.params.organisation_id;
//     // var client_id = req.params.client_id;

//     Reimbursement.find({organisation_id: organisation_id,employeeId:employeeId })
//       .exec(function (err, reimbursement) {
//         if (err) {

//           res.status(500).json(err);
//         }
//         else {

//           res.json(reimbursement);
//         }
//       });
//   };




// // Post Controller of petty expence Claim
//   module.exports.createPettExpenceClaim = function (req, res) {

//     Reimbursement
//       .create({
//         billdate: req.body.billdate,
//         claimtype: req.body.claimtype,
//         amount: req.body.amount,
//         description: req.body.description,
//         // client_id: req.body.client_id,
//         employeeId: req.body.employeeId,
//         organisation_id: req.body.organisation_id,
//         eventImgUrls:req.body.eventImgUrls,

//       },
//         function (err, reimbursement) {
//           if (err) {

//             res
//               .status(400)
//               .json(err);
//           } else {

//             res
//               .status(201)
//               .json(reimbursement);
//           }
//         });
//   };


//   // controller of travel Expence


//   // get controller of travel expence
//   module.exports.getExpncClmTrvlExpnc = function (req, res) {

//     // var employeeId = req.params.employeeId;
//     var organisation_id = req.params.organisation_id;
//     // var client_id = req.params.client_id;

//     Reimbursement.find({ organisation_id: organisation_id })
//       .exec(function (err, reimbursement) {
//         if (err) {

//           res.status(500).json(err);
//         }
//         else {

//           res.json(reimbursement);
//         }
//       });
//   };

// //   post of ExpncClmTrvlExpnc
// module.exports.createExpncClmTrvlExpnc = function (req, res) {

//     Reimbursement
//       .create({
//         tripname: req.body.tripname,
//         purpose: req.body.purpose,
//         trvlFromDate: req.body.trvlFromDate,
//         trvltoomDate: req.body.trvltoomDate,
//         locnFrom: req.body.locnFrom,
//         locnTo: req.body.locnTo,
//         billdate: req.body.billdate,
//         claimtype: req.body.claimtype,
//         amount: req.body.amount,
//         description: req.body.description,
//         // client_id: req.body.client_id,
//         // employeeId: req.body.employeeId,
//         organisation_id: req.body.organisation_id,
//       },
//         function (err, reimbursement) {
//           if (err) {

//             res
//               .status(400)
//               .json(err);
//           } else {

//             res
//               .status(201)
//               .json(reimbursement);
//           }
//         });
//   };

// //delete
module.exports.travelAdvanceDeleteOne = function (req, res) {
  var travelId = req.params.travelId;

  Reimbursement.findByIdAndRemove(travelId).exec(function (err, reimbursement) {
    if (err) {
      res.status(404).json(err);
    } else {

      res.status(204).json();
    }
  });
};


// // update 



module.exports.travelAdvanceUpdateOne = function (req, res) {
  var travelId = req.params.travelId;
  Reimbursement.findById(travelId)
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
          message: "travelId ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update field like this

        doc.advance_type = req.body.advance_type,
          doc.trvlFromDate = req.body.trvlFromDate,
          doc.trvltoomDate = req.body.trvltoomDate,
          doc.locnFrom = req.body.locnFrom,
          doc.locnTo = req.body.locnTo,
          doc.amount = req.body.amount,
          doc.description = req.body.description,
          doc.remark = req.body.remark,
          doc.status = req.body.status,

          // doc.name = req.body.name;
          // doc.organisation_id = req.body.organisation_id;

          doc.save(function (err, reimbursement) {
            if (err) {
              res.status(500).json(err);
            } else {
              res.status(204).json(message = "updated success");
            }
          });
      }
    });
};
