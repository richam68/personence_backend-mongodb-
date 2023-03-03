const mongoose = require("mongoose");
const createTravelDetailsLog = new mongoose.Schema(
    {
        client_id: {
            type: String
        },
        emp_id: {
            type: String
        },
        organisation_id: {
            type: String
        },
        travelExpense_id: {
            type: String
        },
        travelExpense_log_id: {
            type: String
        },
        travelExpense_detail_id: {
            type: String
        },
        travelExpense_detail_log_id: {
            type: String
        },
        bill_date: {
            type: String
        },
        select_claim_type: {
            type: String
        },
        remark: {
            type: String
        },
        amount: {
            type: String
        },
        attachment: {
            type: String
        },
        logAdd: {
            type: String
        },
        index: {
            type: String
        },
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model("createTravelDetailsLog", createTravelDetailsLog);
