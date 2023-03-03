const mongoose = require("mongoose");

const lastpool = new mongoose.Schema(
    {
        date :
        {
            type :String,
        },
        employID :
        {
            type : String,
        },
        checkbox :{
            options : 
            {
                option1: Array,
            }

        },
        month :
        {
            type :String,
        }

    }
)
module.exports = mongoose.model("LastPool",lastpool);