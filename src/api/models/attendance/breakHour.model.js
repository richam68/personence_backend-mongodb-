const mongoose = require('mongoose');



const breakHourSchema = new mongoose.Schema({

    attendanceId: {
        type: String
    },

    startTime: {
        type: String
    },

    endTime: {
        type: String
    },

    totalBreakHours: {
        type: Number
    },

    employeeId: {
        type: String
    },

    date:{
        type: String
    },
    organisation_id:{
        type:String
    },
    Buid:{
        type:String
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('BreakHour', breakHourSchema)