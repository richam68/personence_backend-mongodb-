// var mongoose = require('mongoose');
const UserRights = require("../../models/bussinessUnit/userRights.model");

////////
//Get Spocs list using organization id
// module.exports.getAllByOrgId = function (req, res) {
//     UserRights
//     .find({ organisation_id: req.params.organisation_id })
//     .exec(function (err, userRights) {

//     if (err) {
//       
//       res.status(500).json(err);
//     } else {
//       
//       res.json(userRights);
//     }
//   });
// };
//Get Single UserRights using spocs id and organization id
// module.exports.getOneByOrgId = function (req, res) {
//   var userRightsId = req.params.userRightsId;
//   var organisation_id = req.params.organisation_id;
//   

//   UserRights.find({ _id: userRightsId, organisation_id: organisation_id }).exec(
//     function (err, doc) {
//       var response = {
//         status: 200,
//         message: doc,
//       };

//       if (err) {
//         
//         response.status = 500;
//         response.message = err;
//       } else if (!doc) {
//         res;
//         response.status = 404;
//         response.message = {
//           message: "UserRights ID not found",
//         };
//       }
//       res.status(response.status).json(response.message);
//     }
//   );
// };

////////

//Get UserRights list
module.exports.getAllUserRights = function (req, res) {
    UserRights.find()
    .exec(function (err,userRights) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(UserRights);
    }
  });
};
//Get Single UserRights
module.exports.getOneUserRights = function (req, res) {
  var _id = req.params.userRightsId;
  

  UserRights
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
        message: "UserRights ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Add a new UserRights
module.exports.userRightsAddOne = function (req, res) {
  
  UserRights.create(
    {
      // clientId: req.body.clientId,
      org_email: req.body.org_email,
      mobile_number: req.body.mobile_number,
      name: req.body.name,
      no_of_employee: req.body.no_of_employee,
      org_country: req.body. org_country,
      user_name: req.body.user_name,
      EmpCognitoID: req.body.EmpCognitoID,
     
      
    },
    function (err, userRights) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(userRights);
      }
    }
  );
};

module.exports.userRightsUpdateOne = function (req, res) {
  var userRightsId = req.params.userRightsId;
  

  UserRights.findById(userRightsId)
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
          message: "userRights ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        doc.org_email = req.body.org_email;
        doc.mobile_number = req.body.mobile_number;
        doc.name = req.body.name;
        doc.email = req.body.email;
        doc.no_of_employee = req.body.no_of_employee;
        doc.org_country = req.body.org_country;
        doc.user_name = req.body.user_name;
        doc.EmpCognitoID = req.bodyEmpCognitoID;
      
  
        doc.save(function (err, userRightsUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(204).json();
          }
        });
      }
    });
};

module.exports.userRightsDeleteOne = function (req, res) {
  var userRightsId = req.params.userRightsId;

  UserRights.findByIdAndRemove(userRightsId).exec(function (err, userRights) {
    if (err) {
      res.status(404).json(err);
    } else {
      
      res.status(204).json();
    }
  });
};


