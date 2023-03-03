// var mongoose = require('mongoose');
const Calender = require('../../models/shift/calender.model');

//Get AttendancePolicies list

//Get Single AttendancePolicies 

module.exports.getCalender = function (req, res) {
    Calender.find({ organisation_id: req.params.organisation_id }).sort({ _id: 1 }).exec(function (
      err,
      calender
    ) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(calender);
      }
    });
  };





// module.exports.shiftRotationUpdateOne = function (req, res) {
//     var shiftRotationId = req.params.shiftRotationId;
//     

//     ShiftRotation
//         .findById(shiftRotationId)
//         .select(" ")
//         .exec(function (err, doc) {
//             var response = {
//                 status: 200,
//                 message: doc
//             }


//             if (err) {
//                 
//                 response.status = 500;
//                 response.message = err;
//             } else if (!doc) {
//                 res
//                 response.status = 404;
//                 response.message = {
//                     "message": "shift ID not found"
//                 };
//             }
//             if (response.status !== 200) {
//                 res
//                     .status(response.status)
//                     .json(response.message);
//             } else {
//                 //Update columns like this here
//                 doc.client_id = req.body.client_id;
//                 //    doc.trainNo = parseInt(req.body.trainNo);
//                 doc.scheduleName = req.body.scheduleName;
//                 doc.scheduleFrequency = req.body.scheduleFrequency;
//                 doc.scheduleRotate = req.body.scheduleRotate;
//                 doc.notify = req.body.notify;
                
//                 doc.zone = req.body.zone;
//                 doc.department = req.body.department;
//                 doc.location = req.body.location;
//                 doc.designation = req.body.designation;
//                 doc.division = req.body.division;
//                 // doc.mobileInOut = req.body.mobileInOut;
//                 doc.save(function (err, shiftRotationUpdated) {
//                     if (err) {
//                         res
//                             .status(500)
//                             .json(err);

//                     } else {
//                         res
//                             .status(204)
//                             .json();

//                     }
//                 });
//             }
//         });
// };




