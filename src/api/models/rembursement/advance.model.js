const mongoose = require("mongoose");

/**
 * Address Schema
 * @private
 */
const advanceReimbursementSchema = new mongoose.Schema(
  {
    //For Associatrion
    // clientId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Client',
    //   // required: true,
    // },
    advance_type: {
      type: String,
    },
    trvlFromDate: {
      type: String,
    },
    trvltoDate: {
      type: String,
    },
    locnFrom: {
      type: String,
    },
    locnTo: {
      type: String,
    },
    amount: {
      type: String,
    },
    description: {
      type: String,
    },
    billdate: {
      type: String,
    },
    claimtype: {
      type: String,
    },
    tripname: {
      type: String,
    },
    purpose: {
      type: String,
    },
    organisation_id: {
      type: String,
    },
    client_id: {
      type: String,
    },
    employeeId: {
      type: String
    },
    travelId:{
      type: String
    },
    eventImgUrls: {           
      type: Array,
    },
    remark:{
      type: String
    },
    status: {
      type: String
    },

  },
  {
    timestamps: true,
  }
);

/**
 * @typedef address
 */
module.exports = mongoose.model("advanceReimbursement", advanceReimbursementSchema);
