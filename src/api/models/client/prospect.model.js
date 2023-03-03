const mongoose = require('mongoose');
/**
 * Client Meeting prospect Schema
 * 
 */

const clientProspectSchema = new mongoose.Schema({
    status: {
        type: String,
        default: false
      },
      prospect_name: {
        type: String,
      },
      location: {
        type: String,
      },
      contact_number: {
        type: String
      },
      email: {
        type: String
      },
      spoc_person: {
        type: String
      },
      organisation_id: {
        type: String
      },
  
},
{
    timestamps:true
});

module.exports = mongoose.model('Prospect',clientProspectSchema);