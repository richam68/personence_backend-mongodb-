const RembursmentLog = require('../../models/reimbursement/reimbersement_Log.model');
const mongoose = require("mongoose");

//To Create Reimburstment 
module.exports.createRembursmentlog = async function (req, res) {
    RembursmentLog.create({
        rembursment_id: req.body.rembursment_id,
        // log_id: req.body.log_id,
        employee_id: req.body.employee_id,
        organisation_id: req.body.organisation_id,
        client_id: req.body.client_id,
        submition_date: req.body.submition_date,
        total_amount: req.body.total_amount,
        expense_claim_type: req.body.expense_claim_type,
        description: req.body.description,
        managerRemarkone: req.body.managerRemarkone,
        managerRemarktwo: req.body.managerRemarktwo,
        managerRemarkthreee: req.body.managerRemarkthreee,
        managerRemarkfour: req.body.managerRemarkfour,
    }, function (err, rembursmentlog) {
        if (err) {
            console.log("Error in Creating rembursmentlog");
            res.status(500).json(err);
        }
        else {
            console.log("Reimburstment Created Succesfully");
            res.status(201).json(rembursmentlog);
        }
    });
};

// To get All rembursment 
module.exports.getRembursmentlog = async function (req, res) {
    RembursmentLog.find().exec(function (err, rembursmentlog) {
        if (err) {
            console.log("Error in Getting Rembursment");
            res.status(500).json(err);
        }
        else {
            console.log("Found Rembursment : ", rembursmentlog.lenght);
            res.status(200).json(rembursmentlog);
        }
    })
}

