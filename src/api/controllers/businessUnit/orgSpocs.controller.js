var mongoose = require('mongoose');
const OrgSpocs = require("../../models/bussinessUnit/orgSpocs.model");
const Employee = require("../../models/employee/employee.model");
////////
//Get Org Spocs list using organization id
module.exports.getAllByOrgId = function (req, res) {
  OrgSpocs.find({ organisation_id: req.params.organisation_id }).exec(function (
    err,
    orgSpocs
  ) {
    if (err) {

      res.status(500).json(err);
    } else {

      res.json(orgSpocs);
    }
  });
};
//Get Single Org Spocs using spocs id and organization id
module.exports.getOneByOrgId = function (req, res) {
  var orgSpocsId = req.params.orgSpocsId;
  var organisation_id = req.params.organisation_id;


  OrgSpocs.find({ _id: orgSpocsId, organisation_id: organisation_id }).exec(
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
          message: "OrgSpocs ID not found",
        };
      }
      res.status(response.status).json(response.message);
    }
  );
};

////////

//Get Org Spocs list
module.exports.getAllOrgSpocs = function (req, res) {
  OrgSpocs.find().exec(function (err, orgSpocs) {
    if (err) {

      res.status(500).json(err);
    } else {

      res.json(orgSpocs);
    }
  });
};
//Get Single OrgSpocs
module.exports.getOneOrgSpocs = function (req, res) {
  var _id = req.params.orgSpocsId;


  OrgSpocs.findById(_id).exec(function (err, doc) {
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
        message: "OrgSpocs ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Add a new OrgSpocs
module.exports.orgSpocsAddOne = function (req, res) {

  OrgSpocs.create(
    {
      // clientId: req.body.clientId,
      EmpCognitoID: req.body.EmpCognitoID,
      isAuthorised: req.body.isAuthorised,
      orgname: req.body.orgname,
      email: req.body.email,
      organisation_id: req.body.organisation_id,
    },
    function (err, orgSpocs) {
      if (err) {

        res.status(400).json(err);
      } else {

        res.status(201).json(orgSpocs);
      }
    }
  );
};

//update
module.exports.orgSpocsUpdateOne = function (req, res) {
  var orgSpocsId = req.params.orgSpocsId;


  OrgSpocs.findById(orgSpocsId)
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
          message: "orgSpocs ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        doc.EmpCognitoID = req.body.EmpCognitoID;
        doc.isAuthorised = req.body.isAuthorised;
        doc.orgname = req.body.orgname;
        doc.organisation_id = req.body.organisation_id;

        doc.save(function (err, orgSpocsUpdated) {
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
module.exports.orgSpocsDeleteOne = function (req, res) {
  var orgSpocsId = req.params.orgSpocsId;

  OrgSpocs.findByIdAndRemove(orgSpocsId).exec(function (err, orgSpocs) {
    if (err) {
      res.status(404).json(err);
    } else {

      res.status(204).json();
    }
  });
};
// getOrgSpocByEmpCognitoID
//Get Single Employee 
module.exports.getOrgSpocByEmpCognitoID = function (req, res) {
  var EmpCognitoID = req.params.EmpCognitoID;


  OrgSpocs
    .find({ EmpCognitoID: EmpCognitoID })
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
          "message": " EmpCognitoID not found"
        };
      }
      res
        .status(response.status)
        .json(response.message);

    });

};

module.exports.createOrgSpocsRights = function (req, res) {

  OrgSpocs.create(req.body,
    function (err, employee) {
      if (err) {
        console.log("Error creating Employee");
        res.status(400).json(err);
      } else {
        console.log("Employee created", employee);
        res.status(201).json(employee);
      }
    });
};


module.exports.getOrgSpocsRights = function (req, res) {
  //var organisation_id = req.params.organisation_id
  var EmpCognitoID = req.params.EmpCognitoID
  console.log("GET EmpCognitoID", EmpCognitoID)

  OrgSpocs.find({ EmpCognitoID: EmpCognitoID })
    .exec(function (err, doc) {
      var response = {
        status: 200,
        message: doc,
      };

      if (err) {
        console.log("Error finding EmpCognitoID");
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        // res;
        response.status = 404;
        response.message = {
          message: " OrgSpocs not found",
        };
      }
      res.status(response.status).json(response.message);
    });
};


module.exports.orgSpocsRightsUpdateOne = function (req, res) {
  let EmpCognitoID = req.body.EmpCognitoID;
  console.log("GET the EmpCognitoID :", EmpCognitoID);

  OrgSpocs.find({ EmpCognitoID: req.body.EmpCognitoID })
    .select(" ")
    .exec(function (err, docs) {
      var response = {
        status: 200,
        message: docs,
      };
      if (err) {
        console.log("Error finding orgSpocs");
        response.status = 500;
        response.message = err;
      } else if (!docs) {
        res;
        response.status = 404;
        response.message = {
          message: "orgSpocs ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      }
      else {
        // console.log('check docs',docs)
        docs[0].EmpCognitoID = req.body.EmpCognitoID;
        //  docs[0].isAuthorised = req.body.isAuthorised; 
        docs[0].orgname = req.body.orgname;
        docs[0].organisation_id = req.body.organisation_id;
        docs[0].assignedBU = req.body.assignedBU;
        docs[0].save(function (err, orgSpocsUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.json(orgSpocsUpdated);
          }
        });
      }
    });
};


module.exports.getAllBuWhichChecked = async function (req, res) {
  var org_id = req.params.organisation_id

  Employee.aggregate([
    { $match: { organisation_id: org_id } },
    // { $set: { _id: "$_id" } },
    // { $unionWith: { coll: "clients", pipeline: [] } },
    {
      $unionWith: {
        coll: 'clients',
        pipeline: [
          // {
          //   $match: {
          //     organisation_id: org_id
          //   }
          // },
          // {
          //   $group: {
          //     _id: "$_id",
          //     count: {
          //       $sum: 1
          //     }
          //   }
          // }
        ]
      }
    }
    // { $group: { _id: "$name" } },

    // { $unionWith: { coll: "clients", pipeline: [ { $set: { _id: "$_id" } }] } },
    // { $unionWith: { coll: "clients", pipeline: [ { $set: { _id: "$_id" } }] } },
    // { $unionWith: { coll: "collection3", pipeline: [{ $match: { circuitId: 12 } }] } }
  ]).exec(async function (err, Bu) {
    if (err) {

      res.status(500).json(err);
    } else {

      res.json(Bu)

    }
  })

}

module.exports.getBuByEmployee = function (req, res) {
  OrgSpocs.find({ EmpCognitoID: req.params.EmpCognitoID, organisation_id: req.params.organisation_id }).exec(function (err, userRights) {
    try {
      if (err) {
        res.status(404).json(err);
      } else {
        console.log('employee assigned bu', userRights)
        res.json(userRights[0].assignedBU)

      }
    }
    catch (err) {

    }
  });
}



module.exports.getEmpBuWise = function (req, res) {
  // var EmpCognitoID = req.params.EmployeeID;

  OrgSpocs.find({ EmpCognitoID: req.params.EmpCognitoID, organisation_id: req.params.organisation_id }).exec(function (err, userRights) {
    if (err) {
      res.status(404).json(err);
    } else {
      console.log('check data in 190==', userRights);
      let arrayFotUserRigts = [];
      let ant = []
      userRights.map((ele) => {
        console.log('check data in line no. 350', ele, ele.assignedBU)
        ele.assignedBU.map((x) => {
          console.log('check data in line no. 351', x)
          ant.push(x._id)
        })
        // arrayFotUserRigts.push(ele.assignedBU)
      })
      console.log('check data in line no. 356', ant)
      Employee.find({ client_id: { $in: ant } }).exec(function (err, a) {
        if (err) {
          console.log('error', err)
        }
        else {
          // console.log('checjk value of x', a)
          res.json(a)
        }
      })


      // res.status(204).json();
    }
  });
};
