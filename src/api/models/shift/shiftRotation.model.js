const mongoose = require('mongoose');

/**
 * Shift All Schema
 * @private
 */
const shiftRotationSchema = new mongoose.Schema({
   
    client_id: {
        type: String
    },
    scheduleName: {
        type: String,
    },
    scheduleFrequency: {
        type: String,
    },
    scheduleRotate: {
        type: String,
    },
    notify: {
        type:String,
    },
    zone: {
        type: Array,
    },
    department: {
        type: Array,
    },
    location: {
        type: Array,
    },
    designation: {
        type: Array,
    },
    division: {
        type: Array,
    }


},
    {
        timestamps: true,
    });

/**
 * @typedef ShiftRotationSchema
 */
module.exports = mongoose.model('shiftRotation', shiftRotationSchema);
