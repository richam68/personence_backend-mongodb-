const mongoose = require('mongoose');

const reimbursementLevel = new mongoose.Schema({
        businessUnit: {
            type: String,
        },
        levelofApproval: { 
            type: Number,
        },
        employeeId: {
            type: String,
        },  
        employeeName: {
            type: String,
        },
        firstApprover: {
            type: String,
        },
        secondApprover: {
            type: String,
        },
        thirdApprover: {
            type: String,
        },
        fourthApprover: {
            type: String,
        },
        firstApproverId: {
            type: String,
        },
        secondApproverId: {
            type: String,
        },
        thirdApproverId: {

            type: String,
        },
        fourthApproverId: {
            type: String,
        },
        organisation_id: {
            type: String,
        },
    }
    ,{
            timestamps: true,
        }
    ); 
module.exports = mongoose.model('reimbursementLevel', reimbursementLevel);