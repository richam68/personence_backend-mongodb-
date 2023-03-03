// attributes:
const mongoose = require("mongoose");
// const { stringify } = require('uuid');

/**
 * Quick Pool
 * @private
 */
const quickPool = new mongoose.Schema(
  {
    // employeeId: {
    //   type: String,
    // },
    endDate: {
      type: String,
    },
    endTime: {
      type: String,
    },
    question: {
      type: String,
    },

    // option1: {
    //   type: Array,
    // },

    option1: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: { type: String },
      count: { type: Number },
    },
    option2: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: { type: String },
      count: { type: Number },
    },
    option3: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: { type: String },
      count: { type: Number },
    },
    option4: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: { type: String },
      count: { type: Number },
    },

    visible: {
      type: Boolean,
      default: false,
    },

    organisation_id: {
      type: String,
    },

    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef QuickPool
 */
module.exports = mongoose.model("QuickPool", quickPool);
