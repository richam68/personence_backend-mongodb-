const mongoose = require("mongoose");
// const { stringify } = require('uuid');

/**
 * Employee Activity Model
 * @private
 */
const empActivitySchema = new mongoose.Schema(
  {
      eventName: {
        type: String,
      },
      eventDateTime: {
        type: String,
      },
      eventCounting: {
        type: String,
      },
      eventDuration: {
        type: String,
      },
      employeeId: {
        type: String,
      },
      organisation_id: {
        type: String,
      }
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef EmployeeActivity
 */
module.exports = mongoose.model("EmployeeActivity", empActivitySchema);
