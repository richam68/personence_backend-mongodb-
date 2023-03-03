// attributes:
const mongoose = require("mongoose");
// const { stringify } = require('uuid');

/**
 * Events
 * @private
 */
const events = new mongoose.Schema(
  {
    date: {
      type: String,
    },
    location: {
      type: String,
    },
    eventHeader: {
      type: String,
    },
    eventSubHeader: {
      type: String,
    },
    eventImgUrls: {
      type: Array,
    },
    eventVideoUrls: {
      type: Array,
    },
    visibility: {
      type: Boolean,
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
 * @typedef Events
 */
module.exports = mongoose.model("Events", events);
