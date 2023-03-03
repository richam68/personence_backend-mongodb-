// var mongoose = require('mongoose');
const UserPermission = require("../../models/userPermission/userPermission.model");

//Get AttendancePolicies list
module.exports.getAllUserPermission = function (req, res) {
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

  UserPermission
    .find()
    .skip(offset)
    .limit(count)
    .exec(function (err, userPermission) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(userPermission);
      }
    });
};

//Get Single UserPermission
// module.exports.getOneUserPermission = function (req, res) {
//   var userPermissionId = req.params.userPermissionId;
//   

//   UserPermission.findById(userPermissionId).exec(function (err, doc) {
//     var response = {
//       status: 200,
//       message: doc,
//     };

//     if (err) {
//       
//       response.status = 500;
//       response.message = err;
//     } else if (!doc) {
//       res;
//       response.status = 404;
//       response.message = {
//         message: "userPermissionId ID not found",
//       };
//     }
//     res.status(response.status).json(response.message);
//   });
// };

//Add a new UserPermissionIdId
module.exports.userPermissionAddOne = function (req, res) {
  
  UserPermission.create(
    {
      roleId: req.body.roleId,
      modules_id: req.body.modules_id,
      rightsId: req.body.rightsId,
      userId: req.body.userId,
      isAuthorized: req.body.isAuthorized,
      module_name: req.body.module_name,
    },
    function (err, userPermission) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(userPermission);
      }
    }
  );
};

module.exports.userPermissionUpdateOne = function (req, res) {
  var userPermissionId = req.params.userPermissionId;
  

  UserPermission.findById(userPermissionId)
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
          message: "Train ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        doc.roleId = req.body.roleId;
        doc.modules_id = req.body.modules_id;
        doc.rightsId = req.body.rightsId;
        doc.userId = req.body.userId;
        doc.isAuthorized = req.body.isAuthorized;
        doc.module_name = req.body.module_name;

        doc.save(function (err, userPermissionUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(204).json();
          }
        });
      }
    });
};

module.exports.userPermissionDeleteOne = function (req, res) {
  var userPermissionId = req.params.userPermissionId;

  UserPermission.findByIdAndRemove(userPermissionId).exec(function (
    err,
    userPermission
  ) {
    if (err) {
      res.status(404).json(err);
    } else {
      
      res.status(204).json();
    }
  });
};
