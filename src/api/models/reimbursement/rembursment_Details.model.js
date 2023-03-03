// const mongoose = require ("mongoose");
// const createRembursmentDetails = new mongoose.Schema(
//     {
//         client_id : {
//             type : String
//         },
//         employee_id : {
//             type : String
//         },
//         organisation_id : { 
//             type : String
//         },
//         rembursment_id : {
//             type : String
//         },
//         rembursment_detail_id : {
//             type : String
//         },
//         bill_date : { 
//             type : String
//         },
//         select_claim_type : {
//             type : String 
//         },
//         remark : {
//             type : String
//         },
//         amount : {
//             type : String
//         },
//         attachment : {
//             type : String
//         },
//         _id : {
//             type : String
//         },
//     },
//     {
//         timestamps : true
//     }
// )
// module.exports = mongoose.model("createRembursmentDetails",createRembursmentDetails);






















const mongoose = require("mongoose");
const createRembursmentDetails = new mongoose.Schema(
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
        rembursment_id: {
            type: String
        },
        rembursment_detail_id: {
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
module.exports = mongoose.model("createRembursmentDetails", createRembursmentDetails);
