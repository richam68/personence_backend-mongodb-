const mongoose = require("mongoose");

/**
 * attendanceCalendar Schema
 * @private
 */

const attendanceCalendarSchema = ({
    punchIn: {
        type: Number
    },
    punchOut: {
        type: Number
    },
    totalHrs: {
        type: Number
    },
    reasonofLeave: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    id: {
        type: String
    }    

})
/**
 * @typedef attendanceCalender
 */

module.exports = mongoose.model('attendanceCalendar', attendanceCalendarSchema)