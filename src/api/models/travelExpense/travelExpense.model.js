const mongoose = require('mongoose')

const createTravelExpense = new mongoose.Schema(
    {
        travelExpense_id: {
            type: String
        },
        employee_id: {
            type: String,
            // required: true
        },
        organisation_id: {
            type: String,
        },
        submition_date: {
            type: String,
        },
        total_amount: {
            type: Number,
        },
        description: {
            type: String
        },
        expense_claim_type: {
            type: String
        },
        status: {
            type: String
        },
        client_id: {
            type: String
        },
        trip_name: {
            type: String,
        },
        purpose: {
            type: String,
        },
        travelDate_To: {
            type: String
        },
        travelDate_from: {
            type: String
        },
        location_from: {
            type: String
        },
        locatione_To: {
            type: String
        },
        managerRemarkone: {
            type: String
        },
        managerRemarktwo: {
            type: String
        },
        managerRemarkthreee: {
            type: String
        },
        managerRemarkfour: {
            type: String
        },
        index: {
            type: String
        },
        travelCoupon_code: {
            type: String
        },
        date: {
            type: String
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("createTravelExpense", createTravelExpense);