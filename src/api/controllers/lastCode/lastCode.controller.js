const LastCode = require("../../models/lastCode/lastCode.model")

module.exports.lastCodeAddOne = function (req, res) {
    
    LastCode.create(
      {
        // clientId: req.body.clientId,
        departmentLastCode: req.body.departmentLastCode,
        organisation_id: req.body.organisation_id,
      },
      function (err, lastCode) {
        if (err) {
          
          res.status(400).json(err);
        } else {
          
          res.status(201).json(lastCode);
        }
      }
    );
  };



  module.exports.zonelastCode = function (req, res) {
    
    LastCode.create(
      {
        // clientId: req.body.clientId,
        zoneLastCode: req.body.zoneLastCode,
        organisation_id: req.body.organisation_id,
      },
      function (err, lastCode) {
        if (err) {
          
          res.status(400).json(err);
        } else {
          
          res.status(201).json(lastCode);
        }
      }
    );
  };



  module.exports.designationLastCode = function (req, res) {
    
    LastCode.create(
      {
        // clientId: req.body.clientId,
        designationLastCode: req.body.designationLastCode,
        organisation_id: req.body.organisation_id,
      },
      function (err, lastCode) {
        if (err) {
          
          res.status(400).json(err);
        } else {
          
          res.status(201).json(lastCode);
        }
      }
    );
  };



  module.exports.divisionLastCode = function (req, res) {
    
    LastCode.create(
      {
        // clientId: req.body.clientId,
        divisionLastCode: req.body.divisionLastCode,
        organisation_id: req.body.organisation_id,
      },
      function (err, lastCode) {
        if (err) {
          
          res.status(400).json(err);
        } else {
          
          res.status(201).json(lastCode);
        }
      }
    );
  };



  module.exports.locationLastCode = function (req, res) {
    
    LastCode.create(
      {
        // clientId: req.body.clientId,
        locationLastCode: req.body.locationLastCode,
        organisation_id: req.body.organisation_id,
      },
      function (err, lastCode) {
        if (err) {
          
          res.status(400).json(err);
        } else {
          
          res.status(201).json(lastCode);
        }
      }
    );
  };

  module.exports.branchlastCode = function (req, res) {
    
    LastCode.create(
      {
        // clientId: req.body.clientId,
        branchLastCode: req.body.branchLastCode,
        organisation_id: req.body.organisation_id,
      },
      function (err, lastCode) {
        if (err) {
          
          res.status(400).json(err);
        } else {
          
          res.status(201).json(lastCode);
        }
      }
    );
  };

  