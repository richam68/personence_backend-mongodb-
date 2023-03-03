// attributes:

const mongoose = require("mongoose");

/**
 * Notice
 * @private
 */
const noticeSchema = new mongoose.Schema(
  {
    // eventHeader: {
    //   type: Array,
    // },

    eventHeader: {
      type: String,
    },
    noticeFile: {
      type: String,
    },
    noticePdf: {
      type: String,
    },

    // eventHeader: {
    //   type: String,
    // },

    // imageUrl: {
    //   type: Array,
    // },
    date: {
      type: String,
    },

    organisation_id: {
      type: String,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Notice
 */
module.exports = mongoose.model("Notice", noticeSchema);
