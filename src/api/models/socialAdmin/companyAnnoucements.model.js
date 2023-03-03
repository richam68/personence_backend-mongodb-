const mongoose = require("mongoose");
// const { stringify } = require('uuid');

/**
 * Company Annoucements Model
 * @private
 */
const companyAnnoucementSchema = new mongoose.Schema(
  {
    annoucement: {
      type: String,
    },
    // annoucement: [
    //   {
    //     type: String,
    //     required: "Annoucement is required!",
    //   },
    // ],
    date: {
      type: String,
    },
    organisation_id: {
      type: String,
    },
    companyDraftToHtml: {
      type: String,
    },
    visibile: {
      type: Boolean,
      default: true,
    },
    // editorState: {
    //   type: Object,
    // }
  },

  {
    timestamps: true,
  }
);

/**
 * @typedef CompanyAnnoucement
 */
module.exports = mongoose.model("CompanyAnnoucement", companyAnnoucementSchema);
