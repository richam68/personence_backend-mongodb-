const Enquiry = require("../../models/Enquiry/Enquiry.model")

// this function used for insert customer enquiry form
module.exports.insertEnquiry= function (req, res) {
    Enquiry.create(req.body,function (err, enq) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json(enq);
        }
      }
    );
  };