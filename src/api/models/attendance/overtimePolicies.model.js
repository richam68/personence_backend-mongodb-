const mongoose = require("mongoose");

/**
 * Overtime Policies Schema
 * @private
 */
const overtimePoliciesSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
    },

    //policyid
    //shiftid
    policy_id: {
      type: String,
    },
    shift_id: {
      type: String,
    },

    shift: {
      type: String,
    },

    calculateOvertime: {
        type: String,
    },

    maximumOvertime: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef OvertimePolicies
 */
module.exports = mongoose.model("OvertimePolicies", overtimePoliciesSchema);
