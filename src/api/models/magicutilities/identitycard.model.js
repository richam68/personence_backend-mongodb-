const mongoose = require("mongoose");

// magicutilities identitycard model

const identityCardSchema = new mongoose.Schema({
    organisation_id: { type: String, required: true, },
    // organisation_logo: { type: String, }, // image
    // organisation_name: { type: String, },
    // organisation_image: { type: String, },
    // company_name: { type: String, },
    // company_address: { type: String, },
    orglogo:{type: String},
    orgname:{type: String},
    orgaddress:{type: String},
    orgnumber:{type: String},
    orgweb:{type: String},


    colorbt: { type: String, },
    color: { type: String, },
    roundedcorners: { type: String},
    sketchPickerColor: { type: String },
    sketchPickerColort: { type: String },
    empimage: { type: String },
    empname: { type: String },
    empid: { type: String },
    empaddress: { type: String },
    empdesig: { type: String },

},
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("identityCard", identityCardSchema);
