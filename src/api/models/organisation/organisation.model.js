const mongoose = require('mongoose');

/**
 * Organisation Schema
 * @private
 */
const organisationSchema = new mongoose.Schema({
    organisation_id:{
        type: mongoose.Schema.Types.ObjectId,
        //default: 0,
      },
      name:{
          type:String
      },
      no_of_employee:{
          type:Number
      },
      legal_status:{
        type:String
      },
      gstin:{
        type:String
      },
      incognito_id:{
        type: String,
      },
      org_pan:{
        type: String
      },
      org_logo:{
        type: String
      },
      group_companies:{
        type: String
      },
      mobile_number:{
        type: String
      },
      org_email:{
        type: String
      },
      code:{
        type: String
      },
      address1:{
        type: String
      },
      address2:{
        type: String
      },
      org_city:{
        type: String
      },
      org_state:{
        type: String
      },
      org_pincode:{
        type: String
      },
      org_country:{
        type: String
      }
},
  {
    timestamps: true,
  }
);



/**
 * @typedef Organisation
 */
module.exports = mongoose.model('Organisation', organisationSchema);
