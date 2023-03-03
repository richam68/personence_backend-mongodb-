const mongoose = require('mongoose');

/**
 * Shift All Schema
 * @private
 */
const shiftAllSchema = new mongoose.Schema({
    // attendancePolicyId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   unique: true,
    //   trim: true,
    //   lowercase: true,
    // },
    client_id: {
        type: String
    },
    shiftName: {
        type: String,
    },
    shiftTimingTo: {
        type: String,
    },
    shiftTimingFrom: {
        type: String,
    },
    breakTime: {
        type: String,
    },
    shiftMargin: {
        type: String,
    },
    shiftStart: {
        type: String,
    },
    shiftEnd: {
        type: String,
    },
    // minHoursReqForDay: {
    //     type: String,
    // },
    minHoursReqForDay: {
        strictMode: {
            mannualInput: {
                fullDay: {
                    type: String
                },
                halfDay: {
                    type: String
                }
            },
            shiftHours: {
                fullDay: {
                    type: String
                },
                halfDay: {
                    type: String
                }
            }
        },
        lenientMode: {
            mannualInput: {
                perDay: {
                    type: String
                },
                
            },
            shiftHours: {
                perDay: {
                    type: String
                },
                
            }
        }
    },
    weekend: {
        type: String,
    },
    shiftAlowance: {
        type: String,
    },
    ratePerDay: {
        type: String,
    },
    zone: {
        type: String,
    },
    department: {
        type: String,
    },
    location: {
        type: String,
    },
    designation: {
        type: String,
    },
    division: {
        type: String,
    }


},
    {
        timestamps: true,
    });

/**
 * @typedef ShiftAll
 */
module.exports = mongoose.model('ShiftAll', shiftAllSchema);
