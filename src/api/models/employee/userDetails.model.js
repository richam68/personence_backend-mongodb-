const mongoose = require('mongoose');

/**
 * UserDetails Schema
 * @private
 */

const UserDetailsSchema = new mongoose.Schema({
   
    id: {
        type: Number,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    org_email: {
        type: String
    },
    mobile_number: {
        type: String
    },
    name:{
        type: String
    },
    no_of_employee: {
        type: String
    },
    org_country :{
        type:String
    },
    user_name:{
        type:String
    },
    EmpCognitoID:{
        type:String
    },


},
    {
        timestamps: true,
    }
);

/**
* @typedef UserDetails
*/
module.exports = mongoose.model('UserDetails', UserDetailsSchema);
