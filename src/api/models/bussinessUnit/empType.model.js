const mongoose = require("mongoose");

/**
 * EmpType Schema
 * @private
 */
const empTypeSchema = new mongoose.Schema(
  {
    name: {
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
 * @typedef empType
 */
module.exports = mongoose.model("empType", empTypeSchema);
