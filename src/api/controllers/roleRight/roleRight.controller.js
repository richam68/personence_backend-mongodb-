// var mongoose = require('mongoose');
const { json } = require('body-parser');
const RoleRight = require('../../models/roleRight/roleRight.model');

//Get AttendancePolicies list
module.exports.getAllRoleRight = function (req, res) {
    
    RoleRight
        .find({ roleId: req.params.roleId })
        .exec(function (err, roleRight) {
            if (err) {
                res
                    .status(500)
                    .json(err);
            } else {
                res
                    .json(roleRight);
            }
        });

};

//Get Single AttendancePolicies 
// module.exports.getOneAttendancePolicies = function (req, res) {
//     var attendancePoliciesId = req.params.attendancePoliciesId;
//     

//     AttendancePolicies
//         .findById(attendancePoliciesId)
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
//                     "message": "attendancePoliciesId ID not found"
//                 };
//             }
//             res
//                 .status(response.status)
//                 .json(response.message);

//         });

// };

//Add a new AttendancePoliciesId 
module.exports.roleRightAddOne = function (req, res) {

    RoleRight
        .create({
            roleId: req.body.roleId,
            modulesId: req.body.modulesId,
            rightId: req.body.rightId,
            create: req.body.create,
            edit: req.body.edit,
            delete: req.body.delete,
            view: req.body.view,

        }, function (err, roleRight) {
            if (err) {

                res
                    .status(400)
                    .json(err);
            } else {

                res
                    .status(201)
                    .json(roleRight);
            }
        });
};

//update one
module.exports.roleRightUpdateOne = function (req, res) {
    var roleRightId = req.params.roleRightId;


    RoleRight
        .findById(roleRightId)
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
                    "message": "roleRight ID not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                //Update columns like this here

                doc.roleId = req.body.roleId;
                doc.modulesId = req.body.modulesId;
                doc.rightId = req.body.rightId;
                doc.create = req.body.create;
                doc.edit = req.body.edit;
                doc.delete = req.body.delete;
                doc.view = req.body.view;

                doc.save(function (err, roleRightUpdated) {
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


module.exports.roleRightDeleteOne = function (req, res) {
    var roleRightId = req.params.roleRightId;

    RoleRight
        .findByIdAndRemove(roleRightId)
        .exec(function (err, roleRight) {
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

