const mongoose = require("mongoose");

/**
 * Employee Most Used Application Model
 * @private
 */
const empMostUsedApplicationSchema = new mongoose.Schema(
  {
      applicationName: {
        type: String,
      },
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
      duration: {
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
 * @typedef EmpMostUsedApplication
 */
module.exports = mongoose.model("EmpMostUsedApplication", empMostUsedApplicationSchema);
