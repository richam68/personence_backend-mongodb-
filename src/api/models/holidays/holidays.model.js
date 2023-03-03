const mongoose = require('mongoose');

const holidaysSchema = new mongoose.Schema({
  //For Associatrion
  // clientId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Client',
  //   // required: true,
  // },
  organisation_id: {
    type: String
  },
  client_id: {
    type: String
  },
  name: {
    type: String,
  },
  date: {
    type: String,
  },
  description: {
    type: String,
  },
  reminderDay: {
    type: String,
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
  },
  status: {
    type: Boolean,
  },
  calenderYear: {
    type: String,
  },
  employeeList:[
    {
    type:Array
    }
  ]
},
  {
    timestamps: true,
  }
);



/**
 * @typedef holidays
 */
module.exports = mongoose.model('Holidays', holidaysSchema);
