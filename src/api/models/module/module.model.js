const mongoose = require("mongoose");

/**
 * Module Schema
 * @private
 */

const moduleSchema = new mongoose.Schema(
  {
    // action_type: {
    //   create: Boolean,
    //   edit: Boolean,
    //   delete: Boolean,
    //   view: Boolean,
    // },
    id:{
      type:String
    },
    module_Code: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    module_URL: {
      type: String,
    },
    parent_Id: {
      type: String,
    },
    level:{
      type: String,
    },
    screen_Id: {
      type: String,
    },
    client_id: {
      type: String,
    },
    organisation_id: {
      type: String,
    },
    module_Type: {
      type: String,
    },
    module_Description: {
      type: String,
    },
    children:[]
  },
  {
    timestamps: true,

    //Module Association With Role and roleRight
  //  toJSON: { virtuals: true },
  //  toObject: { virtuals: true }
  }
);

//Client Association With Attendence Policies
// Virtual populate
// moduleSchema.virtual("role", {
//   ref: "Role",   //must be changed to the name you used for Comment model.
//   foreignField: "module",
//   localField: "_id"
// });
/**
 * @typedef Modules
 */
module.exports = mongoose.model("Modules", moduleSchema);
