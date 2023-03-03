const mongoose = require("mongoose");

/**
 * Employee Leave Request Schema
 * @private
 */
const empLeaveRequestSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String
    },

    leaveType_id: {
      type: String,
    },
  //   leaveType: {
  //     leaveType_id: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: 'leaveTypes'
  //     },
  //     name: { type: String }
  // },
    leaveReqDateTime: {
      type: String,
    },
    comments: {
      type: String,
    },
    fromDate: {
      type: String,
    },
    toDate: {
      type: String,
    },
    noOfLeaveRequest: {
      type: Number
    },
    // leaveRequestedByEmp_Id: {
    //   type: String
    // },
    // noOfWorkingHour: {
    //   type: String,
    // },
    isApproved: {
      type: String
    },
    approvedByEmp_id: {
      type: String
    },
    approvalDateTime: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdDateTime: {
      type: String
    },
    modifyBy: {
      type: String
    },
    modifyDateTime: {
      type: String
    },
    isPlanned: {
      type: String
    },
    status: {
      type: String
    },
    
    totalDay:{
      type:String
    },

    organisation_id:{
      type:String
    },

    empLeaveDetailId:{
      type:String
    },
    remark:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef empLeaveRequest
 */
module.exports = mongoose.model("empLeaveRequest", empLeaveRequestSchema);
