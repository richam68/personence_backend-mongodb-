const mongoose = require("mongoose");

/**
 * Department Schema
 * @private
 */
const departmentSchema = new mongoose.Schema(
  {
    //For Associatrion
    // clientId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Client',
    //   // required: true,
    // },
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
 * @typedef department
 */
module.exports = mongoose.model("Department", departmentSchema);
