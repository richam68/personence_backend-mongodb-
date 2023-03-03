// var mongoose = require('mongoose');
const Organisation = require('../../models/organisation/organisation.model');
const LastCode = require("../../models/lastCode/lastCode.model");

//Get AttendancePolicies list
module.exports.getAllOrganisation = function (req, res) {

    Organisation
        .find()
        .exec(function (err, organisation) {
            if (err) {
                
                res
                    .status(500)
                    .json(err);
            } else {
                
                res
                    .json(organisation);
            }
        });

};
//Get organisation by _id 
module.exports.getOrganisationById = function (req, res) {
    var organisation_id = req.params.organisation_id;
    

    Organisation
        .findById({ _id: organisation_id })
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
                    "message": "organisation_id not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });

};


//this function is use for get, loggedin user all organisation


module.exports.getOrganisationByCognitoId = function (req, res) {
    var incognito_id = req.params.incognito_id;
    

    Organisation
        .find({ incognito_id: incognito_id })
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
                    "message": "incognito_id not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });

};






//this function used for create a new organisation 
module.exports.createOrganisation = function (req, res) {
    
    Organisation
        .create({
            // organisation_id:req.body.organisation_id,
            //$inc: { organisation_id: 1},
            name: req.body.name,
            no_of_employee: req.body.no_of_employee,
            legal_status: req.body.legal_status,
            gstin: req.body.gstin,
            incognito_id: req.body.incognito_id,
            org_pan: req.body.org_pan,
            org_logo: req.body.org_logo,
            group_companies: req.body.group_companies,
            mobile_number: req.body.mobile_number,
            org_email: req.body.org_email,
            code: req.body.code,
            address1: req.body.address1,
            address2: req.body.address2,
            org_city: req.body.org_city,
            org_state: req.body.org_state,
            org_pincode: req.body.org_pincode,
            org_country: req.body.org_country,

        }, function (err, organisation) {
            if (err) {
                
                res
                    .status(400)
                    .json(err);
            } else {
                
                //Create Last Code here
                LastCode.create(
                    {
                        organisation_id: req.body.organisation_id,
                    },
                    function (err, lastCode) {
                        if (err) {
                            
                        } else {
                            
                        }
                    }
                );
                res
                    .status(201)
                    .json(organisation);
            }
        });
};


// module.exports.updateOrganisation = function (req, res) {
//     var organisation_id = req.body.organisation_id;
//     
//     var query = { organisation_id: organisation_id };
//     var updatedValues = { $set: {name: req.body.name } };

//     Organisation
//         .updateOne(query,updatedValues,function (err, doc) {
//             var response = {
//                 status: 200,
//                 message: doc
//             }
//             if (err) {
//                 
//                 response.status = 500;
//                 response.message = err;
//             }  
//             else {
//                 doc.name= req.body.name,
//                 doc.no_of_employee= req.body.no_of_employee,
//                 doc.legal_status= req.body.legal_status,
//                 doc.gstin= req.body.gstin,
//                 doc.org_pan= req.body.org_pan,
//                 doc.org_logo= req.body.org_logo,
//                 doc.group_companies= req.body.group_companies,
//                 doc.mobile_number= req.body.mobile_number,
//                // doc.org_email= req.body.org_email,
//                 doc.code= req.body.code,
//                 doc.address1= req.body.address1,
//                 doc.address2= req.body.address2,
//                 doc.org_city= req.body.org_city,
//                 doc.org_state= req.body.org_state,
//                 doc.org_pincode= req.body.org_pincode,
//                 doc.org_country= req.body.org_country
//             }
//         });
//     };



module.exports.deleteOrganisation = function (req, res) {
    var organisation_id = req.params.organisation_id;

    Organisation
        .findById(organisation_id)
        .select("")
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
                    "message": "organisation ID not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                doc.isActive = req.body.IsActive,
                    doc.save(function (err, organisationUpdated) {
                        var response = {
                            status: 200,
                            message: 'organisation Updated'
                        }
                        if (err) {
                            res
                                .status(500)
                                .json(err);

                        } else {
                            res
                                .status(204)
                                .json();

                        }
                    });
            }
        });
};


module.exports.updateOrganisation = function (req, res) {
    var organisation_id = req.body._id;
    

    Organisation
        .findById(organisation_id)
        .select(" ")
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
                    "message": "organisation ID not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                doc.name = req.body.name,
                    doc.no_of_employee = req.body.no_of_employee,
                    doc.legal_status = req.body.legal_status,
                    doc.gstin = req.body.gstin,
                    doc.org_pan = req.body.org_pan,
                    doc.org_logo = req.body.org_logo,
                    doc.group_companies = req.body.group_companies,
                    doc.mobile_number = req.body.mobile_number,
                    // doc.org_email= req.body.org_email,
                    doc.code = req.body.code,
                    doc.address1 = req.body.address1,
                    doc.address2 = req.body.address2,
                    doc.org_city = req.body.org_city,
                    doc.org_state = req.body.org_state,
                    doc.org_pincode = req.body.org_pincode,
                    doc.org_country = req.body.org_country,

                    doc.save(function (err, organisationUpdated) {
                        var response = {
                            status: 200,
                            message: 'organisation Updated'
                        }
                        if (err) {
                            res
                                .status(500)
                                .json(err);

                        } else {
                            res
                                .status(204)
                                .json();

                        }
                    });
            }
        });
};
