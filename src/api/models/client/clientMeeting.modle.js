const mongoose = require('mongoose');
/**
 * Client Meeting Schema
 * 
 */

const clientMeetingSchema = new mongoose.Schema({
    date:{type:String},
    timeIn:{type:String},
    timeOut : {type:String},
    locationInLatLong : {
        latitude: { type: String },
        longitude: { type: String }
    },
    locationIn:{type:Array},
    locationOutLatLong : {
        latitude: { type: String },
        longitude: { type: String }
    },
    locationOut:{type:Array},
    imgUrlIn:{type:String},
    imgUrlOut:{type:String},
    client_name:{type:String},
    prospect_name:{type:String},
    contactPersonName:{type:String},
    minutesOfTheMeeting:{type:String},
    organisation_id: {type: String},
    employee_id : {type:String}


},
{
    timestamps:true
});

module.exports = mongoose.model('ClientMeeting',clientMeetingSchema);