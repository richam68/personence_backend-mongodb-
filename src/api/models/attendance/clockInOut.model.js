const mongoose = require('mongoose');
const { stringify } = require('uuid');

/**
 * Attendance clockin out 
 * @private
 */
const clockInOutSchema = new mongoose.Schema({
    // attId:{
    //     type:String,
    //     autoIncrement: true,
    // },sss
    attType: {
        type: String
    },
    employeeId: {
        type: String
    },
    clockIn: {
        type: String
    },
    clockInLocation: {
        type: Array
    },
    clockInImg: {
        type: String
    },
    clockInOutDate: {
        type: String
    },
    clockInServerTime: {
        type: String
    },
    clockInLatLang: {
        latitude: { type: String },
        longitude: { type: String }
    },
    clockOut: {
        type: String
    },
    clockOutLocation: {
        type: Array
    },
    clockOutImg: {
        type: String
    },
    clockOutServerTime: {
        type: String
    },
    clockOutLatLang: {
        latitude: { type: String },
        longitude: { type: String }
    },
    totalHours: {
        type: Number
    },
    systemId: {
        type: String
    },
    deviceType: {
        type: String
        // use these three values only [WEB, MOBILE, BOTH]
    },
    organisation_id: {
        type: String
    },

    Buid: {
        type: String
    }
},
    {
        timestamps: true,
    }
);




/**
 * @typedef ClockInOut
 */
module.exports = mongoose.model('ClockInOut', clockInOutSchema);
