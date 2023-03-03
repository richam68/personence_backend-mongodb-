// attributes:
const mongoose = require("mongoose");
// const { stringify } = require('uuid');

/**
 * Event List
 * @private
 */
const eventList = new mongoose.Schema(
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
    organisation_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef EventList
 */
module.exports = mongoose.model("EventList", eventList);
