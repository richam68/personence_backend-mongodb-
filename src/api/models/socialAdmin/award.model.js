// attributes:
const mongoose = require("mongoose");
// const { stringify } = require('uuid');

/**
 * Awards
 * @private
 */
const awards = new mongoose.Schema(
  {
    
    date:{
      type: String,
    },
    
    employeeId: {
      type: String,
    },

    rewardTitle: {
      type: String,
    },
    
    month: {
      type: String,
    },
    organisation_id: {
      type: String,
    },

    designation: {
      type: String,
    },
    name: {
      type: String,
    },
    m_name: {
      type: String,
    },
    l_name: {
      type: String,
    },
    profile_pic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Awards
 */
module.exports = mongoose.model("Awards", awards);
