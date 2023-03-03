const mongoose = require("mongoose");

/**
 * Role Page Schema
 * @private
 */
const roleRightSchema = new mongoose.Schema(
  {    
    // rightId: {
    //   type: String,
    //   // required: true,
    // },
    modulesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Modules",
    },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
    view: { type: Boolean, default: false },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef RoleRight
 */
module.exports = mongoose.model("RoleRight", roleRightSchema);
