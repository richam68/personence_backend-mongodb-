const mongoose = require ("mongoose");
const createTravelDetails = new mongoose.Schema(
    {
        client_id : {
            type : String
        },
        employee_id : {
            type : String
        },
        organisation_id : { 
            type : String
        },
        travelExpense_id: {
            type: String
        },
        travelExpense_detail_id: {
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
        attachment : {
            type : String
        },
        index : {
            type : String
        },
    },
    {
        timestamps : true
    }
)
module.exports = mongoose.model("createTravelDetails",createTravelDetails);
