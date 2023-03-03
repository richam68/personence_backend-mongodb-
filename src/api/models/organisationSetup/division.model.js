const mongoose = require("mongoose");

/**
 * Division Schema
 * @private
 */
const divisionSchema = new mongoose.Schema(
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
 * @typedef division
 */
module.exports = mongoose.model("Division", divisionSchema);
