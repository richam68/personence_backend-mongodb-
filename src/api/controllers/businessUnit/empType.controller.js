// var mongoose = require('mongoose');
const EmpType = require("../../models/bussinessUnit/empType.model");

////////
//Get EmpType list using organization id
module.exports.getAllByOrgId = function (req, res) {
    EmpType
    .find({ organisation_id: req.params.organisation_id })
    .exec(function (err, empType) {

    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(empType);
    }
  });
};
//Get Single EmpType using empType id and organization id
module.exports.getOneByOrgId = function (req, res) {
  var empTypeId = req.params.empTypeId;
  var organisation_id = req.params.organisation_id;
  

  EmpType.find({ _id: empTypeId, organisation_id: organisation_id }).exec(
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
          message: "EmpType ID not found",
        };
      }
      res.status(response.status).json(response.message);
    }
  );
};

////////

//Get EmpType list
module.exports.getAllEmpType = function (req, res) {
    EmpType.find()
    .exec(function (err,empType) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(empType);
    }
  });
};
//Get Single EmpType
module.exports.getOneEmpType = function (req, res) {
  var _id = req.params.empTypeId;
  

  EmpType
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
        message: "EmpType ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Add a new EmpType
module.exports.empTypeAddOne = function (req, res) {
  
  EmpType.create(
    {
      // clientId: req.body.clientId,
      name: req.body.name,
      organisation_id: req.body.organisation_id,
      
    },
    function (err, empType) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(empType);
      }
    }
  );
};

//update
module.exports.empTypeUpdateOne = function (req, res) {
  var empTypeId = req.params.empTypeId;
  

  EmpType.findById(empTypeId)
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
          message: "empType ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        doc.name = req.body.name;
        doc.organisation_id = req.body.organisation_id;
  
        doc.save(function (err, empTypeUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(204).json();
          }
        });
      }
    });
};

//delete
module.exports.empTypeDeleteOne = function (req, res) {
  var empTypeId = req.params.empTypeId;

  EmpType.findByIdAndRemove(empTypeId).exec(function (err, empType) {
    if (err) {
      res.status(404).json(err);
    } else {
      
      res.status(204).json();
    }
  });
};
