const mongoose = require("mongoose");

/**
 * Employee Most Used Application Model
 * @private
 */
const empMostUsedWebsiteSchema = new mongoose.Schema(
  {
      websiteName: {
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
 * @typedef EmpMostUsedWebsite
 */
module.exports = mongoose.model("EmpMostUsedWebsite", empMostUsedWebsiteSchema);
