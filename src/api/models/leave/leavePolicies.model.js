const mongoose = require('mongoose');



const leavePoliciesSchema = new mongoose.Schema({
  // leavePolicyId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   unique: true,
  //   trim: true,
  //   lowercase: true,
  // },
  clientID: {
    type: String,
  },
  weekendBetweenLP: {
    type: String,
  },
  holidayBetweenLP: {
    type: String,
  },
  countAfterDaysW: {
    type: String,
  },
  countAfterDaysH: {
    type: String,
  },


  employeeList: [
    {
      type: String
    }
  ],
  name: {
    type: String
  },
  code: {
    type: String
  },
  description: {
    type: String
  },
  validityFrom: {
    type: String
  },
  validityTo: {
    type: String
  },
  minLeave: {
    type: String
  },
  maxLeave: {
    type: String
  },
  enableFileUpload: {
    type: String
  },
  unitDays: {
    type: String
  },
  typePaid: {
    String
  },
  allowRequestForPastDate: {
    type: String
  },
  effectiveAfterType: {
    type: String
  },
  dateOfJoining: {
    type: String
  },
  prorateAccuralType: {
    type: String
  },
  totalNoOfLeaveInYear: {
    type: String
  },
  startingMonth: {
    type: String
  },
  accural: {
    type: String
  },
  reset: {
    type: String
  },
  carryForword: {
    type: String
  },
  isMin: {
    type: String
  },
  color: {
    type: String
  }

}, {
  timestamps: true,
});

/**
 * @typedef LeavePolicies
 */
module.exports = mongoose.model('LeavePolicies', leavePoliciesSchema);
