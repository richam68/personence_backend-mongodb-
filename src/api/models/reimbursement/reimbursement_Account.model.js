const mongoose = require('mongoose')

const createRembursmentAccount = new mongoose.Schema(
    {

        account_id: {
            type: String
        },
        date: {
            type: String
        },
        advance_type_for_Report: {
            type: String
        },
        expense_type: {
            type: String
        },
        select_claim_type: {
            type: String
        },
        employee_id: {
            type: String,
            required: true
        },
        organisation_id: {
            type: String,
        },
        opening_balance: {
            type: String,
        },
        closing_balance: {
            type: Number,
        },
        to_date: {
            type: String
        },
        // amount: {
        //     type: String
        // },
        amount: {
            type: Number
        },
        select_claim_type: {
            type: String
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("createRembursmentAccount", createRembursmentAccount);