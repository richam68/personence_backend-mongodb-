const mongoose = require("mongoose");

/**
 * Employee Leave Details Schema
 * @private
 */
const empLeaveDetailSchema = new mongoose.Schema(
  {
    // leave_id: {
    //   type: String,
    // },
    leaveType_id: {
      type: String,
    },
    pendingLeave: {
      type: Number,
    },
    totalLeave: {
      type: Number,
    },
    lastLeaveAmount: {
      type: String,
    },
    lastLeaveAmountDate: {
      type: String,
    },
    employeeId: {
      type: String
    },
    organisation_id:{
      type:String
    },
    color:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef empLeaveDetail
 */
module.exports = mongoose.model("empLeaveDetail", empLeaveDetailSchema);
