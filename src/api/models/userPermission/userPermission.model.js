const mongoose = require('mongoose');

/**
 * Attendance Policies Schema
 * @private
 */
const userPermissionSchema = new mongoose.Schema({
  // attendancePolicyId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   unique: true,
  //   trim: true,
  //   lowercase: true,
  // },
  roleId: {
    type: String,
    required: true,
  },
  
  modules_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Modules",
    required: true,
  },

  module_name: {
    type: String
  },

  rightsId: {
    type: String,
  },

  userId: {
      type: String,
  },

  isAuthorized: {
    type: Boolean,
  },

}, {
  timestamps: true,
});

/**
 * @typedef UserPermission
 */
module.exports = mongoose.model('UserPermission', userPermissionSchema);
