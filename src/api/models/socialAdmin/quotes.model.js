const mongoose = require("mongoose");
// const { stringify } = require('uuid');

/**
 * Social Admin Model
 * @private
 */
const quotesSchema = new mongoose.Schema(
  {
    quoteImageUrl: {
      type: String,
    },
    quoteDescription: {
      type: String,
    },
    date: {
      type: String,
    },
    organisation_id: {
      type: String,
    },
    // editorState: {
    //   type: Object,
    // },
    draftToHtml: {
      type: String
    },
   
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Quotes
 */
module.exports = mongoose.model("Quotes", quotesSchema);
