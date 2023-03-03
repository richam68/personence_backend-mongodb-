// var mongoose = require('mongoose');
const ShiftRotation = require('../../models/shift/shiftRotation.model');

//Get AttendancePolicies list
module.exports.getAllShiftRotation = function (req, res) {
    var offset = 0;
    var count = 20;
    var maxCount = 50;

    
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

    ShiftRotation
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, shiftRotation) {
            if (err) {
                
                res
                    .status(500)
                    .json(err);
            } else {
                
                res
                    .json(shiftRotation);
            }
        });

};
//Get Single AttendancePolicies 
module.exports.getOneshiftRotation = function (req, res) {
    var shiftRotationId = req.params.shiftRotationId;
    

    ShiftRotation
        .findById(shiftRotationId)
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
                    "message": "shiftRotationId ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });

};

//Add a new AttendancePoliciesId 
module.exports.shiftRotationAddOne = function (req, res) {
    
    ShiftRotation   
        .create({
            client_id: req.body.client_id,
            scheduleName: req.body.scheduleName,
            scheduleFrequency: req.body.scheduleFrequency,
            scheduleRotate: req.body.scheduleRotate,
            notify: req.body.notify,
            zone: req.body.zone,
            department: req.body.department,
            location: req.body.location,
            designation: req.body.designation,
            division: req.body.division,
           
        }, function (err, shiftRotation) {
            if (err) {
                
                res
                    .status(400)
                    .json(err);
            } else {
                
                res
                    .status(201)
                    .json(shiftRotation);
            }
        });
};



module.exports.shiftRotationUpdateOne = function (req, res) {
    var shiftRotationId = req.params.shiftRotationId;
    

    ShiftRotation
        .findById(shiftRotationId)
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
                doc.scheduleName = req.body.scheduleName;
                doc.scheduleFrequency = req.body.scheduleFrequency;
                doc.scheduleRotate = req.body.scheduleRotate;
                doc.notify = req.body.notify;
                
                doc.zone = req.body.zone;
                doc.department = req.body.department;
                doc.location = req.body.location;
                doc.designation = req.body.designation;
                doc.division = req.body.division;
                // doc.mobileInOut = req.body.mobileInOut;
                doc.save(function (err, shiftRotationUpdated) {
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



module.exports.shiftRotationDeleteOne = function (req, res) {
    var shiftRotationId = req.params.shiftRotationId;

    ShiftRotation
        .findByIdAndRemove(shiftRotationId)
        .exec(function (err, shiftRotation) {
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

