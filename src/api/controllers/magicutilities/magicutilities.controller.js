const identityCard = require("../../models/magicutilities/identitycard.model")
const mongoose = require("mongoose");


//show Identity Card
module.exports.showIdentityCard = function (req, res) {
    identityCard.find({ organisation_id: req.params.organisation_id })
        .exec(function (err, identityCard) {
            if (err) {
                
                res.status(500).json(err);
            } else {
                
                res.status(200).json(identityCard);
            }
        })
}


// Insert identityCard
module.exports.insertIdentityCard = function (req, res) {
    
    identityCard.create(
        {
            organisation_id: req.body.organisation_id,
            // organisation_logo: req.body.organisation_logo,
            // organisation_name: req.body.organisation_name,
            // organisation_image: req.body.organisation_image,
            // company_name: req.body.company_name,
            // company_address: req.body.company_address,
            // organisation_details: req.body.organisation_details,
            colorbt: req.body.colorbt,
            color: req.body.color,
            roundedcorners: req.body.roundedcorners,
            sketchPickerColor: req.body.sketchPickerColor,
            sketchPickerColort: req.body.sketchPickerColort,
            empimage: req.body.empimage,
            empname: req.body.empname,
            empid: req.body.empid,
            empaddress: req.body.empaddress,
            empdesig: req.body.empdesig,

            orglogo:req.body.orglogo,
            orgname: req.body.orgname,
            orgaddress: req.body.orgaddress,
            orgnumber: req.body.orgnumber,
            orgweb:req.body.orgweb,

        },
        function (err, identityCard) {
            if (err) {
                
                res.status(400).json(err);
            } else {
                
                res.status(201).json(identityCard);
            }
        }
    );
}

//Edit An identity card
module.exports.editIdentityCard = function (req, res) {
    let identityCardId = req.params.organisation_id;
    
    identityCard.findOne({ organisation_id: identityCardId })
        .select("")
        .exec(function (err, identityCard) {
            let response = {
                status: 200,
                message: identityCard,
            }
            if (err) {
                
                response.status = 500;
                response.message = err;
            } else if (!identityCard) {
                response.status = 404;
                response.message = {
                    message: "identityCard ID not found",
                };
            }
            if (response.status !== 200) {
                res.status(response.status).json(response.message);
            } else {
                identityCard.organisation_id = req.body.organisation_id;
                identityCard.organisation_logo = req.body.organisation_logo;
                identityCard.organisation_name = req.body.organisation_name;
                identityCard.organisation_image = req.body.organisation_image;
                identityCard.company_name = req.body.company_name;
                identityCard.company_address = req.body.company_address;
                identityCard.organisation_details = req.body.organisation_details;
                identityCard.colorbt - req.body.colorbt;
                identityCard.color - req.body.color;
                identityCard.roundedcorners = req.body.roundedcorners;
                identityCard.sketchPickerColor = req.body.sketchPickerColor;
                identityCard.sketchPickerColort = req.body.sketchPickerColort

                identityCard.save(function (err, identityCard) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(204).json(identityCard.length);
                    }
                });

            }


        });
}