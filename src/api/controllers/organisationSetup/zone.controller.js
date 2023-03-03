// var mongoose = require('mongoose');
const Zone = require("../../models/organisationSetup/zone.model");
const LastCode = require("../../models/lastCode/lastCode.model");
const Employee = require('../../models/employee/employee.model')
const getZoneCode = (zoneName) => {
  let zoneCode = zoneName.substring(0, 3).toUpperCase();
  
  return zoneCode;
};


//Get Zone list using organization id
module.exports.getAllZoneOrganizationId = function (req, res) {
  Zone.find({ organisation_id: req.params.organisation_id }).sort({ updatedAt:-1 }).exec(function (
    err,
    zone
  ) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(zone);
    }
  });
};
//Get Single Zone using zone id and organization id
module.exports.getOneZoneOrganizationId = function (req, res) {
  var zoneId = req.params.zoneId;
  var organisation_id = req.params.organisation_id;
  

  Zone.find({ _id: zoneId, organisation_id: organisation_id }).exec(function (
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
        message: "Zone ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Get Zone list
module.exports.getAllZone = function (req, res) {
  Zone.find().exec(function (err, zone) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(zone);
    }
  });
};
//Get Single Zone
module.exports.getOneZone = function (req, res) {
  var _id = req.params.zoneId;
  

  Zone.findById(_id).exec(function (err, doc) {
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
        message: "Zone ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Add a new Zone
// module.exports.zoneAddOne = function (req, res) {
//   
//   Zone.create(
//     {
//       // clientId: req.body.clientId,
//       zone_code: req.body.zone_code,
//       zone_name: req.body.zone_name,
//       description: req.body.description,
//       organisation_id: req.body.organisation_id,
//     },
//     function (err, zone) {
//       if (err) {
//         
//         res.status(400).json(err);
//       } else {
//         
//         res.status(201).json(zone);
//       }
//     }
//   );
// };

module.exports.zoneUpdateOne = function (req, res) {
  var zoneId = req.body.zone_id;
  organisation_id = req.body.organisation_id;
  zoneName = req.body.zone_name;
  zoneCode = req.body.zone_code;
  description = req.body.description;
  




  Zone.findById(zoneId)
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
          message: "zone ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      }
      else {
        //Update columns like this here
        doc.zone_code = req.body.zone_code;
        doc.zone_name = req.body.zone_name;
        doc.description = req.body.description;

        doc.save(function (err, zoneUpdated) {
          if (err) {
            res.status(500).json(err);
          }
          else {

            Employee.updateMany({ zone_id: req.body.zone_id }, { zone_name: req.body.zone_name })

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

//Create bulk Zone
module.exports.zoneBulkCreate = function (req, res) {
  

  Zone.insertMany(req.body,
    function (err, zone) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(zone);
      }
    })
  // .then(function (res) {
  //   
  //   res.status(201).json(res); 
  // })
  // .catch(function (error) {
  //   
  //   res.status(404).json(error);
  // });
};

module.exports.zoneDeleteOne = function (req, res) {
  var zoneId = req.params.zoneId;

  Zone.findByIdAndRemove(zoneId).exec(function (err, zone) {
    if (err) {
      res.status(404).json(err);
    } else {
      
      res.status(204).json();
    }
  });
};






module.exports.zoneFindCreate = function (req, res) {
  organisation_id = req.body.organisation_id;
  zoneName = req.body.zone_name;
  zoneCode = req.body.zone_code;
  description = req.body.description;
  Zone.findOne({

    $and: [
      { organisation_id: organisation_id },
      { zone_code: zoneCode}
      //{ $or: [{ zone_code: zoneCode }, { zone_name: zoneName }] },

    ]

  })

    .exec(function (err, zone) {
      if (err) {
      }
      else {
        
        if (zone == null || zone == []) {
          
          Zone.create(
            {
              // clientId: req.body.clientId,
              zone_code: zoneCode,
              zone_name: zoneName,
              description: description,
              organisation_id: organisation_id,
            },
            function (errs, returnzonevalue) {
              if (errs) {
                
                res.status(400).json(errs);
              } else {
                
                res.status(201).json(returnzonevalue);
              }
            }
          );
        }
        else {
          // 
          
          // var msg='Zone Name and Code Already Exists'+''+zone;
          // res.json(zone);
          res.status(204).json(zone);
        }
      }
    });
};



// createing update module for
// module.exports.zoneUpdateOne = function (req, res) {
//   var zoneId = req.body.zone_id;
//   organisation_id = req.body.organisation_id;
//   zoneName = req.body.zone_name;
//   zoneCode = req.body.zone_code;
//   description = req.body.description;
//   




//   Zone.findOne({
//     $and: [
//       { organisation_id: organisation_id },
//       { zone_name: zoneName },
//       { _id: zoneId }

//     ]
//   })
//     .select(" ")
//     .exec(function (err, doc) {
//       var response = {
//         status: 200,
//         message: doc,
//       };

//       if (err) {
//         
//         response.status = 500;
//         response.message = err;
//       } else if (doc == null) {
//         res;
//         response.status = 404;
//         response.message = {
//           message: "zone ID not found",
//         };
//       }
//       if (response.status !== 200) {
//         Zone.findOne({})
//         res.status(response.status).json(response.message);
//       }
//       else {
//         //Update columns like this here
//         doc.zone_code = req.body.zone_code;
//         doc.zone_name = req.body.zone_name;
//         doc.description = req.body.description;

//         doc.save(function (err, zoneUpdated) {
//           if (err) {
//             res.status(500).json(err);
//           }
//           else {

//             
//           // var msg='Zone Name and Code Already Exists'+''+zone;
//           // res.json(zone);
//           res.status(204).json(zoneUpdated);
//           }
//         });

//       }
//     });
// }; 





// module.exports.zoneUpdateOne = function (req, res) {
//   var zoneId = req.body.zone_id;
//   organisation_id = req.body.organisation_id;
//   zoneName = req.body.zone_name;
//   zoneCode = req.body.zone_code;
//   description = req.body.description;
//   




//   Zone.findOne({
//     $and: [
//       { organisation_id: organisation_id },
//       { zone_name: zoneName },
//       { _id: zoneId }

//     ]
//   })
//     .select(" ")
//     .exec(function (err, doc) {
//       var response = {
//         status: 200,
//         message: doc,
//       };

//       if (err) {
//         
//         response.status = 500;
//         response.message = err;
//       } else if(doc != null){
//         zone_name = req.body.zone_name;
//         Zone.find({zone_name:zone_name}).exec(function (err, doc) {
//           var response = {
//             status: 200,
//             message: doc,
//           };

//       })
//       else {
//         //Update columns like this here
//         doc.zone_code = req.body.zone_code;
//         doc.zone_name = req.body.zone_name;
//         doc.description = req.body.description;

//         doc.save(function (err, zoneUpdated) {
//           if (err) {
//             res.status(500).json(err);
//           }
//           else {

//             
//           // var msg='Zone Name and Code Already Exists'+''+zone;
//           // res.json(zone);
//           res.status(204).json(zoneUpdated);
//           }
//         });

//       }
//     });
// }; 




// module.exports.zoneAddOne = function (req, res) {
//   organisation_id = req.body.organisation_id;
//   zoneName = req.body.zone_name;
//   zoneCode = req.body.zone_code;
//   description = req.body.description;
//   Zone.findOne({
//     $and: [
//       { organisation_id: organisation_id },
//       {  zone_code: zoneCode} 
//   ]

//   })

//     .exec(function (err, zone) {
//       if (err) {
//       }
//       else {
//         
//         if (zone == null || zone == []) {
//           
//           Zone.create(
//             {
//               // clientId: req.body.clientId,
//               zone_code: zoneCode,
//               zone_name: zoneName,
//               description: description,
//               organisation_id: organisation_id,
//             },
//             function (errs, returnzonevalue) {
//               if (errs) {
//                 
//                 res.status(400).json(errs);
//               } else {
//                 
//                 res.status(201).json(returnzonevalue);
//               }
//             }
//           );
//         }
//         else {
//           
//           res.status(204).json(zone);
//         }
//       }
//     });
// };







// module.exports.zoneAddOne = function (req, res) {

//   // organisation_id = req.body.organisation_id;
//   // zoneName = req.body.zone_name;
//   // zoneCode = req.body.zone_code;
//   // description = req.body.description;

//   if (req.body.zone_code !="") {
//     
//     Zone.findOne({
//       $and: [
//         { organisation_id: organisation_id },
//         { $or: [{ zone_code: req.body.zone_code }, { zone_name: req.body.zone_name }] },

//       ]

//     })

//       .exec(function (err, zone) {
//         if (err) {
//         }
//         else {
//           
//           if (zone == null || zone == []) {
//             
//             Zone.create(
//               {
//                 // clientId: req.body.clientId,
//                 zone_code: req.body.zone_code,
//                 zone_name: req.body.zone_name,
//                 description: req.body.description,
//                 organisation_id: req.body.organisation_id,
//               },
//               function (errs, returnzonevalue) {
//                 if (errs) {
//                   
//                   res.status(400).json(errs);
//                 } else {
//                   
//                   res.status(201).json(returnzonevalue);
//                 }
//               }
//             );
//           }
//           else {
//             
//             res.status(204).json(zone);
//           }
//         }
//       });
//   } else {
//     
//     Zone.findOne({
//       $and: [
//         { organisation_id: req.body.organisation_id },
//         { zone_name: req.body.zone_name },
//       ]
//     })

//       .exec(function (err, zones) {
//         if (err) {

//         }
//         else {
//           
//           if (zones == null || zones == []) {
//             var zoneCodes = getZoneCode(req.body.zone_name);
//             var zoneUniqueCode;
//             var uniqCode;
//             LastCode.findOne({ organisation_id: req.body.organisation_id })
//               .exec(function (err, lastCode) {
//                 var lastCodeUpdated;
//                 if (err) {
//                   
//                 } else {
//                   if (lastCode == null) {
//                     lastCode = 0;
//                     
//                     lastCodeUpdated = 1;
//                     LastCode.create(
//                       {
//                         organisation_id: req.body.organisation_id,
//                         zoneLastCode: 1
//                       },
//                       function (err, lastCode) {
//                         if (err) {
//                           
//                         } else {
//                           
//                         }
//                       }
//                     );
//                   } else {
//                     
//                     lastCodeUpdated = lastCode.zoneLastCode + 1;
//                   }
//                   
//                   var str = lastCodeUpdated.toString();
//                   var pad = "0000";
//                   zoneUniqueCode = pad.substring(0, pad.length - str.length) + str;

//                   
//                   uniqCode = zoneCodes + "-" + zoneUniqueCode;
//                   


//                   Zone.create(
//                     {
//                       zone_name: req.body.zone_name,
//                       zone_code: uniqCode,
//                       description: req.body.description,
//                       organisation_id: req.body.organisation_id,
//                     },
//                     function (err, zonev) {

//                       if (err) {
//                         
//                         res.status(400).json(err);
//                       } else {
//                         
//                         LastCode.findOne({
//                           organisation_id: req.body.organisation_id,
//                         }).exec(function (err, lastCode) {
//                           if (err) {
//                             // res.status(400).json(err)
//                             
//                           } else {
//                             //  res.status(200).json(lastCode)
//                             if (lastCode == null) {
//                               
//                             } else {
//                               lastCode.zoneLastCode = zoneUniqueCode;
//                               lastCode.save(function (err, zoneUniqueCode) {
//                                 if (err) {
//                                   
//                                 } else {
//                                   
//                                 }
//                               });
//                               
//                             }
//                           }
//                         });
//                         res.status(201).json(zonev);
//                       }
//                     }
//                   );
//                 }
//               });

//           }
//           else {
//             
//             res.status(204).json(zone);
//           }
//         }
//       })

//   }
// };





module.exports.zoneAddOne = function (req, res) {

  if (req.body.zone_code != "") {
    
    Zone.findOne({
      $and: [
        { organisation_id: req.body.organisation_id },
        { $or: [{ zone_code: req.body.zone_code }, { zone_name: req.body.zone_name }] },
      ]
    })

      .exec(function (err, zones) {
        if (err) {
          
        }
        else {
          
          if (zones == null || zones == [] ||zones== true) {
            
            Zone.create(
              {
                zone_code: req.body.zone_code,
                                zone_name: req.body.zone_name,
                                description: req.body.description,
                                organisation_id: req.body.organisation_id,
              },
              function (errs, returnzonevalue) {
                if (errs) {
                  
                  res.status(400).json(errs);
                } else {
                  
                  res.status(201).json(returnzonevalue);
                }
              }
            );
          }
          else {
            
            res.status(204).json(zones);
          }
        }
      })
  } else {

    Zone.findOne({
      $and: [
        { organisation_id: req.body.organisation_id },
        { zone_name: req.body.zone_name },
      ]
    })

      .exec(function (err, zns) {
        if (err) {

        }
        else {
          
          if (zns == null || zns == []) {
            var zoneCode = getZoneCode(req.body.zone_name);
            var zoneUniqueCode;
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
                        zoneLastCode: 1
                      },
                      function (err, lastCode) {
                        if (err) {
                          
                        } else {
                          
                        }
                      }
                    );
                  } else {
                    lastCodeUpdated = lastCode.zoneLastCode + 1;
                  }
                  
                  var str = lastCodeUpdated.toString();
                  var pad = "0000";
                  zoneUniqueCode = pad.substring(0, pad.length - str.length) + str;

                  
                  uniqCode = zoneCode + "-" + zoneUniqueCode;
                  


                  Zone.create(
                    {
                      zone_name: req.body.zone_name,
                      zone_code: uniqCode,
                      description: req.body.description,
                      organisation_id: req.body.organisation_id,
                    },
                    function (err, zone) {

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
                              lastCode.zoneLastCode = zoneUniqueCode;
                              lastCode.save(function (err, zoneUniqueCode) {
                                if (err) {
                                  
                                } else {
                                  
                                }
                              });
                              
                            }
                          }
                        });
                        res.status(201).json(zone);
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
