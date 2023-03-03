// var mongoose = require('mongoose');
const ShiftAll = require('../../models/shift/shiftAll.model');

//Get AttendancePolicies list
module.exports.getAllShift = function (req, res) {
    var offset = 0;
    var count = 40;
    var maxCount = 90;

    
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }


    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message": "If supplied in querystring count and offset should be a number"
            });
        return;
    }

    if (count > maxCount) {
        res
            .status(400)
            .json({
                "message": "Count limit of " + maxCount + " exceeded"
            });
        return;
    }

    ShiftAll
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, shiftAll) {
            if (err) {
                
                res
                    .status(500)
                    .json(err);
            } else {
                
                res
                    .json(shiftAll);
            }
        });

};
//Get Single AttendancePolicies 
module.exports.getOneShiftAll = function (req, res) {
    var shiftAllId = req.params.shiftAllId;
    

    ShiftAll
        .findById(shiftAllId)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            }


            if (err) {
                
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                res
                response.status = 404;
                response.message = {
                    "message": "shiftAllId ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });

};

//Add a new AttendancePoliciesId 
module.exports.shiftAddOne = function (req, res) {
    
    ShiftAll   
        .create({
            client_id: req.body.client_id,
            shiftName: req.body.shiftName,
            shiftTimingTo: req.body.shiftTimingTo,
            shiftTimingFrom: req.body.shiftTimingFrom,
            breakTime: req.body.breakTime,
            shiftMargin: req.body.shiftmargin,
            shiftStart: req.body.shiftStart,
            shiftEnd: req.body.shiftEnd,
            minHoursReqForDay: req.body.minHoursReqForDay,
            weekend: req.body.weekend,
            shiftAlowance: req.body.shiftAlowance,
            ratePerDay: req.body.ratePerDay,
            zone: req.body.zone,
            department: req.body.department,
            location: req.body.location,
            designation: req.body.designation,
            division: req.body.division,
        }, function (err, shiftAll) {
            if (err) {
                
                res
                    .status(400)
                    .json(err);
            } else {
                
                res
                    .status(201)
                    .json(shiftAll);
            }
        });
};


// module.exports.shiftAllUpdateOne = function (req, res) {
//     var shiftAllId = req.params.shiftAllId;
//     

//     ShiftAll
//         .findById(shiftAllId)
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
//                     "message": "Train ID not found"
//                 };
//             }
//             if (response.status !== 200) {
//                 res
//                     .status(response.status)
//                     .json(response.message);
//             } else {
//                 //Update columns like this here
//                    doc.client_id = req.body.client_id;
//                 //    doc.trainNo = parseInt(req.body.trainNo);
//                 doc.shiftName = req.body.shiftName;
//                 doc.shiftTimingTo = req.body.shiftTimingTo;
//                 doc.shiftTimingFrom = req.body.shiftTimingFrom;
//                 doc.breakTime = req.body.breakTime;
//                 doc.shiftMargin = req.body.shiftMargin;
//                 doc.shiftStart = req.body.shiftStart;
//                 doc.shiftEnd = req.body.shiftEnd;
//                 doc.minHouReqForDay = req.body.minHouReqForDay;
//                 doc.weekend = req.body.weekend;
//                 doc.shiftAlowance = req.body.shiftAlowance;
//                 doc.zone = req.body.zone;
//                 doc.department = req.body.department;
//                 doc.location = req.body.location;
//                 doc.designation = req.body.designation;
//                 doc.division = req.body.division;
//                 // doc.mobileInOut = req.body.mobileInOut;

//                 doc.save(function (err, shiftAllUpdated) {
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


module.exports.shiftAllUpdateOne = function (req, res) {
    var shiftAllId = req.params.shiftAllId;
    

    ShiftAll
        .findById(shiftAllId)
        .select(" ")
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            }


            if (err) {
                
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                res
                response.status = 404;
                response.message = {
                    "message": "shift ID not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                //Update columns like this here
                doc.client_id = req.body.client_id;
                //    doc.trainNo = parseInt(req.body.trainNo);
                doc.shiftName = req.body.shiftName;
                doc.shiftTimingTo = req.body.shiftTimingTo;
                doc.shiftTimingFrom = req.body.shiftTimingFrom;
                doc.breakTime = req.body.breakTime;
                doc.shiftMargin = req.body.shiftMargin;
                doc.shiftStart = req.body.shiftStart;
                doc.shiftEnd = req.body.shiftEnd;
                doc.minHouReqForDay = req.body.minHouReqForDay;
                doc.weekend = req.body.weekend;
                doc.shiftAlowance = req.body.shiftAlowance;
                doc.zone = req.body.zone;
                doc.department = req.body.department;
                doc.location = req.body.location;
                doc.designation = req.body.designation;
                doc.division = req.body.division;
                // doc.mobileInOut = req.body.mobileInOut;
                doc.save(function (err, shiftAllUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);

                    } else {
                        res
                            .status(204)
                            .json();

                    }
                });
            }
        });
};

