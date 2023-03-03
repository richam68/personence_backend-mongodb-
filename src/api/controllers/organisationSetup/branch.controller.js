const Branch = require("../../models/organisationSetup/branch.model");
const LastCode = require("../../models/lastCode/lastCode.model");

const Employee=require('../../models/employee/employee.model')
const getBranchCode = (branchName) => {
  let branchCode = branchName.substring(0, 3).toUpperCase();
  
  return branchCode;
};

//Get Branch list using organization id
module.exports.getAllBranchOrganizationId = function (req, res) {
  Branch.find({ organisation_id: req.params.organisation_id }).sort({ _id: -1 }).exec(function (
    err,
    branch
  ) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(branch);
    }
  });
};
//Get Single Branch using branch id and organization id
module.exports.getOneBranchOrganizationId = function (req, res) {
  var branchId = req.params.branchId;
  var organisation_id = req.params.organisation_id;
  

  Branch.find({ _id: branchId, organisation_id: organisation_id }).exec(function (
    err,
    doc
  ) {
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
        message: "Branch ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Get Single Branch
module.exports.getOneBranch = function (req, res) {
  var _id = req.params.branchId;
  
  Branch.findById(_id).exec(function (err, doc) {
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
        message: "Branch ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.branchUpdateOne = function (req, res) {
  var branchId = req.body.branch_id;
  // organisation_id = req.body.organisation_id;
  // branchName = req.body.branch_name;
  // branchCode = req.body.branch_code;
  // description = req.body.description;
  
  Branch.findById(branchId)
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
          message: "branch ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      }
      else {
        doc.branch_code = req.body.branch_code;
        doc.branch_name = req.body.branch_name;
        doc.description = req.body.description;
        doc.save(function (err, branchUpdated) {
          if (err) {
            res.status(500).json(err);
          }
          else {

            Employee.updateMany({ location_id: branchId }, { location_name:req.body.branch_name})

            .exec(function (err, doc) {
              if (err) {
                
                res.status(500).json(err)
              } else {
                
                res.status(204).json({
                  message: 'successfully update'
                })
              }
            })
          }
        });

      }
    });
};

//Create bulk Branch
module.exports.branchBulkCreate = function (req, res) {
  

  Branch.insertMany(req.body,
    function (err, branch) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(branch);
      }
    })
};

module.exports.branchDeleteOne = function (req, res) {
  var branchId = req.params.branchId;

  Branch.findByIdAndRemove(branchId).exec(function (err, branch) {
    if (err) {
      res.status(404).json(err);
    } else {
      
      res.status(204).json();
    }
  });
};

module.exports.branchAddOne = function (req, res) {

  if (req.body.branch_code != "") {
    
    Branch.findOne({
      $and: [
        { organisation_id: req.body.organisation_id },
        { $or: [{ branch_code: req.body.branch_code }, { branch_name: req.body.branch_name }] },
      ]
    })

      .exec(function (err, branchs) {
        if (err) {
          
        }
        else {
          
          if (branchs == null || branchs == [] ||branchs== true) {
            
            Branch.create(
              {
                branch_code: req.body.branch_code,
                                branch_name: req.body.branch_name,
                                description: req.body.description,
                                organisation_id: req.body.organisation_id,
              },
              function (errs, returnbranchvalue) {
                if (errs) {
                  
                  res.status(400).json(errs);
                } else {
                  
                  res.status(201).json(returnbranchvalue);
                }
              }
            );
          }
          else {
            
            res.status(204).json(branchs);
          }
        }
      })
  } else {

    Branch.findOne({
      $and: [
        { organisation_id: req.body.organisation_id },
        { branch_name: req.body.branch_name },
      ]
    })

      .exec(function (err, zns) {
        if (err) {

        }
        else {
          
          if (zns == null || zns == []) {
            var branchCode = getBranchCode(req.body.branch_name);
            var branchUniqueCode;
            var uniqCode;
            LastCode.findOne({ organisation_id: req.body.organisation_id })
              .exec(function (err, lastCode) {
                var lastCodeUpdated;
                if (err) {
                  
                } else {
                  if (lastCode == null) {
                    lastCode = 0;
                    
                    lastCodeUpdated = 1;
                    LastCode.create(
                      {
                        organisation_id: req.body.organisation_id,
                        branchLastCode: 1
                      },
                      function (err, lastCode) {
                        if (err) {
                          
                        } else {
                          
                        }
                      }
                    );
                  } else {
                    lastCodeUpdated = lastCode.branchLastCode + 1;
                  }
                  
                  var str = lastCodeUpdated.toString();
                  var pad = "0000";
                  branchUniqueCode = pad.substring(0, pad.length - str.length) + str;

                  
                  uniqCode = branchCode + "-" + branchUniqueCode;
                  


                  Branch.create(
                    {
                      branch_name: req.body.branch_name,
                      branch_code: uniqCode,
                      description: req.body.description,
                      organisation_id: req.body.organisation_id,
                    },
                    function (err, branch) {

                      if (err) {
                        
                        res.status(400).json(err);
                      } else {
                        
                        LastCode.findOne({
                          organisation_id: req.body.organisation_id,
                        }).exec(function (err, lastCode) {
                          if (err) {
                            // res.status(400).json(err)
                            
                          } else {
                            //  res.status(200).json(lastCode)
                            if (lastCode == null) {
                              
                            } else {
                              lastCode.branchLastCode = branchUniqueCode;
                              lastCode.save(function (err, branchUniqueCode) {
                                if (err) {
                                  
                                } else {
                                  
                                }
                              });
                              
                            }
                          }
                        });
                        res.status(201).json(branch);
                      }
                    }
                  );
                }
              });

          }
          else {
            
            res.status(204).json(zns);
          }
        }
      })

  }
};
