const mongoose = require("mongoose");

/**
 * Spocs Schema
 * @private
 */
const spocsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    designation: {
      type: String,
    },
    mobile_no: {
      type: String,
    },
    email: {
      type: String,
    },
    department: {
      type: String,
    },
    client_id:{
      type: String
    }, 
    dob: {
      type: String
    },
    anniversary: {
      type: String
    },
    organisation_id: {
       type: mongoose.Schema.Types.ObjectId 
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef spocs
 */
module.exports = mongoose.model("spocs", spocsSchema);
