// var mongoose = require('mongoose');
const Division = require("../../models/organisationSetup/division.model");
const LastCode = require("../../models/lastCode/lastCode.model");

const Employee=require('../../models/employee/employee.model')

const getDivisionCode = (divisionName) => {
  let divisionCode = divisionName.substring(0, 3).toUpperCase();
  
  return divisionCode;
};


////////
//Get Division list using organization id
module.exports.getAllDivisionOrganizationId = function (req, res) {
  Division.find({ organisation_id: req.params.organisation_id })
    // .skip(offset)
    // .limit(count)
    .sort({ updatedAt: -1 })
    .exec(function (err, division) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(division);
      }
    });
};
//Get Single Division using division id and organization id
module.exports.getOneDivisionOrganizationId = function (req, res) {
  var divisionId = req.params.divisionId;
  var organisation_id = req.params.organisation_id;
  

  Division.find({ _id: divisionId, organisation_id: organisation_id }).exec(
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
          message: "Division ID not found",
        };
      }
      res.status(response.status).json(response.message);
    }
  );
};

////////

//Get Division list
module.exports.getAllDivision = function (req, res) {
  Division.find().exec(function (err, division) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(division);
    }
  });
};
//Get Single Division
module.exports.getOneDivision = function (req, res) {
  var _id = req.params.divisionId;
  

  Division.findById(_id).exec(function (err, doc) {
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
        message: "Division ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Add a new Division
// module.exports.divisionAddOne = function (req, res) {
//   
//   Division.create(
//     {
//       // clientId: req.body.clientId,
//       name: req.body.name,
//       code: req.body.code,
//       description: req.body.description,
//       organisation_id: req.body.organisation_id,
//     },
//     function (err, division) {
//       if (err) {
//         
//         res.status(400).json(err);
//       } else {
//         
//         res.status(201).json(division);
//       }
//     }
//   );
// };

module.exports.divisionUpdateOne = function (req, res) {
  var divisionId = req.body.division_id;
  

  Division.findById(divisionId)
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
          message: "division ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        doc.name = req.body.name;
        doc.code = req.body.code;
        doc.description = req.body.description;
        doc.organisation_id = req.body.organisation_id;

        doc.save(function (err, divisionUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            Employee.updateMany({ division_id: divisionId }, { division_name: req.body.name })

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

//Create bulk Division
module.exports.divisionBulkCreate = function (req, res) {
  

  Division.insertMany(req.body,
    function (err, division) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(division);
      }
    }
  )
};

module.exports.divisionDeleteOne = function (req, res) {
  var divisionId = req.params.divisionId;

  Division.findByIdAndRemove(divisionId).exec(function (err, division) {
    if (err) {
      res.status(404).json(err);
    } else {
      
      res.status(204).json();
    }
  });
};

// Division sort
// module.exports.DivisionSort = function (req, res) {
//   Division.find({ organisation_id: req.params.organisation_id })
//   .sort({_id:1})
//     .exec(function (err, division) {
//       if (err) {
//         
//         res.status(500).json(err);
//       } else {
//         
//         res.json(division);
//       }
//     });
// };


module.exports.divisionFindCreate = function (req, res) {
  organisation_id = req.body.organisation_id;
  divisionname = req.body.name;
  code = req.body.code;
  description = req.body.description;
  Division.findOne({
    $and: [
      { code: code },
      { organisation_id: organisation_id }
    ]
  })

    .exec(function (err, division) {
      if (err) {
      } else {
        
        if (division == null || division == []) {
          
          Division.create(
            {
              code: code,
              name: divisionname,
              description: description,
              organisation_id: organisation_id,
            },
            function (errs, returnDivisionvalue) {
              if (errs) {
                
                res.status(400).json(errs);
              } else {
                
                res.status(201).json(returnDivisionvalue);
              }
            }
          );
        }
        else {
          
          res.status(204).json(division);
        }
      }
    });
};






module.exports.divisionAddOne = function (req, res) {

  if (req.body.code != "") {
    
    Division.findOne({
      $and: [
        { organisation_id: req.body.organisation_id },
        { $or: [{ code: req.body.code }, { name: req.body.name }] },
      ]
    })

      .exec(function (err, divisions) {
        if (err) {
          
        }
        else {
          
          if (divisions == null || divisions == [] || divisions == true) {
            
            Division.create(
              {
                code: req.body.code,
                name: req.body.name,
                description: req.body.description,
                organisation_id: req.body.organisation_id,
              },
              function (errs, returndivisionvalue) {
                if (errs) {
                  
                  res.status(400).json(errs);
                } else {
                  
                  res.status(201).json(returndivisionvalue);
                }
              }
            );
          }
          else {
            
            res.status(204).json(divisions);
          }
        }
      })
  } else {

    Division.findOne({
      $and: [
        { organisation_id: req.body.organisation_id },
        { name: req.body.name },
      ]
    })

      .exec(function (err, dvsn) {
        if (err) {

        }
        else {
          
          if (dvsn == null || dvsn == []) {
            var divisionCode = getDivisionCode(req.body.name);
            var divisionUniqueCode;
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
                        divisionLastCode: 1
                      },
                      function (err, lastCode) {
                        if (err) {
                          
                        } else {
                          
                        }
                      }
                    );
                  } else {
                    lastCodeUpdated = lastCode.divisionLastCode + 1;
                  }
                  
                  var str = lastCodeUpdated.toString();
                  var pad = "0000";
                  divisionUniqueCode = pad.substring(0, pad.length - str.length) + str;

                  
                  uniqCode = divisionCode + "-" + divisionUniqueCode;
                  


                  Division.create(
                    {
                      name: req.body.name,
                      code: uniqCode,
                      description: req.body.description,
                      organisation_id: req.body.organisation_id,
                    },
                    function (err, division) {

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
                              lastCode.divisionLastCode = divisionUniqueCode;
                              lastCode.save(function (err, divisionUniqueCode) {
                                if (err) {
                                  
                                } else {
                                  
                                }
                              });
                              
                            }
                          }
                        });
                        res.status(201).json(division);
                      }
                    }
                  );
                }
              });

          }
          else {
            
            res.status(204).json(dvsn);
          }
        }
      })

  }
};
