const TravelExpenselog = require('../../models/travelExpense/travelExpense_Log.model');
const mongoose = require("mongoose");

//To Create Reimburstment 
module.exports.createTravelExpenselog = async function (req, res) {
    TravelExpenselog.create({
        travelExpense_id: req.body.travelExpense_id,
        employee_id: req.body.employee_id,
        organisation_id: req.body.organisation_id,
        client_id: req.body.client_id,
        submition_date: req.body.submition_date,
        total_amount: req.body.total_amount,
        expense_claim_type: req.body.expense_claim_type,
        status: req.body.status,
        description: req.body.description,
        trip_name: req.body.trip_name,
        purpose: req.body.purpose,
        travelDate_from: req.body.travelDate_from,
        travelDate_To: req.body.travelDate_To,
        location_from: req.body.location_from,
        locatione_To: req.body.locatione_To,
        managerRemarkone: req.body.managerRemarkone,
        managerRemarktwo: req.body.managerRemarktwo,
        managerRemarkthreee: req.body.managerRemarkthreee,
        managerRemarkfour: req.body.managerRemarkfour,
        logAdd: req.body.logAdd,

    }, function (err, travelExpenselog) {
        if (err) {
            console.log("Error in Creating travelExpenselog");
            res.status(500).json(err);
        }
        else {
            console.log("travelExpenselog Created Succesfully");
            res.status(201).json(travelExpenselog);
        }
    });
};

// To get All rembursment 
module.exports.getTravelExpenseLog = async function (req, res) {
    TravelExpenselog.find().exec(function (err, travelExpenselog) {
        if (err) {
            console.log("Error in Getting travelExpenselog");
            res.status(500).json(err);
        }
        else {
            console.log("Found travelExpenselog : ", travelExpenselog.lenght);
            res.status(200).json(travelExpenselog);
        }
    })
}

