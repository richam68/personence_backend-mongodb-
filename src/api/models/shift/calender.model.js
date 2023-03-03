const mongoose = require('mongoose');

/**
 * Shift All Schema
 * @private
 */
const calenderSchema = new mongoose.Schema({
    sunday: {
        type: String,
    },
    monday: {
        type: String
    },
    tuesday: {
        type: String
    },
    wednesday: {
        type: String
    },
    thrusday: {
        type: String
    },
    friday: {
        type: String
    },
    saturday: {
        type: String
    },

    days: {
        sunday: {
            fWeek: {
                type: String,
            },
            sWeek: {
                type: String,
            },
            tWeek: {
                type: String,
            },
            foWeek: {
                type: String,
            },
            fiWeek: {
                type: String,
            },
            
        },
        monday: {
            fWeek: {
                type: String,
            },
            sWeek: {
                type: String,
            },
            tWeek: {
                type: String,
            },
            foWeek: {
                type: String,
            },
            fiWeek: {
                type: String,
            },
            
        },
        tuesday: {
            fWeek: {
                type: String,
            },
            sWeek: {
                type: String,
            },
            tWeek: {
                type: String,
            },
            foWeek: {
                type: String,
            },
            fiWeek: {
                type: String,
            },
            
        },
        wednesday: {
            fWeek: {
                type: String,
            },
            sWeek: {
                type: String,
            },
            tWeek: {
                type: String,
            },
            foWeek: {
                type: String,
            },
            fiWeek: {
                type: String,
            },
            
        },
        thrusday: {
            fWeek: {
                type: String,
            },
            sWeek: {
                type: String,
            },
            tWeek: {
                type: String,
            },
            foWeek: {
                type: String,
            },
            fiWeek: {
                type: String,
            },
            
        },
        friday: {
            fWeek: {
                type: String,
            },
            sWeek: {
                type: String,
            },
            tWeek: {
                type: String,
            },
            foWeek: {
                type: String,
            },
            fiWeek: {
                type: String,
            },
            
        },
        saturday: {
            fWeek: {
                type: String,
            },
            sWeek: {
                type: String,
            },
            tWeek: {
                type: String,
            },
            foWeek: {
                type: String,
            },
            fiWeek: {
                type: String,
            },
            
        }
    }

},
    {
        timestamps: true,
    });

/**
 * @typedef ShiftAll
 */
module.exports = mongoose.model('Calender', calenderSchema);
