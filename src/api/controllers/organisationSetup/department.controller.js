// var mongoose = require('mongoose');
const Department = require("../../models/organisationSetup/department.model");
const LastCode = require("../../models/lastCode/lastCode.model");

const Employee = require('../../models/employee/employee.model')
const getDepartmentCode = (deptName) => {
  let departmentCode = deptName.substring(0, 3).toUpperCase();
  
  return departmentCode;
};
////////
//Get Department list using organization id
module.exports.getAllByOrgId = function (req, res) {
  Department.find({ organisation_id: req.params.organisation_id }).sort({ updatedAt: -1 }).exec(
    function (err, department) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(department);
      }
    }
  );
};
//Get Single Department using department id and organization id
module.exports.getOneByOrgId = function (req, res) {
  var departmentId = req.params.departmentId;
  var organisation_id = req.params.organisation_id;
  

  Department.find({ _id: departmentId, organisation_id: organisation_id }).exec(
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
          message: "Department ID not found",
        };
      }
      res.status(response.status).json(response.message);
    }
  );
};

////////

//Get Department list
module.exports.getAllDepartment = function (req, res) {
  Department.find().exec(function (err, department) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(department);
    }
  });
};

//Get Single Department
module.exports.getOneDepartment = function (req, res) {
  var _id = req.params.departmentId;
  

  Department.findById(_id).exec(function (err, doc) {
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
        message: "Department ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Add a new Department
// module.exports.departmentAddOne = function (req, res) {
//   


//   if (req.body.code !="") {
//     Department.create(
//       {
//         // clientId: req.body.clientId,
//         name: req.body.name,
//         code: req.body.code, // unique id
//         description: req.body.description,
//         organisation_id: req.body.organisation_id,
//       },
//       function (err, department) {
//         if (err) {
//           
//           res.status(400).json(err);
//         } else {
//           
//           res.status(201).json(department);
//         }
//       }
//     );
//   } else {
//     var deptCode = getDepartmentCode(req.body.name);
//     var deptUniqueCode;
//     var uniqCode;
//     LastCode.findOne({ organisation_id: req.body.organisation_id }).exec(function (err, lastCode) {
//       var lastCodeUpdated;
//       if (err) {
//         //  res.status(400).json(err);
//         
//       } else {
//         if (lastCode == null) {
//           lastCode = 0;
//           
//           lastCodeUpdated = 1;
//           LastCode.create(
//             {
//               organisation_id: req.body.organisation_id,
//               departmentLastCode: 1
//             },
//             function (err, lastCode) {
//               if (err) {
//                 
//               } else {
//                 
//               }
//             }
//           );
//         } else {
//           lastCodeUpdated = lastCode.departmentLastCode + 1;
//         }
//         //  res.status(200).json(lastCode);
//         

//         // (lastCode == null) ? lastCodeUpdated = 1 : (lastCodeUpdated = lastCode.departmentLastCode + 1);
//         var str = lastCodeUpdated.toString();
//         var pad = "0000";
//         deptUniqueCode = pad.substring(0, pad.length - str.length) + str;

//         
//         uniqCode = deptCode + "-" + deptUniqueCode;
//         


//         Department.create(
//           {
//             // clientId: req.body.clientId,
//             name: req.body.name,
//             code: uniqCode, // unique id
//             description: req.body.description,
//             organisation_id: req.body.organisation_id,
//           },
//           function (err, department) {

//             if (err) {
//               
//               res.status(400).json(err);
//             } else {
//               
//               LastCode.findOne({
//                 organisation_id: req.body.organisation_id,
//               }).exec(function (err, lastCode) {
//                 if (err) {
//                   // res.status(400).json(err)
//                   
//                 } else {
//                   //  res.status(200).json(lastCode)
//                   if (lastCode == null) {
//                     
//                   } else {
//                     lastCode.departmentLastCode = deptUniqueCode;
//                     lastCode.save(function (err, deptUniqueCode) {
//                       if (err) {
//                         
//                       } else {
//                         
//                       }
//                     });
//                     
//                   }
//                 }
//               });
//               res.status(201).json(department);
//             }
//           }
//         );
//       }
//     });
//   }
// };

module.exports.departmentUpdateOne = function (req, res) {
  var departmentId = req.body.department_id;
  

  Department.findById(departmentId)
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
          message: "department ID not found",
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

        doc.save(function (err, departmentUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            Employee.updateMany({ department_id: req.body.department_id }, { department_name: req.body.name })

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

//Create bulk Department
module.exports.departmentBulkCreate = function (req, res) {
  

  Department.insertMany(req.body,
    function (err, department) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(department);
      }
    })

};

module.exports.departmentDeleteOne = function (req, res) {
  var departmentId = req.params.departmentId;

  Department.findByIdAndRemove(departmentId).exec(function (err, department) {
    if (err) {
      res.status(404).json(err);
    } else {
      
      res.status(204).json();
    }
  });
};

// department sort
// module.exports.DepartSort = function (req, res) {
//   Department.find({ organisation_id: req.params.organisation_id }).sort({_id:1}).exec(
//     function (err, department) {
//       if (err) {
//         
//         res.status(500).json(err);
//       } else {
//         
//         res.json(department);
//       }
//     }
//   );
// };


module.exports.departmentFindCreate = function (req, res) {
  organisation_id = req.body.organisation_id;
  departmentname = req.body.name;
  code = req.body.code;
  description = req.body.description;
  Department.findOne({
    $and: [
      { name: departmentname },
      { organisation_id: organisation_id }
    ]
  })

    .exec(function (err, department) {
      if (err) {
      } else {
        
        if (department == null || department == []) {
          
          Department.create(
            {
              code: code,
              name: departmentname,
              description: description,
              organisation_id: organisation_id,
            },
            function (errs, returnDepartmentnvalue) {
              if (errs) {
                
                res.status(400).json(errs);
              } else {
                
                res.status(201).json(returnDepartmentnvalue);
              }
            }
          );
        }
        else {
          
          // var msg='Department Name and Code Already Exists'+''+department;
          // res.json(department);
          res.status(204).json(department);
        }
      }
    });
};
















module.exports.departmentAddOne = function (req, res) {

  if (req.body.code != "") {
    
    Department.findOne({
      $and: [
        { organisation_id: req.body.organisation_id },
        { $or: [{ code: req.body.code }, { name: req.body.name }] },
      ]
    })

      .exec(function (err, department) {
        if (err) {
          
        }
        else {
          
          if (department == null || department == []) {
            
            Department.create(
              {
                code: req.body.code,
                name: req.body.name,
                description: req.body.description,
                organisation_id: req.body.organisation_id,
              },
              function (errs, returndepvalue) {
                if (errs) {
                  
                  res.status(400).json(errs);
                } else {
                  
                  res.status(201).json(returndepvalue);
                }
              }
            );
          }
          else {
            
            res.status(204).json(department);
          }
        }
      })
  } else {

    Department.findOne({
      $and: [
        { organisation_id: req.body.organisation_id },
        { name: req.body.name },
      ]
    })

      .exec(function (err, depart) {
        if (err) {

        }
        else {
          
          if (depart == null || depart == []) {
            var deptCode = getDepartmentCode(req.body.name);
            var deptUniqueCode;
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
                        departmentLastCode: 1
                      },
                      function (err, lastCode) {
                        if (err) {
                          
                        } else {
                          
                        }
                      }
                    );
                  } else {
                    lastCodeUpdated = lastCode.departmentLastCode + 1;
                  }
                  
                  var str = lastCodeUpdated.toString();
                  var pad = "0000";
                  deptUniqueCode = pad.substring(0, pad.length - str.length) + str;

                  
                  uniqCode = deptCode + "-" + deptUniqueCode;
                  


                  Department.create(
                    {
                      name: req.body.name,
                      code: uniqCode,
                      description: req.body.description,
                      organisation_id: req.body.organisation_id,
                    },
                    function (err, department) {

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
                              lastCode.departmentLastCode = deptUniqueCode;
                              lastCode.save(function (err, deptUniqueCode) {
                                if (err) {
                                  
                                } else {
                                  
                                }
                              });
                              
                            }
                          }
                        });
                        res.status(201).json(department);
                      }
                    }
                  );
                }
              });

          }
          else {
            
            res.status(204).json(depart);
          }
        }
      })

  }
};
