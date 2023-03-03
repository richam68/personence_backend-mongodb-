// var mongoose = require('mongoose');
const LeaveTypes = require('../../models/leave/leaveTypes.model');

//Get LeaveTypess list
module.exports.getAllLeaveTypes = function (req, res) {
    LeaveTypes
        .find()
        .exec(function (err, leaveTypes) {
            if (err) {
                
                res
                    .status(500)
                    .json(err);
            } else {
                
                res
                    .json(leaveTypes);
            }
        });

};
// this api used for getting leave type by employee
module.exports.getLeaveTypes = function (req, res) {
    LeaveTypes.find({ employeeList: req.params.employeeId })
        .exec(function (err, leaveTypes) {
            if (err) {

                res
                    .status(500)
                    .json(err);
            } else {

                res
                    .json(leaveTypes);
            }
        });

}

module.exports.getAllLeavesClientId = function (req, res) {
    LeaveTypes
        .find({ client_id: req.params.client_id })
        
        .exec(function (err, leaveTypes) {
            if (err) {
                
                res
                    .status(500)
                    .json(err);
            } else {
                
                res
                     .json(leaveTypes);

            }
        });

};















//Get Single LeaveTypes 
module.exports.getOneLeaveTypes = function (req, res) {
    var leaveTypesId = req.params.leaveTypesId;
    //var client_id = req.params.client_id;
    

    LeaveTypes
        .findById(leaveTypesId)
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
                    "message": "leaveTypesId ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });

};

//Add a new LeaveTypesId 
module.exports.leaveTypesAddOne = function (req, res) {
    
    LeaveTypes   
        .create({
            client_id: req.body.client_id,
            name: req.body.name,
            icon: req.body.icon,
            code: req.body.code,
            description: req.body.description,
            unitDays: req.body.unitDays,
            typePaid: req.body.typePaid,
            validityFrom: req.body.validityFrom,
            validityTo: req.body.validityTo,
            allowRequestForPastDate: req.body.allowRequestForPastDate,
            allowRequestForFutureDate: req.body.allowRequestForFutureDate,
            minLeave: req.body.minLeave,
            maxLeave: req.body.maxLeave,
            enableFileUpload: req.body.enableFileUpload,
            effectiveAfterType: req.body.effectiveAfterType,
            dateOfJoining: req.body.dateOfJoining,
            prorateAccuralType: req.body.prorateAccuralType,
            totalNoOfLeaveInYear: req.body.totalNoOfLeaveInYear,
            startingMonth: req.body.startingMonth,
            accural: req.body.accural,
            reset: req.body.reset,
            carryForward: req.body.carryForward,
            zone: req.body.zone,
            department: req.body.department,
            location: req.body.location,
            role: req.body.role,
            status: req.body.status,

        }, function (err, leaveTypes) {
            if (err) {
                
                res
                    .status(400)
                    .json(err);
            } else {
                
                res
                    .status(201)
                    .json(leaveTypes);
            }
        });
};


module.exports.leaveTypesUpdateOne = function (req, res) {
    var leaveTypesId = req.params.leaveTypesId;
    

    LeaveTypes
        .findById(leaveTypesId)
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
                    "message": "Train ID not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                //Update columns like this here
                doc.client_id = req.body.client_id;
                doc.name= req.body.name;
                doc.icon= req.body.icon;
                doc.code= req.body.code;
                doc.description= req.body.description;
                doc.unitDays= req.body.unitDays;
                doc.typePaid= req.body.typePaid;
                doc.validityFrom= req.body.validityFrom;
                doc.validityTo= req.body.validityTo;
                doc.allowRequestForPastDate= req.body.allowRequestForPastDate;
                doc.allowRequestForFutureDate= req.body.allowRequestForFutureDate;
                doc.minLeave= req.body.minLeave;
                doc.maxLeave= req.body.maxLeave;
                doc.enableFileUpload= req.body.enableFileUpload;
                doc.effectiveAfterType= req.body.effectiveAfterType;
                doc.dateOfJoining= req.body.dateOfJoining;
                doc.prorateAccuralType= req.body.prorateAccuralType;
                doc.totalNoOfLeaveInYear= req.body.totalNoOfLeaveInYear;
                doc.startingMonth= req.body.startingMonth;
                doc.accural= req.body.accural;
                doc.reset= req.body.reset;
                doc.carryForward= req.body.carryForward;
                doc.zone= req.body.zone;
                doc.department= req.body.department;
                doc.location= req.body.location;
                doc.role= req.body.role;
                doc.status= req.body.status;

                doc.save(function (err, leaveTypesUpdated) {
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


module.exports.leaveTypesDeleteOne = function (req, res) {
    var leaveTypesId = req.params.leaveTypesId;

    LeaveTypes
        .findByIdAndRemove(leaveTypesId)
        .exec(function (err, leaveTypes) {
            if (err) {
                
                res
                    .status(404)
                    .json(err);
            } else {
                
                res
                    .status(204)
                    .json('sucessfully deleted');
            }
        });
};

module.exports.getLeaveTypesByBUID = function (req, res) {
    var client_id = req.params.client_id;
    

    LeaveTypes
        .find({ client_id: client_id })
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
                    "message": " organisationID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });

};
