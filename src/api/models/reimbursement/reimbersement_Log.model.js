// const { Mongoose } = require("mongoose")

const mongoose = require("mongoose")

const reimbursemet_Log = new mongoose.Schema({
    rembursment_id: {
        type: String
    },
    rembursment_log_id: {
        type: String
    },
    // employee_id: {
    //     type: String,
    //     required: true
    // },
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
    log_id: {
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
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("reimbursemet_Log", reimbursemet_Log);