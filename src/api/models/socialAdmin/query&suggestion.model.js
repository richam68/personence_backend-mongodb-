const mongoose = require("mongoose");

const queryandsuggestion = new mongoose.Schema(
    {
        organisation_id:{
            type: String,
        },
        employeeId:{
            type: String,
        },
        file:{
            type: Array,
        },
        description :{
            type: String,
        },
        

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Queryandsuggestion', queryandsuggestion);