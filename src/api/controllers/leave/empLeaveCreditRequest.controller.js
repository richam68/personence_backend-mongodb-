// var mongoose = require('mongoose');
const EmpLeaveCreditRequest = require("../../models/leave/empLeaveCreditRequest.model");

////////
//Get Employee Leave Credit Request list using employee id
module.exports.getAllEmpLeaveCreditRequestEmpId = function (req, res) {
  var offset = 0;
  var count = 5;
  var maxCount = 10;

  
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({
      message: "If supplied in querystring count and offset should be a number",
    });
    return;
  }

  if (count > maxCount) {
    res.status(400).json({
      message: "Count limit of " + maxCount + " exceeded",
    });
    return;
  }

  EmpLeaveCreditRequest.find({ emp_id: req.params.emp_id })
    .skip(offset)
    .limit(count)
    .exec(function (err, empLeaveCreditRequest) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        res.json(empLeaveCreditRequest);
      }
    });
};
//Get Single Holidays using holiday id and client id
module.exports.getOneEmpLeaveCreditRequestEmpId = function (req, res) {
  var empLeaveCreditRequestId = req.params.empLeaveCreditRequestId;
  var emp_id = req.params.emp_id;
  

  Holidays.find({ _id: empLeaveCreditRequestId, emp_id: emp_id }).exec(
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
          message: "EmpLeaveCreditRequest ID not found",
        };
      }
      res.status(response.status).json(response.message);
    }
  );
};

////////

//Get EmpLeaveCreditRequest list
module.exports.getAllEmpLeaveCreditRequest = function (req, res) {
  var offset = 0;
  var count = 5;
  var maxCount = 10;

  
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({
      message: "If supplied in querystring count and offset should be a number",
    });
    return;
  }

  if (count > maxCount) {
    res.status(400).json({
      message: "Count limit of " + maxCount + " exceeded",
    });
    return;
  }

  EmpLeaveCreditRequest.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, empLeaveCreditRequest) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(empLeaveCreditRequest);
      }
    });
};
//Get Single EmpLeaveCreditRequest
module.exports.getOneEmpLeaveCreditRequest = function (req, res) {
  var _id = req.params.empLeaveCreditRequestId;
  

  EmpLeaveCreditRequest.findById(_id).exec(function (err, doc) {
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
        message: "EmpLeaveCreditRequest ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Add a new EmpLeaveCreditRequest
module.exports.empLeaveCreditRequestAddOne = function (req, res) {
  
  EmpLeaveCreditRequest.create(
    {
      emp_id: req.body.emp_id,
      leaveType_id: req.body.leaveType_id,
      leaveCreditAmount: req.body.leaveCreditAmount,
      lastPendingLeaveAmount: req.body.lastPendingLeaveAmount,
      lastTotalLeaveAmount: req.body.lastTotalLeaveAmount,
      creditedBy: req.body.creditedBy,
    },
    function (err, empLeaveCreditRequest) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(empLeaveCreditRequest);
      }
    }
  );
};

//update
module.exports.empLeaveCreditRequestUpdateOne = function (req, res) {
  var empLeaveCreditRequestId = req.params.empLeaveCreditRequestId;
  

  EmpLeaveCreditRequest.findById(empLeaveCreditRequestId)
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
          message: "empLeaveCreditRequest ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        doc.emp_id = req.body.emp_id;
        //    doc.trainNo = parseInt(req.body.trainNo);
        doc.leaveType_id = req.body.leaveType_id;
        doc.leaveCreditAmount = req.body.leaveCreditAmount;
        doc.lastPendingLeaveAmount = req.body.lastPendingLeaveAmount;
        doc.lastTotalLeaveAmount = req.body.lastTotalLeaveAmount;
        doc.creditedBy = req.body.creditedBy;

        doc.save(function (err, empLeaveCreditRequestUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(204).json();
          }
        });
      }
    });
};

//Delete
module.exports.empLeaveCreditRequestDeleteOne = function (req, res) {
  var empLeaveCreditRequestId = req.params.empLeaveCreditRequestId;

  EmpLeaveCreditRequest.findByIdAndRemove(empLeaveCreditRequestId).exec(
    function (err, empLeaveCreditRequest) {
      if (err) {
        res.status(404).json(err);
      } else {

        res.status(204).json();
      }
    }
  );
};
