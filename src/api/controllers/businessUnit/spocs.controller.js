// var mongoose = require('mongoose');
const Spocs = require("../../models/bussinessUnit/spocs.model");

////////
//Get Spocs list using organization id
module.exports.getAllByClientId = function (req, res) {
  Spocs
    .find({ client_id: req.params.client_id })
    .exec(function (err, spocs) {

      if (err) {

        res.status(500).json(err);
      } else {

        res.json(spocs);
      }
    });
};
//Get Single Spocs using spocs id and organization id
module.exports.getOneByOrgId = function (req, res) {
  var spocsId = req.params.spocsId;
  var organisation_id = req.params.organisation_id;


  Spocs.find({ _id: spocsId, organisation_id: organisation_id }).exec(
    function (err, doc) {
      var response = {
        status: 200,
        message: doc,
      };

      if (err) {

        response.status = 500;
        response.message = err;
      } else if (!doc) {
        res;
        response.status = 404;
        response.message = {
          message: "Spocs ID not found",
        };
      }
      res.status(response.status).json(response.message);
    }
  );
};

////////

//Get Spocs list
module.exports.getAllSpocs = function (req, res) {
  Spocs.find()
    .exec(function (err, spocs) {
      if (err) {

        res.status(500).json(err);
      } else {

        res.json(Spocs);
      }
    });
};
//Get Single Spocs
module.exports.getOneSpocs = function (req, res) {
  var _id = req.params.spocsId;


  Spocs
    .findById(_id)
    .exec(function (err, doc) {
      var response = {
        status: 200,
        message: doc,
      };

      if (err) {

        response.status = 500;
        response.message = err;
      } else if (!doc) {
        res;
        response.status = 404;
        response.message = {
          message: "Spocs ID not found",
        };
      }
      res.status(response.status).json(response.message);
    });
};

//Add a new Spocs
module.exports.spocsAddOne = function (req, res) {

  Spocs.create(
    {
      // clientId: req.body.clientId,
      name: req.body.name,
      designation: req.body.designation,
      mobile_no: req.body.mobile_no,
      email: req.body.email,
      department: req.body.department,
      client_id: req.body.client_id,
      dob: req.body.dob,
      anniversary: req.body.anniversary,
      //organisationID: req.body.organisationID,
      organisation_id: req.body.organisation_id,

    },
    function (err, spocs) {
      if (err) {

        res.status(400).json(err);
      } else {

        res.status(201).json(spocs);
      }
    }
  );
};

module.exports.spocsUpdateOne = function (req, res) {
  var spocsId = req.params.spocsId;


  Spocs.findById(spocsId)
    .select(" ")
    .exec(function (err, doc) {
      var response = {
        status: 200,
        message: doc,
      };

      if (err) {

        response.status = 500;
        response.message = err;
      } else if (!doc) {
        res;
        response.status = 404;
        response.message = {
          message: "spocs ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        doc.name = req.body.name;
        doc.designation = req.body.designation;
        doc.mobile_no = req.body.mobile_no;
        doc.email = req.body.email;
        doc.department = req.body.department;
        doc.client_id = req.body.client_id;
        doc.dob = req.body.dob;
        doc.anniversary = req.body.anniversary;
        //doc.organisationID = req.body.organisationID;
        doc.organisation_id = req.body.organisation_id;

        doc.save(function (err, spocsUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(204).json();
          }
        });
      }
    });
};

module.exports.spocsDeleteOne = function (req, res) {
  var spocsId = req.params.spocsId;

  Spocs.findByIdAndRemove(spocsId).exec(function (err, spocs) {
    if (err) {
      res.status(404).json(err);
    } else {

      res.status(204).json();
    }
  });
};


module.exports.getAllBuWhichChecked = async function (req, res) {
  var organisation_id = req.params.organisation_id

  Employee.aggregate([
    // { $match: { circuitId: 12 } },
    { $unionWith: { coll: "clients", pipeline: [{ $match: { organisation_id: organisation_id } }] } },
    // { $unionWith: { coll: "collection3", pipeline: [{ $match: { circuitId: 12 } }] } }
  ]).exec(async function (err,Bu) {
    if (err) {

      res.status(500).json(err);
    } else {

      res.json(Bu)

    }
  })

}
//   });
// };
