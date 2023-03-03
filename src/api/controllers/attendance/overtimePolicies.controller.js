// var mongoose = require('mongoose');
const OvertimePolicies = require('../../models/attendance/overtimePolicies.model');

//Get OvertimePolicies list
module.exports.getAllOvertimePolicies = function (req, res) {
   
    OvertimePolicies
        .find()
        // .skip(offset)
        // .limit(count)
        .exec(function (err, overtimePolicies) {
            if (err) {
                
                res
                    .status(500)
                    .json(err);
            } else {
                
                res
                    .json(overtimePolicies);
            }
        });

};

//Get OvertimePolicies list using client id
module.exports.getAllByClientId = function (req, res) {
    OvertimePolicies
    .find({ client_id: req.params.client_id })
    .exec(function (err, overtimePolicies) {

    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(overtimePolicies);
    }
  });
};

//Get Single OvertimePolicies 
module.exports.getOneOvertimePolicies = function (req, res) {
    var _id = req.params.overtimePoliciesId;
    

    OvertimePolicies
        .findById(_id)
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
                    "message": "overtimePoliciesId ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });

};

//Add a new OvertimePoliciesId 
module.exports.overtimePoliciesAddOne = function (req, res) {
    
    OvertimePolicies
        .create({
            client_id: req.body.client_id,
            policy_id: req.body.policy_id,
            shift_id: req.body.shift_id,
            calculateOvertime: req.body.notify,
            minimumOvertime: req.body.minimumOvertime,
        }, 
        function (err, overtimePolicies) {
            if (err) {
                
                res
                    .status(400)
                    .json(err);
            } else {
                
                res
                    .status(201)
                    .json(overtimePolicies);
            }
        });
};


module.exports.overtimePoliciesUpdateOne = function (req, res) {
    var overtimePoliciesId = req.params.overtimePoliciesId;
    

    OvertimePolicies
        .findById(overtimePoliciesId)
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
                    "message": "overtimePolicies ID not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                //Update columns like this here
                doc.client_id = req.body.client_id;
                doc. policy_id = req.body. policy_id;
                doc.shift_id = req.body.shift_id;
                doc.calculateOvertime = req.body.calculateOvertime;
                doc.minimumOvertime = req.body.minimumOvertime;
                doc.save(function (err, overtimePoliciesUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);

                    } else {
                        res
                            .status(204)
                            .json(overtimePoliciesUpdated);

                    }
                });
            }
        });
};


module.exports.overtimePoliciesDeleteOne = function (req, res) {
    var overtimePoliciesId = req.params.overtimePoliciesId;

    OvertimePolicies
        .findByIdAndRemove(overtimePoliciesId)
        .exec(function (err, overtimePolicies) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                var message = {
                    "message": "Overtime Policies Details Deleted"
                };
                
                res
                    .status(204)
                    .json(message);
            }
        });
};

