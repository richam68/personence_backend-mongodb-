const mongoose = require("mongoose");

/**
 * Org Spocs Schema
 * @private
 */
const orgSpocsSchema = new mongoose.Schema(
  {
    isAuthorised: {
      type: String,
      required: true,
      default: 1,
    },
    orgname: {
      type: String,
    },

    assignedBU: [{
      client_name: {
        type: String,
      },
      client_id: { 
        type: String,  
      },
    }],  
      EmpCognitoID: {
        type: String
      },
      organisation_id: {
        type: mongoose.Schema.Types.ObjectId,
      },

  },
  {
    timestamps: true,
  }
);

/**
 * @typedef orgSpocs
 */
module.exports = mongoose.model("orgSpocs", orgSpocsSchema);
