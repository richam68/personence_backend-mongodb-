const mongoose = require("mongoose");

/**
 * Zone Schema
 * @private
 */
const zoneSchema = new mongoose.Schema(
  {
    //For Associatrion
    // clientId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Client',
    //   // required: true,
    // },
    zone_code: {
      type: String,
    },
    zone_name: {
      type: String,
    },
    description: {
      type: String,
    },
    organisation_id: {
      type: String,
    },
    // organisation_id:{
    //   type: String
    // },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef zone
 */
module.exports = mongoose.model("Zone", zoneSchema);
