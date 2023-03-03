
const UserDetails = require('../../models/employee/userDetails.model');

//Insert UserDetails
module.exports.insertUserDetails = function (req, res) {
    
    UserDetails
        .create(req.body, function (err, userdetails) {
            if (err) {
                
                res
                    .status(400)
                    .json(err);
            } else {
                
                res
                    .status(201)
                    .json(userdetails);
            }
        });
};


//Get User Details
module.exports.getUserDetailsByEmpCognitoID = function (req, res) {
    var EmpCognitoID = req.params.EmpCognitoID;
    

    UserDetails
        .find({ EmpCognitoID: EmpCognitoID })
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
                    "message": " EmpCognitoID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });

};








