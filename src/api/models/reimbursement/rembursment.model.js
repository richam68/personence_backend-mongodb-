const mongoose = require('mongoose')

const createRembursment = new mongoose.Schema(
    {

        rembursment_id: {
            type: String
        },
        employee_id: {
            type: String,
            required: true
        },
        employee: {
            type: String,
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
        noticeFile: {
            type: String,
        },
        noticePdf: {
            type: String,
        },
        coupon_no: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("createRembursment", createRembursment);