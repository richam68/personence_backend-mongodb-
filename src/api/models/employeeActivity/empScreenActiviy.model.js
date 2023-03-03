const mongoose = require("mongoose");
// const { stringify } = require('uuid');

/**
 * Employee Activity Model
 * @private
 */
const empScreenActivitySchema = new mongoose.Schema(
  {
      empUrl: {
        type: String,
      },
      empDateTime: {
        type: String,
      },
      empMacId: {
        type: String,
      },
      employeeId: {
        type: String,
      },
     image:{
      name: String,
      desc: String,
      img:
      {
          data: Buffer,
          contentType: String
      }
     }
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef EmployeeScreenActivity
 */
module.exports = mongoose.model("EmployeeScreenActivity", empScreenActivitySchema);
