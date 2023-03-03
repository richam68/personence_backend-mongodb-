const mongoose = require("mongoose");

/**
 * Branch Schema
 * @private
 */
const branchSchema = new mongoose.Schema(
  {
   
    branch_code: {
      type: String,
    },
    branch_name: {
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
 * @typedef branch
 */
module.exports = mongoose.model("Branch", branchSchema);
