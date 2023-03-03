const mongoose = require("mongoose");

/**
 * Designation Schema
 * @private
 */
const designationSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
    },
    code: {
      type: String,
    },
    description: {
      type: String,
    },
    organisation_id: {
      type: String,
    },
   
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef designation
 */
module.exports = mongoose.model("designation", designationSchema);
