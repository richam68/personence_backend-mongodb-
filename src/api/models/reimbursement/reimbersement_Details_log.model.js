const mongoose = require('mongoose')

const reimbursement_Details_Log = new mongoose.Schema({
    client_id: {
        type: String
    },
    // emp_id: {
    //     type: String
    // },
    organisation_id: {
        type: String
    },
    rembursment_id: {
        type: String
    },
    rembursment_log_id: {
        type: String
    },
    rembursment_Details_log_id: {
        type: String
    },
    rembursment_detail_id: {
        type: String
    },
    rembursment_detail_log_id: {
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
        type: Number
    },
    attachment: {
        type: String
    },
    noticeFile: {
        type: String,
    },
    noticePdf: {
        type: String,
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("reimbursement_Details_Log", reimbursement_Details_Log);
