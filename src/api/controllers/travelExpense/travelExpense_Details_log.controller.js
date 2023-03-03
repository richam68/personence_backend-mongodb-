const travelExpenseDetailslog = require('../../models/travelExpense/travelExpense_Details_Log.model');
const mongoose = require('mongoose');

//To Create RembursmentDetails 
module.exports.createTravelDetailslog = async function (req, res) {
    travelExpenseDetailslog.insertMany(req.body,
        //     {
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
        function (err, travelExpenseDetailslog) {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
                console.log("Found Rembursments", travelExpenseDetailslog.length);
                res.status(201).json(travelExpenseDetailslog);
            }
        });
};

//To get Rembursment details
// module.exports.getTravelExpenseDetailslog = async function(req,res)


// {
//     travelExpenseDetailslog.find().exec(function(err,travelExpenseDetailslog)
//     {
//         if(err)
//         {
//             console.log(err);
//             res.status(500).json(err);
//         }
//         else 
//         {
//             console.log("Found travelExpenseDetailslog Details total : ",travelExpenseDetailslog.length);
//             res.status(200).json(travelExpenseDetailslog);
//         }
//     }) 
// }


module.exports.getTravelExpenseDetailslog = function (req, res) {
    // var rembursment_id = req.body.rembursment_id;
    var travelExpense_id = req.params.travelExpense_id;
    // var date = req.params.date;


    travelExpenseDetailslog.aggregate([
        {
            $match: { travelExpense_id: travelExpense_id }
        },
        {
            $group: {
                _id: "$travelExpense_log_id",
                travelExpenseDetailslog: {
                    $push: "$$ROOT"
                }
            }
        }
    ])

        .exec(function (err, travelExpenseDetailslog) {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
              
                console.log("Found Rembursments Details total : ", travelExpenseDetailslog.length);
                // res.status(200).json(rembursmentDetails_log);
                res.status(200).json(travelExpenseDetailslog);
            }

        });

};

// module.exports.getTravelExpenseDetailslog = async function (req, res) {
//     var travelExpense_detail_id = req.body.travelExpense_detail_id;
//     var travelExpense_log_id = req.body.travelExpense_log_id;

//     travelExpenseDetailslog.find({

//         $and: [{$or: [{travelExpense_detail_id: travelExpense_detail_id}, {travelExpense_log_id: travelExpense_log_id}]}],
//         // $and: [{ travelExpense_detail_id: travelExpense_detail_id },
//         // // { $or: [{travelExpense_log_id: travelExpense_log_id  }]
//         // { travelExpense_log_id: travelExpense_log_id }],
//         // $or: [{ travelExpense_detail_id: travelExpense_detail_id }, { travelExpense_log_id: travelExpense_log_id }]

//     })

//         // travelExpenseDetailslog.aggregate(
//         //     {
//         //         $and: [
//         //           { travelExpense_detail_id: req.body.travelExpense_detail_id },
//         //           { travelExpense_log_id: req.body.travelExpense_log_id },
//         //         ],
//         //       }
//         //     [
//         //   {
//         //     $group: {
//         //       _id: "$travelExpense_log_id",
//         //       travelExpenseDetailslog:{ $push: "$$ROOT"} 
//         //     //   data: { $push: {res } }

//         //     },
//         //   },
//         // ]
//         // )
//         .exec(function (err, travelExpenseDetailslog) {
//             if (err) {

//                 res.status(500).json(err);
//             } else {

//                 res.status(200).json(travelExpenseDetailslog);
//             }
//         });
// };