// var mongoose = require('mongoose');
const Penalty = require('../../models/attendance/penalty.model');

//Get OvertimePolicies list
module.exports.getAllPenalty = function (req, res) {
   
    Penalty
        .find()
        // .skip(offset)
        // .limit(count)
        .exec(function (err, penalty) {
            if (err) {
                
                res
                    .status(500)
                    .json(err);
            } else {
                
                res
                    .json(penalty);
            }
        });

};

//Get Penality list using client id
module.exports.getAllByClientId = function (req, res) {
    Penalty
    .find({ client_id: req.params.client_id })
    .exec(function (err, penality) {

    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(penality);
    }
  });
};

//Get Single  Penalty 
module.exports.getOnePenalty = function (req, res) {
    var _id = req.params.penaltyId;
    

    Penalty
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
                    "message": "penaltyId ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });

};

//Add a new PenaltyId 
module.exports.penaltyAddOne = function (req, res) {
    
    Penalty
        .create({
            client_id: req.body.client_id,
            name: req.body.name,
            startDate: req.body.startDate,
            attachWorkingShifts: req.body.attachWorkingShifts,
            description: req.body.description,
            latePunchInShowView: req.body.latePunchInShowView,
            earlyPunchOut: req.body.earlyPunchOut,
            absentPenaltyOverWeekOff: req.body.absentPenaltyOverWeekOff,
            absentPenaltyOverHolidays: req.body.absentPenaltyOverHolidays,
            autoPunchOutPolicy: req.body.autoPunchOutPolicy,


        }, 
        function (err, penalty) {
            if (err) {
                
                res
                    .status(400)
                    .json(err);
            } else {
                
                res
                    .status(201)
                    .json(penalty);
            }
        });
};


module.exports.penaltyUpdateOne = function (req, res) {
    var penaltyId = req.params.penaltyId;
    

    Penalty
        .findById(penaltyId)
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
                    "message": "penalty ID not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                //Update columns like this here
                doc.client_id = req.body.client_id;
                doc.name = req.body.name;
                doc.startDate = req.body.startDate;
                doc.attachWorkingShifts = req.body.attachWorkingShifts;
                doc.description = req.body.description;
                doc.latePunchIn = req.body.latePunchIn;
                doc.earlyPunchOut = req.body.earlyPunchOut;
                doc.absentPenaltyOverWeekOff = req.body.absentPenaltyOverWeekOff;
                doc.absentPenaltyOverHolidays = req.body.absentPenaltyOverHolidays;
                doc.autoPunchOutPolicy = req.body.autoPunchOutPolicy;

                doc.save(function (err, penaltyUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);

                    } else {
                        res
                            .status(204)
                            .json(penaltyUpdated);

                    }
                });
            }
        });
};


module.exports.penaltyDeleteOne = function (req, res) {
    var penaltyId = req.params.penaltyId;

    Penalty
        .findByIdAndRemove(penaltyId)
        .exec(function (err, penalty) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                var message = {
                    "message": "penalty Details Deleted"
                };
                
                res
                    .status(204)
                    .json(message);
            }
        });
};

