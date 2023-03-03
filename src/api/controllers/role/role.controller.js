var mongoose = require('mongoose');
const { json } = require("body-parser");
const Role = require("../../models/role/role.model");
const RoleRight = require('../../models/roleRight/roleRight.model');
const Modules = require('../../models/module/module.model');
const Rights = require('../../models/rights/rights.model');

module.exports.roleAddRoleRightBothAddOne = function (req, res) {
  
  Role.create(
    {
      client_id: req.body.client_id,
      organisation_id: req.body.organisation_id,
      roleName: req.body.roleName,
      roleCode: req.body.roleCode,
      roleRightData: req.body.roleRightData
    },
    function (err, Role) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(Role);
        //req.body and res._id
        var data1 = [];
        req.body.roleRightData.map((data, i) => {
          var id = Role._id.toHexString();
          data1.push(
            {
              modulesId: data.modulesId,
              // rightId: data.rightId,
              create: data.create,
              edit: data.edit,
              delete: data.delete,
              view: data.view,
              roleId: id,
            }
          )
        })
        
        roleRightBulkCreate(data1)
      }
    }
  );
};
//Bulk create in roleRight
const roleRightBulkCreate = function (req, res) {
  

  RoleRight
    .insertMany(req).then(function () {
      
    }).catch(function (error) {
      
    });
};

//Get Role with roleRights
// Role and RoleRight association
module.exports.getOneRoleWithRoleRight = async (req, res) => {
  var roleId = req.params.roleId;
  //     // const animals = await Animal.find({}).populate("comments");
  //     // res.send(animals);
  const role = await Role.find({roleId}).populate("RoleRight");
  
  res.send(role);
}

module.exports.getRoleWithRights = function (req, res) {
  Role.aggregate([
      {$lookup:{ 
          from: "rolerights",
          localField: "_id",
          foreignField: "roleId",
          as: "Rights"
      }},
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params._id)

        }
      }
    ]).exec(function (err, Role) {
        if (err) {
            console.log("Error finding Role");
              res.status(500).json(err);
        } else {
            console.log("Found Role ", Role.length);
            //res.status(200).json({Role : Role[0], Rights : Role[0].Rights[0]});
            //res.status(200).json({Rights : Role[0].Rights[0]});
            res.status(200).json({Role : Role[0]});
            //res.status(200).json({Role});
          }})
      };


//Get getAllRole of an organisation list
module.exports.getAllRole = function (req, res) {
  Role.find({ organisation_id: req.params.organisation_id })
    // .skip(offset)
    // .limit(count)
    .exec(function (err, Role) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(Role);
      }
    });
};

//RoleID: Admin: 630615de505d1c0fccf9a2b4
//RoleID: User: 6306f4596d6b133b9c33baee
//Get getAllRole of an organisation list
module.exports.getRightsWithModules = function (req, res) {
  RoleRight
    .aggregate([
      {
        $lookup:
        {
          from: "modules",
          localField: "modulesId",
          foreignField: "_id",
          as: "rightModules"
        }
      },
      {
        $match: {
          roleId: new mongoose.Types.ObjectId(req.params.role_id)

        }
      }
    ])
    .exec(function (err, Role) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        let modules = []

        if (Role.length > 0) {
          Role.map((data) => {
            modules.push(data.rightModules[0])
          })
        }

        res.status(200).json(modules);
      }
    });
};
//Add a new AttendancePoliciesId
module.exports.roleAddOne = function (req, res) {
  
  Role.create(
    {
      client_id: req.body.client_id,
      organisation_id: req.body.organisation_id,
      // modules_id: req.body.modules_id,
      roleName: req.body.roleName,
      roleCode: req.body.roleCode,
      // COBHI_OTRPT: req.body.COBHI_OTRPT,
      // webInOut: req.body.webInOut,
      // mobileInOut: req.body.mobileInOut
    },
    function (err, Role) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(Role);
        //req.body and res._id

        // roleRightAddOne(req, Role._id)
      }
    }
  );
};

module.exports.roleUpdateOne = function (req, res) {
  var roleId = req.params.roleId;
  

  Role.findById(roleId)
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
          message: "Role ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        //doc.client_id = req.body.client_id;
        doc.client_id = req.body.client_id;
        doc.organisation_id = req.body.organisation_id;
        doc.modules_id = req.body.modules_id;
        doc.roleName = req.body.roleName;
        doc.roleCode = req.body.roleCode;

        doc.save(function (err, roleUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(204).json();
          }
        });
      }
    });
};

module.exports.roleDeleteOne = function (req, res) {
  var roleCode = req.params.roleCode;

  Role.findByIdAndRemove(roleCode).exec(function (err, role) {
    if (err) {
      res.status(404).json(err);
    } else {
      
      res.status(204).json();
    }
  });
};
