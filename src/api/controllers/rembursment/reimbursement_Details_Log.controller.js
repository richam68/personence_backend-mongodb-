const rembursmentDetails_Log = require('../../models/reimbursement/reimbersement_Details_log.model');
const mongoose = require('mongoose');

//To Create RembursmentDetails 
module.exports.createRembursmentDetailsLog = async function (req, res) {
    rembursmentDetails_Log.insertMany(req.body,
        function (err, rembursmentDetails_log) {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
                console.log("Found Rembursments", rembursmentDetails_log.length);
                res.status(201).json(rembursmentDetails_log);
            }
        });
};

//To get Rembursment details
// module.exports.getRembursmentDetailsLog = async function (req, res) {
//     rembursmentDetails_Log.find().exec(function (err, rembursmentDetails_log) {
//         if (err) {
//             console.log(err);
//             res.status(500).json(err);
//         }
//         else {
//             console.log("Found Rembursments Details total : ", rembursmentDetails_log.length);
//             res.status(200).json(rembursmentDetails_log);
//         }
//     })
// }

module.exports.getRembursmentDetailsLog = function (req, res) {
    // var rembursment_id = req.body.rembursment_id;
    var rembursment_id = req.params.rembursment_id;
    // var date = req.params.date;


    rembursmentDetails_Log.aggregate([
        {
            $match: { rembursment_id: rembursment_id }
        },
        {
            $group: {
                _id: "$rembursment_log_id",
                travelExpenseDetailslog: {
                    $push: "$$ROOT"
                }
            }
        }
    ])

        .exec(function (err, rembursmentDetails_log) {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
              
                console.log("Found Rembursments Details total : ", rembursmentDetails_log.length);
                // res.status(200).json(rembursmentDetails_log);
                res.status(200).json(rembursmentDetails_log);
            }

        });

};

// module.exports.getRembursmentDetailsLog = async function (req, res) {
//     rembursmentDetails_Log.find().exec(function (err, rembursmentDetails_log) {
//         if (err) {
//             console.log(err);
//             res.status(500).json(err);
//         }
//         else {
//             console.log("Found Rembursments Details total : ", rembursmentDetails_log.length);
//             res.status(200).json(rembursmentDetails_log);
//         }
//     })
// }

// Module to update reimbursment
// module.exports.updateRembursmentDetails = function (req, res) {
//     let _id = req.params._id;
//     console.log("rembursmentDetailsId", _id);
//     rembursmentDetails_Log.findById({ _id: req.params._id })
//         .select(" ")
//         .exec(function (err, docs) {
//             var response = {
//                 status: 200,
//                 message: docs,
//             };
//             if (err) {
//                 console.log("Error finding Rembursment Details");
//                 res.status = 500;
//                 response.message = err;
//             } else if (!docs) {
//                 res;
//                 response.status = 404;
//                 response.message = {
//                     message: "Rembursment Details not found"
//                 };
//             }
//             if (response.status !== 200) {
//                 res.status(response.status).json(response.message);
//             } else {
//                 docs.client_id = req.body.client_id;
//                 docs.emp_id = req.body.emp_id;
//                 docs.organisation_id = req.body.organisation_id;
//                 docs.rembursment_id = req.body.rembursment_id;
//                 docs.rembursment_detail_id = req.body.rembursment_detail_id;
//                 docs.bill_date = req.body.bill_date;
//                 docs.select_claim_type = req.body.select_claim_type;
//                 docs.remark = req.body.remark;
//                 docs.amount = req.body.amount;
//                 docs.attachment = req.body.attachment;
//                 docs.save(function (err, rembursmentDetailsUpdated) {
//                     if (err) {
//                         res.status(500).json('code error',err);
//                     } else {
//                         res.status(204).json(rembursmentDetailsUpdated);
//                     }
//                 });
//             }
//         });
// }

