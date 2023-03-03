// var mongoose = require('mongoose');
const Rights = require('../../models/rights/rights.model');

//Get AttendancePolicies list
module.exports.getAllRights = function (req, res) {
    var offset = 0;
    var count = 5;
    var maxCount = 10;

    
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

    Rights
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, rights) {
            if (err) {
                
                res
                    .status(500)
                    .json(err);
            } else {
                
                res
                    .json(rights);
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
module.exports.rightsAddOne = function (req, res) {
    
    Rights   
        .create({
            roleId: req.body.roleId,
            modules_id: req.body.modules_id,
            rightName: req.body.rightName,
            
        }, function (err, rights) {
            if (err) {
                
                res
                    .status(400)
                    .json(err);
            } else {
                
                res
                    .status(201)
                    .json(rights);
            }
        });
};

//update one
module.exports.rightsUpdateOne = function (req, res) {
    var rightsId = req.params.rightsId;
    

    Rights
        .findById(rightsId)
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
                    "message": "Rights ID not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                //Update columns like this here
                  
                   doc.roleId = req.body.roleId;
                   doc.modules_id = req.body.modules_id;
                   doc.rightName = req.body.rightName;

                doc.save(function (err, rightsUpdated) {
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


module.exports.rightsDeleteOne = function (req, res) {
    var rightsId = req.params.rightsId;

    Rights
        .findByIdAndRemove(rightsId)
        .exec(function (err, rights) {
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

