const mongoose = require('mongoose');

/**
 * Leave Types Schema
 * @private
 */
const leaveTypesSchema = new mongoose.Schema({

  organisation_id: {
    type: String
  },
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
    type: Number
  },
  maxLeave: {
    type: Number
  },
  enableFileUpload: {
    type: String
  },
  unitDays: {
    type: String
  },
  allowRequestForFutureDate: {
    type: Number
  },
  typePaid: {
   type: String
  },
  allowRequestForPastDate: {
    type: Number
  },
  effectiveAfter: {
    type: Number
  },
  effectiveFrom: {
    type: String
  },
  prorateAccuralType: {
    type: String
  },
  totalNoOfLeaveInYear: {
    type: Number
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
 * @typedef LeaveTypes
 */
module.exports = mongoose.model('LeaveTypes', leaveTypesSchema);
