const { stubString } = require('lodash');
const mongoose = require('mongoose');

/**
 * Onboarding Schema
 * @private
 */

const onboardingSchema = new mongoose.Schema({
  EmpCognitoID: { type: String },
  organisation_id: { type: String },
  empstatus: { type: String },
  panNumber: { type: String },
  pan_imgUrl: { type: String },
  aadharNumber: { type: String },
  aadhar_imgUrl: { type: String },
  passportNumber: { type: String },
  passport_imgUrl: { type: String },

  father_fName: { type: String },
  father_sName: { type: String },
  father_lName: { type: String },

  mother_fName: { type: String },
  mother_sName: { type: String },
  mother_lName: { type: String },

  maritalStatus: { type: String },
  spouseName: { type: String },
  anniversary_Date: { type: String },
  NO_ofchildren: { type: String },
  ChildrenDetail: [{
    childName: { type: String },
    age: { type: String }
  }],

  nominee: { type: String },
  nominee_dob: { type: String },
  relationship: { type: String },

  bankName: { type: String },
  accountNumber: { type: String },
  ifscCode: { type: String },
  cheque_imgUrl: { type: String },

  hobbies: [],
  sports: [],
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

/**
* @typedef Onboarding
*/
module.exports = mongoose.model('Onboarding', onboardingSchema);