// module.exports.shiftAllDeleteOne = function (req, res) {
//     var shiftAllId = req.params.shiftAllId;

//     ShiftAll
//         .findByIdAndRemove(shiftAllId)
//         .exec(function (err, shiftAll) {
//             if (err) {
//                 res
//                     .status(404)
//                     .json(err);
//             } else {
//                 
//                 res
//                     .status(204)
//                     .json();
//             }
//         });
// };

module.exports.shiftDeleteOne = function (req, res) {
    var shiftAllId = req.params.shiftAllId;

    ShiftAll
        .findByIdAndRemove(shiftAllId)
        .exec(function (err, shiftAll) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                
                res
                    .status(204)
                    .json("Deleted");
            }
        });
};

// const httpStatus = require('http-status');
// const { omit } = require('lodash');
// const AttendancePolicies = require('../models/attendance/attendancePolicies.model');

// /**
//  * Load user and append to req.
//  * @public
//  */
// exports.load = async (req, res, next, id) => {
//   try {
//     const attendancePolicies = await AttendancePolicies.get(id);
//     req.locals = { attendancePolicies };
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// };

// /**
//  * Get attendancePolicies
//  * @public
//  */
// exports.get = (req, res) => res.json(req.locals.attendancePolicies.transform());

// /**
//  * Get logged in attendancePolicies info
//  * @public
//  */
// exports.loggedIn = (req, res) => res.json(req.attendancePolicies.transform());

// /**
//  * Create new user
//  * @public
//  */
// exports.create = async (req, res, next) => {
//   try {
//     const attendancePolicies = new AttendancePolicies(req.body);
//     const savedAttendancePolicies = await attendancePolicies.save();
//     res.status(httpStatus.CREATED);
//     res.json(savedAttendancePolicies.transform());
//   } catch (error) {
//     next(AttendancePolicies.checkDuplicateEmail(error));
//   }
// };

// /**
//  * Replace existing user
//  * @public
//  */
// exports.replace = async (req, res, next) => {
//   try {
//     const { user } = req.locals;
//     const newUser = new User(req.body);
//     const ommitRole = user.role !== 'admin' ? 'role' : '';
//     const newUserObject = omit(newUser.toObject(), '_id', ommitRole);

//     await user.updateOne(newUserObject, { override: true, upsert: true });
//     const savedUser = await User.findById(user._id);

//     res.json(savedUser.transform());
//   } catch (error) {
//     next(User.checkDuplicateEmail(error));
//   }
// };

// /**
//  * Update existing user
//  * @public
//  */
// // exports.update = (req, res, next) => {
// //   const ommitRole = req.locals.user.role !== 'admin' ? 'role' : '';
// //   const updatedAttendancePolicies = omit(req.body, ommitRole);
// //   const attendancePolicies = Object.assign(req.locals.attendancePolicies, updatedAttendancePolicies);

// //   attendancePolicies.save()
// //     .then((savedAttendancePolicies) => res.json(savedAttendancePolicies.transform()))
// //     .catch((e) => next(AttendancePolicies.checkDuplicateEmail(e)));
// // };

// /**
//  * Get user list
//  * @public
//  */
// exports.list = async (req, res, next) => {
//   try {
//     const attendancePolicies = await AttendancePolicies.list(req.query);
//     const transformedAttendancePolicies = attendancePolicies.map((attendancePolicies) => attendancePolicies.transform());
//     res.json(transformedAttendancePolicies);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Delete user
//  * @public
//  */
// exports.remove = (req, res, next) => {
//   const { attendancePolicies } = req.locals;

//   attendancePolicies.remove()
//     .then(() => res.status(httpStatus.NO_CONTENT).end())
//     .catch((e) => next(e));
// };
