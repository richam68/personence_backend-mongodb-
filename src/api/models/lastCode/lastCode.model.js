const mongoose = require("mongoose");

/**
 * Last Code Schema
 * @private
 */
const lastCodeSchema = new mongoose.Schema(
  {
    departmentLastCode: {
      type: Number,
      default: 0
    },
    empLastCode: {
      type: Number,
      default: 0
    },
    divisionLastCode: {
      type: Number,
      default: 0
    },
    zoneLastCode: {
      type: Number,
      default: 0
    },
    branchLastCode: {
      type: Number,
      default: 0
    },
    designationLastCode: {
      type: Number,
      default: 0
    },
    locationLastCode:{
      type: Number,
      default: 0
    },
    organisation_id: {
      type: String
    }
  },
  {
    timestamps: true,

  }
);

/**
 * @typedef lastCode
 */
module.exports = mongoose.model("lastCode", lastCodeSchema);
