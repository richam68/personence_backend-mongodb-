const mongoose = require('mongoose');

/**
 * ClientList Schema
 * @private
 */
const clientListSchema = new mongoose.Schema({
  status: {
    type: String
  },
  client_name: {
    type: String,
  },
  client_id: {
    type: String,
  },
  client_image: {
    type: String
  },
  client_code: {
    type: String
  },
  address1: {
    type: String
  },
  line_2: {
    type: String
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  phone_number: {
    type: String
  },
  mobile_number: {
    type: String
  },
  email: {
    type: String
  },

  website: {
    type: String
  },
  pan: {
    type: String
  },
  tan: {
    type: String
  },
  gstin: {
    type: String
  },
  industry: {
    type: String
  },
  organisation_id: {
    type: String
  },
  contact_person: [
    {
      name: {
        type: String,
      },
      designation: {
        type: String,
      },
      mobile_no: {
        type: String,
      },
      emailId: {
        type: String,
      },
      department: {
        type: String,
      },
      client_id:{
        type: String
      }, 
      dob: {
        type: String
      },
      anniversary: {
        type: String
      },
    },
  ],

}, {
  timestamps: true
});


/**
 * @typedef ClientList
 */
module.exports = mongoose.model('ClientList', clientListSchema);
