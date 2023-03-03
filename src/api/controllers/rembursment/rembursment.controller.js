const Rembursment = require('../../models/reimbursement/rembursment.model');
const mongoose = require("mongoose");

//To Create Reimburstment 
module.exports.createRembursment = async function (req, res) {
    Rembursment.create({
        rembursment_id: req.body.rembursment_id,
        employee_id: req.body.employee_id,
        employee: req.body.employee,
        organisation_id: req.body.organisation_id,
        client_id: req.body.client_id,
        submition_date: req.body.submition_date,
        total_amount: req.body.total_amount,
        expense_claim_type: req.body.expense_claim_type,
        status: req.body.status,
        coupon_no: req.body.coupon_no,
        
        description: req.body.description
    }, function (err, rembursment) {
        if (err) {
            console.log("Error in Creating Rembursment");
            res.status(500).json(err);
        }
        else {
            console.log("Reimburstment Created Succesfully");
            res.status(201).json(rembursment);
        }
    });
};

// To get All rembursment 
module.exports.getRembursment = async function (req, res) {
    Rembursment.find().exec(function (err, rembursment) {
        if (err) {
            console.log("Error in Getting Rembursment");
            res.status(500).json(err);
        }
        else {
            console.log("Found Rembursment : ", rembursment.lenght);
            res.status(200).json(rembursment);
        }
    })
}

// update Api

module.exports.updateRembursment = async function (req, res) {
    var rembursment_id = req.params.rembursment_id;
    Rembursment.findById(rembursment_id).select(" ").exec(function (err, doc) {
        var response = {
            status: 200,
            message: doc,
        };

        if (err) {

            response.status = 500;
            response.message = err;
        } else if (!doc) {
            res;
            response.status = 404;
            response.message = {
                message: "rembursement_id ID not found",
            };
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            doc.submition_date = req.body.submition_date,
                doc.total_amount = req.body.total_amount,
                doc.description = req.body.description,
                doc.status = req.body.status,
                doc.managerRemarkone= req.body.managerRemarkone,
                doc.managerRemarktwo= req.body.managerRemarktwo,
                doc.managerRemarkthreee= req.body.managerRemarkthreee,
                doc.managerRemarkfour= req.body.managerRemarkfour,


            doc.save(function (err, rembursment) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(rembursment);
                }
            });
        }
    })
}
