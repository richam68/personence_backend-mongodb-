const mongoose = require('mongoose');

/**
 * Rights Schema
 * @private
 */
const rightsSchema = new mongoose.Schema({
  // attendancePolicyId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   unique: true,
  //   trim: true,
  //   lowercase: true,
  // },
  
  // roleId: {
  //   type: String,
  //   required: true,
  // },

  // modules_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Modules",
  //   required: true,
  // },

  rightName: {
      type: String,
  }
   
}, {
  timestamps: true,
});

/**
 * @typedef Rights
 */
module.exports = mongoose.model('Rights', rightsSchema);
