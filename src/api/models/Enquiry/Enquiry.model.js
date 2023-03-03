const mongoose = require('mongoose');
/**
 * Enquiry Schema
 * 
 */

const EnquirySchema = new mongoose.Schema({
    name:{type:String},
    mobileNumber:{type:Number},
    designation : {type:String},
    workEmail:{type:String},
    address:{type:String}
},
{
    timestamps:true
});

module.exports = mongoose.model('Enquiry',EnquirySchema);