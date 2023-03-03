const mongoose = require('mongoose')

const createuser = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email:{
      type:String,
      require:true,
      unique:true
    },
    password: {
      type: String,
      required:true,
      unique:true
    },
    employeeId: {
      type: String
    },
    organisation_id: {
      type: String,
    },
    Buid:{
      type:String
    }
  },
  {
    timestamps: true,
  }
)


module.exports = mongoose.model("createuser", createuser)
