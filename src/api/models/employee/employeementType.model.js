const mongoose = require('mongoose');

/**
 * EmployeementType Schema
 * @private
 */

const EmployeementTypeSchema = new mongoose.Schema({  
    name: {
        type: String
    },
    organisationID: {
        type: String
    }

},
    {
        timestamps: true,
    }
);

/**
* @typedef EmployeementType
*/
module.exports = mongoose.model('EmployeementType', EmployeementTypeSchema);
