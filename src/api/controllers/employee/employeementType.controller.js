
const EmployeementType = require('../../models/employee/employeementType.model');

//Insert UserDetails
module.exports.insertEmployeementType = function (req, res) {
    
    EmployeementType
        .create(req.body, function (err, emptype) {
            if (err) {
                
                res
                    .status(400)
                    .json(err);
            } else {
                
                res
                    .status(201)
                    .json(emptype);
            }
        });
};


//Get User Details
module.exports.getEmployeementTypeByOrgID = function (req, res) {
    var organisation_id = req.params.organisation_id;
    

    EmployeementType
        .find({ organisation_id: organisation_id })
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            }


            if (err) {
                
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                res
                response.status = 404;
                response.message = {
                    "message": " organisationID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });

};








