// attributes:
const mongoose = require("mongoose");
// const { stringify } = require('uuid');

/**
 * Warm Welcome
 * @private
 */
const warmWelcome = new mongoose.Schema(
  {
    date: {
      type: String,
    },

    employeeId: {
      type: String,
    },

    organisation_id: {
      type: String,
    },

    days: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef WarmWelcome
 */
module.exports = mongoose.model("WarmWelcome", warmWelcome);
