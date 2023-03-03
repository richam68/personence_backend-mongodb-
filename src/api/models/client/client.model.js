const mongoose = require('mongoose');

/**
 * Client Schema
 * @private
 */
const clientSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId
  }

}, {
  timestamps: true
});


/**
 * @typedef Client
 */
module.exports = mongoose.model('Client', clientSchema);
