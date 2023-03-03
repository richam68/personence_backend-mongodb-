const mongoose = require('mongoose');



const locationTrackingSchema = new mongoose.Schema({

  location: {
    latitude: { type: String },
    longitude: { type: String }
},

    datetime: {
        type: String
    },

    employeeId: {
        type: String
    },

    organisation_id:{
        type:String
    },

    address:{
      type:String
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('locationTracking', locationTrackingSchema)
