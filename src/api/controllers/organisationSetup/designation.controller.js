// var mongoose = require('mongoose');
const Designation = require("../../models/organisationSetup/designation.model");
const LastCode = require("../../models/lastCode/lastCode.model");

const Employee = require('../../models/employee/employee.model')

const getDesignationCode = (designationName) => {
  let designationCode = designationName.substring(0, 3).toUpperCase();
  
  return designationCode;
};

////////
//Get Designation list using organization id
module.exports.getAllByOrgId = function (req, res) {
  Designation
    .find({ organisation_id: req.params.organisation_id })
    .sort({ updatedAt: -1 })
    .exec(function (
      err,
      designation
    ) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(designation);
      }
    });
};
//Get Single Designation using designation id and organization id
module.exports.getOneByOrgId = function (req, res) {
  var designationId = req.params.designationId;
  var organisation_id = req.params.organisation_id;
  

  Designation.find({ _id: designationId, organisation_id: organisation_id }).exec(function (
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
        message: "Designation ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

////////

//Get Designation list
module.exports.getAllDesignation = function (req, res) {
  Designation
    .find()
    // .sort({_id:1})
    .exec(function (err, designation) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(designation);
      }
    });
};

//Get Single Designation
module.exports.getOneDesignation = function (req, res) {
  var _id = req.params.designationId;
  

  Designation
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
          message: "Designation ID not found",
        };
      }
      res.status(response.status).json(response.message);
    });
};

//Add a new Designation
module.exports.designationAddOne = function (req, res) {
  
  Designation.create(
    {
      // clientId: req.body.clientId,
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
      organisation_id: req.body.organisation_id,
    },
    function (err, designation) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(designation);
      }
    }
  );
};

module.exports.designationUpdateOne = function (req, res) {
  var designationId = req.body.designation_id;
  

  Designation.findById(designationId)
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
          message: "designation ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        doc.code = req.body.code;
        doc.name = req.body.name;
        doc.description = req.body.description;
        doc.organisation_id = req.body.organisation_id;

        doc.save(function (err, designationUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            Employee.updateMany({ designation_id: req.body.designation_id }, { designation_name: req.body.name })

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

//Create bulk Designation
module.exports.designationBulkCreate = function (req, res) {
  

  Designation.insertMany(req.body,
    function (err, designation) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(designation);
      }
    })

};

module.exports.designationDeleteOne = function (req, res) {
  var designationId = req.params.designationId;

  Designation.findByIdAndRemove(designationId).exec(function (err, designation) {
    if (err) {
      res.status(404).json(err);
    } else {
      
      res.status(204).json();
    }
  });
};

// designation sort
// module.exports.DesigSort = function (req, res) {
//   Designation
//     .find({ organisation_id: req.params.organisation_id })
//     .sort({ _id: 1 })
//     .exec(function (
//       err,
//       designation
//     ) {
//       if (err) {
//         
//         res.status(500).json(err);
//       } else {
//         
//         res.json(designation);
//       }
//     });
// };

module.exports.designationFindCreate = function (req, res) {
  organisation_id = req.body.organisation_id;
  designationname = req.body.name;
  code = req.body.code;
  description = req.body.description;
  Designation.findOne({
    $and: [
      { code: code },
      { organisation_id: organisation_id }
    ]
  })

    .exec(function (err, designation) {
      if (err) {
      } else {
        
        if (designation == null || designation == []) {
          
          Designation.create(
            {
              code: code,
              name: designationname,
              description: description,
              organisation_id: organisation_id,
            },
            function (errs, returnDesignationvalue) {
              if (errs) {
                
                res.status(400).json(errs);
              } else {
                
                res.status(201).json(returnDesignationvalue);
              }
            }
          );
        }
        else {
          
          res.status(204).json(designation);
        }
      }
    });
};




module.exports.designationAddOne = function (req, res) {

  if (req.body.code != "") {
    
    Designation.findOne({
      $and: [
        { organisation_id: req.body.organisation_id },
        { $or: [{ code: req.body.code }, { name: req.body.name }] },
      ]
    })

      .exec(function (err, designations) {
        if (err) {
          
        }
        else {
          
          if (designations == null || designations == [] || designations == true) {
            
            Designation.create(
              {
                code: req.body.code,
                name: req.body.name,
                description: req.body.description,
                organisation_id: req.body.organisation_id,
              },
              function (errs, returndesignationvalue) {
                if (errs) {
                  
                  res.status(400).json(errs);
                } else {
                  
                  res.status(201).json(returndesignationvalue);
                }
              }
            );
          }
          else {
            
            res.status(204).json(designations);
          }
        }
      })
  } else {

    Designation.findOne({
      $and: [
        { organisation_id: req.body.organisation_id },
        { name: req.body.name },
      ]
    })

      .exec(function (err, desg) {
        if (err) {

        }
        else {
          
          if (desg == null || desg == []) {
            var designationCode = getDesignationCode(req.body.name);
            var designationUniqueCode;
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
                        designationLastCode: 1
                      },
                      function (err, lastCode) {
                        if (err) {
                          
                        } else {
                          
                        }
                      }
                    );
                  } else {
                    lastCodeUpdated = lastCode.designationLastCode + 1;
                  }
                  
                  var str = lastCodeUpdated.toString();
                  var pad = "0000";
                  designationUniqueCode = pad.substring(0, pad.length - str.length) + str;

                  
                  uniqCode = designationCode + "-" + designationUniqueCode;
                  


                  Designation.create(
                    {
                      name: req.body.name,
                      code: uniqCode,
                      description: req.body.description,
                      organisation_id: req.body.organisation_id,
                    },
                    function (err, designation) {

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
                              lastCode.designationLastCode = designationUniqueCode;
                              lastCode.save(function (err, designationUniqueCode) {
                                if (err) {
                                  
                                } else {
                                  
                                }
                              });
                              
                            }
                          }
                        });
                        res.status(201).json(designation);
                      }
                    }
                  );
                }
              });

          }
          else {
            
            res.status(204).json(desg);
          }
        }
      })

  }
};
