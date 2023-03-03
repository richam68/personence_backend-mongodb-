const mongoose = require("mongoose");

/**
 * Role Page Schema
 * @private
 */
const roleSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      //required: true,
    },
    organisation_id: {
      type: String,
    },
    roleName: {
      type: String,
    },

    roleCode: {
      type: String,
    },
  },
  {
    timestamps: true,
    
    //Role Association With roleRight
   toJSON: { virtuals: true },
   toObject: { virtuals: true }
  }
);

//Role Association With RoleRight
// Virtual populate
roleSchema.virtual("roleRight", {
  ref: "RoleRight",   //must be changed to the name you used for Comment model.
  foreignField: "roleId",
  localField: "_id"
});

/**
 * @typedef Role
 */
module.exports = mongoose.model("Role", roleSchema);
