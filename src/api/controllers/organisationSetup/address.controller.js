// var mongoose = require('mongoose');
var axios = require('axios');
const Address = require("../../models/organisationSetup/address.model");
const LastCode = require("../../models/lastCode/lastCode.model");

const Employee=require('../../models/employee/employee.model')
const getLocationCode = (LocationName) => {
  let locationCode = LocationName.substring(0, 3).toUpperCase();
  
  return locationCode;
};



module.exports.addressAutocomplete = async (req, res) => {

  const API_KEY = 'AIzaSyDkVgluEYbBWvaNVig7eIO3PHK--IgUOSk';
  const input = req.body.input;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&key=${API_KEY}`;
  

  const res1 = await axios.get(url)
  res.status(200).json(res1.data.predictions)
  
}

//Get Address list using organization id
module.exports.getAllAddressOrganizationId = function (req, res) {
  Address.find({ organisation_id: req.params.organisation_id })
    .sort({ updatedAt: -1 })
    .exec(function (err, address) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(address);
      }
    });
};
//Get Single Address using address id and organization id
module.exports.getOneAddressOrganizationId = function (req, res) {
  var addressId = req.params.addressId;
  var organisation_id = req.params.organisation_id;
  

  Address.find({ _id: addressId, organisation_id: organisation_id }).exec(
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
          message: "Address ID not found",
        };
      }
      res.status(response.status).json(response.message);
    }
  );
};

////////

//Get Address list
module.exports.getAllAddress = function (req, res) {
  Address.find().exec(function (err, address) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(address);
    }
  });
};
//Get Single Address
module.exports.getOneAddress = function (req, res) {
  var _id = req.params.addressId;
  

  Address.findById(_id).exec(function (err, doc) {
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
        message: "Address ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

//Add a new Address
// module.exports.addressAddOne = function (req, res) {
//   
//   Address.create(
//     {
//       // clientId: req.body.clientId,
//       add_line_1: req.body.add_line_1,
//       add_line_2: req.body.add_line_2,
//       city: req.body.city,
//       country: req.body.country,
//       state: req.body.state,
//       pincode: req.body.pincode,
//       add_type: req.body.add_type,
//       //   organisationID: req.body.organisationID,
//       organisation_id: req.body.organisation_id,
//       name: req.body.name,
//       code: req.body.code,
//       latitude: req.body.latitude,
//       longitude: req.body.longitude,
//     },
//     function (err, address) {
//       if (err) {
//         
//         res.status(400).json(err);
//       } else {
//         
//         res.status(201).json(address);
//       }
//     }
//   );
// };

module.exports.addressUpdateOne = function (req, res) {
  var _id = req.body._id;
  

  Address.findById(_id)
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
          message: "address ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        // doc.add_line_1 = req.body.add_line_1;
        // doc.add_line_2 = req.body.add_line_2;
        doc.city = req.body.city;
        // doc.country = req.body.country;
        // doc.state = req.body.state;
        doc.pincode = req.body.pincode;
        // doc.add_type = req.body.add_type;
        //doc.organisationID = req.body.organisationID;
        doc.organisation_id = req.body.organisation_id;
        doc.name = req.body.name;
        doc.code = req.body.code;
        doc.latitude = req.body.latitude;
        doc.longitude = req.body.longitude;

        doc.save(function (err, addressUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(204).json(addressUpdated);
          }
        });
      }
    });
};

//Create bulk Address
module.exports.addressBulkCreate = function (req, res) {
  

  Address.insertMany(req.body)
    .then(function () {
      
    })
    .catch(function (error) {
      
    });
};

module.exports.addressDeleteOne = function (req, res) {
  var addressId = req.params.addressId;

  Address.findByIdAndRemove(addressId).exec(function (err, address) {
    if (err) {
      res.status(404).json(err);
    } else {
      
      res.status(204).json();
    }
  });
};




module.exports.addressAddOne = function (req, res) {

  if (req.body.code != "") {
    
    Address.findOne({
      $and: [
        { organisation_id: req.body.organisation_id },
        { $or: [{ code: req.body.code }, { name: req.body.name }] },
      ]
    })

      .exec(function (err, address) {
        if (err) {
          
        }
        else {
          
          if (address == null || address == []) {
            
            Address.create(
              {
                code: req.body.code,
                name: req.body.name,
                city: req.body.city,
                add_line_1: req.body.add_line_1,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                organisation_id: req.body.organisation_id,
              },
              function (errs, returnaddvalue) {
                if (errs) {
                  
                  res.status(400).json(errs);
                } else {
                  
                  res.status(201).json(returnaddvalue);
                }
              }
            );
          }
          else {
            
            res.status(204).json(address);
          }
        }
      })
  } else {

    Address.findOne({
      $and: [
        { organisation_id: req.body.organisation_id },
        { name: req.body.name },
      ]
    })

      .exec(function (err, addrss) {
        if (err) {

        }
        else {
          
          if (addrss == null || addrss == []) {
            var addCode = getLocationCode(req.body.name);
            var addUniqueCode;
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
                        locationLastCode: 1
                      },
                      function (err, lastCode) {
                        if (err) {
                          
                        } else {
                          
                        }
                      }
                    );
                  } else {
                    lastCodeUpdated = lastCode.locationLastCode + 1;
                  }
                  
                  var str = lastCodeUpdated.toString();
                  var pad = "0000";
                  addUniqueCode = pad.substring(0, pad.length - str.length) + str;

                  
                  uniqCode = addCode + "-" + addUniqueCode;
                  


                  Address.create(
                    {
                      name: req.body.name,
                      code: uniqCode,
                      city: req.body.city,
                      add_line_1: req.body.add_line_1,
                      latitude: req.body.latitude,
                      longitude: req.body.longitude,
                      organisation_id: req.body.organisation_id,
                    },
                    function (err, addresss) {

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
                              lastCode.locationLastCode = addUniqueCode;
                              lastCode.save(function (err, addUniqueCode) {
                                if (err) {
                                  
                                } else {
                                  
                                }
                              });
                              
                            }
                          }
                        });
                        res.status(201).json(addresss);
                      }
                    }
                  );
                }
              });

          }
          else {
            
            res.status(204).json(addrss);
          }
        }
      })

  }
};
