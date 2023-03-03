const mongoose = require("mongoose");

/**
 * User Rights Schema
 * @private
 */
const userRightsSchema = new mongoose.Schema(
  {
    org_email: {
      type: String,
    },
    mobile_number: {
      type: String,
    },
    name: {
      type: String,
    },
    no_of_employee: {
      type: String,
    },
    org_country: {
      type: String,
    },
    user_name: {
      type: String,
    },
    EmpCognitoID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef userRights
 */
module.exports = mongoose.model("userRights", userRightsSchema);
