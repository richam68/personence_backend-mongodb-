const mongoose = require("mongoose");

const lastPoolDetails = new mongoose.Schema(
    {
        question:{
            type: String,
        },
        question_id:{
            type: String,
        },
        empId:{
            type: String,
        },
        option:{
            type: String,
        },
        organisation_id: {
            type: String,
        },
     
        

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('lastPoolDetails', lastPoolDetails);