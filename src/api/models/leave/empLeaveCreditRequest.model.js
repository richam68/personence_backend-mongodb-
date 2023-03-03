const mongoose = require("mongoose");

/**
 * Employee Leave Details Schema
 * @private
 */
const empLeaveCreditRequestSchema = new mongoose.Schema(
  {
    // leave_id: {
    //   type: String,
    // },
    emp_id: {
      type: String,
    },
    leaveType_id: {
      type: String,
    },
    leaveCreditAmount: {
      type: String,
    },
    lastPendingLeaveAmount: {
      type: String,
    },
    lastTotalLeaveAmount: {
      type: String,
    },
    creditedBy: {
      type: String,
    },
  },
  {
    timestamps: {createdAt: 'creditedTime', updatedAt: 'creditedBy'},
  }
);

/**
 * @typedef empLeaveCreditRequest
 */
module.exports = mongoose.model("empLeaveCreditRequest", empLeaveCreditRequestSchema);
