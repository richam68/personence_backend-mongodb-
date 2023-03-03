// var mongoose = require('mongoose');
const Clients = require('../../models/client/client.model');
const ClientMeeting = require('../../models/client/clientMeeting.modle');
const Employee = require('../../models/employee/employee.model')
const ClientList= require('../../models/client/clientList.model')
const Prospect = require("../../models/client/prospect.model");
var NodeGeocoder = require('node-geocoder')
const mongoose = require('mongoose')
const moment = require('moment-timezone')

//this function is used for Get All Client  by organisationID
module.exports.getClientByOrg_Id = function (req, res) {
  var organisationID = req.params.organisationID;
  

  Clients
    .find({ organisation_id: organisationID })
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
          "message": "organisationID ID not found"
        };
      }
      res
        .status(response.status)
        .json(response.message);

    });

};

//Add a new client details
module.exports.createClient = function (req, res) {
  
  Clients
    .create({
      status: req.body.status,
      client_name: req.body.client_name,
      email: req.body.email,
      client_image: req.body.client_image,
      client_code: req.body.client_code,
      address1: req.body.address1,
      line_2: req.body.line_2,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      phone_number: req.body.phone_number,
      mobile_number: req.body.mobile_number,
      website: req.body.website,
      pan: req.body.pan,
      tan: req.body.tan,
      gstin: req.body.gstin,
      industry: req.body.industry,
      organisation_id: req.body.organisation_id
    },
      function (err, clients) {
        if (err) {
          
          res
            .status(400)
            .json(err);
        } else {
          
          res
            .status(201)
            .json(clients);
        }
      });
};

//Update client
module.exports.updateClient = function (req, res) {
  var client_id = req.body._id;
  

  Clients
    .findById(client_id)
    .select(" ")
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
          "message": "client ID not found"
        };
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        doc.status = req.body.status,
          doc.client_name = req.body.client_name;
        doc.email = req.body.email,
          doc.client_image = req.body.client_image,
          doc.client_code = req.body.client_code,
          doc.address1 = req.body.address1,
          doc.line_2 = req.body.line_2,
          doc.country = req.body.country,
          doc.state = req.body.state,
          doc.city = req.body.city,
          doc.phone_number = req.body.phone_number,
          doc.mobile_number = req.body.mobile_number,
          doc.website = req.body.website,
          doc.pan = req.body.pan,
          doc.tan = req.body.tan,
          doc.gstin = req.body.gstin,
          doc.industry = req.body.industry,
          doc.organisation_id = req.body.organisation_id
        doc.save(function (err, clientUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);

          } else {
            Employee.updateMany({ client_id: client_id }, { client_name: req.body.client_name })

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

//To Delete an Single Client
module.exports.clientDeleteOne = function (req, res) {
  var client_id = req.params.client_id;

  Clients
    .findByIdAndRemove(client_id)
    .exec(function (err, client) {
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        
        res
          .status(204)
          .json();
      }
    });
};

//To Create ClientMeetings 
module.exports.createClientMeetings = async function (req, res) {
  try {
    
    var options = {
      provider: 'google',
      httpAdapter: 'https',
      apiKey: 'AIzaSyCUi5YXbyXl7PcXttFlvZb1EpmaUF25cJk',
      formatter: null
    };

    var geocoder = NodeGeocoder(options)

    const clockInAddress = async () => {
      return await geocoder.reverse({ lat: req.body.locationInLatLong.latitude, lon: req.body.locationInLatLong.longitude })
    }

    console.log( 'clockinout addresssssssss:', await clockInAddress())
    const { date, timeIn,locationInLatLong, locationIn , imgUrlIn,organisation_id, employee_id } = req.body;
    if (!(date && timeIn && organisation_id && employee_id)) {
      res.status(400).json("One Field is Missing");
    }
     ClientMeeting.create({ 
      date:date, timeIn:moment.tz(new Date(), "Asia/Kolkata"),
       locationInLatLong:locationInLatLong,
       locationIn:locationInLatLong == undefined ? '' : await clockInAddress()
       , imgUrlIn:imgUrlIn, organisation_id:organisation_id, employee_id:employee_id
    } ,function (err, data) {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {

        res.json(data)
      }
    }
);

  }
  catch (err) {
    
  }
}

//To Get all Meetings of one employee By Organization_id && employee_id
module.exports.GetMeeting = function (req, res) {

  ClientMeeting.find({ organisation_id: req.params.organisation_id,employee_id:req.params.employee_id,date:req.params.date})
    .exec(function (err, ClientMeetings) {
      if (err) {
        
        res.status(500).json(err);
      }
      else {
        
        res.json(ClientMeetings);
      }
    });
};

//To Edit The Client's Meetings
module.exports.updateClientMeetings =  function (req, res) {
 
     ClientMeeting.findById(req.body._id)
     .exec ( async function (err, doc) {
      try {
        if (err) {        
          res.json(err);
        }
        else {
          var options = {
            provider: 'google',
  
            httpAdapter: 'https',
            apiKey: 'AIzaSyCUi5YXbyXl7PcXttFlvZb1EpmaUF25cJk',
            formatter: null
          };
        
          var geocoder = NodeGeocoder(options)
  
          const clockOutAddress = async () => {
            return await geocoder.reverse({ lat: req.body.locationOutLatLong.latitude, lon: req.body.locationOutLatLong.longitude })
          }
        
            doc.timeOut = req.body.timeOut,
            doc.locationOutLatLong=req.body.locationOutLatLong,
            doc.locationOut = req.body.locationOutLatLong == undefined ? '' : await clockOutAddress(),
            doc.imgUrlOut = req.body.imgUrlOut,
            doc.client_name = req.body.client_name,
            doc.contactPersonName = req.body.contactPersonName,
            doc.minutesOfTheMeeting = req.body.minutesOfTheMeeting
            doc.save( function (err, meetingdetails) {
            if (err) {
              res
                .status(500)
                .json(err)
            }
            else {       
              res.json(meetingdetails);
            }
          });
  
        }
      } catch (error) {
        console.log('in meeting save catch block',error)
      }
    
    })
};

// //Module to Delete Client's Meeting
module.exports.deleteClientMeeting = function (req, res) {
  const organisation_id = req.params.organisation_id;
  ClientMeeting.deleteOne({ organisation_id: organisation_id })
    .exec(function (err, organisation_id) {
      if (err) {
        res.status(404).json(err);

      }
      else {
        let message = "Client Meetings Deleted"    
        res.status(404).json(message)
      }
    });

};

//Add a new client for meeting List 
module.exports.createClientList = function (req, res) {
  
  ClientList
    .create({
      status: req.body.status,
      client_name: req.body.client_name,
      email: req.body.email,
      client_image: req.body.client_image,
      client_code: req.body.client_code,
      address1: req.body.address1,
      line_2: req.body.line_2,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      phone_number: req.body.phone_number,
      mobile_number: req.body.mobile_number,
      website: req.body.website,
      pan: req.body.pan,
      tan: req.body.tan,
      gstin: req.body.gstin,
      industry: req.body.industry,
      organisation_id: req.body.organisation_id,
      contact_person: req.body.contact_person
    },
      function (err, clients) {
        if (err) {  
          res
            .status(400)
            .json(err);
        } else {
          res
            .status(201)
            .json(clients);
        }
      });
};

//this function is used for Get All ClientList  by organisationID for Meeting
module.exports.getClientListByOrg_Id = function (req, res) {
  var organisationID = req.params.organisation_id;
  ClientList
    .find({ organisation_id: organisationID })
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
          "message": "organisationID ID not found"
        };
      }
      res
        .status(response.status)
        .json(response.message);

    });

};


// To create client meeting prospect Prospect

//To Create ClientMeetings
module.exports.createClientMeetingProspect = async function (req, res) {
  try {
    const {
      status,
      prospect_name,
      location,
      contact_number,
      email,
      spoc_person,
      organisation_id,
    } = req.body;

    const User = await Prospect.create({
      status,
      prospect_name,
      location,
      contact_number,
      email,
      spoc_person,
      organisation_id,
    });

    res.status(200).json(User);
  } catch (err) {
    res.status(400).json(err);
  }
};


//To Get all Meetings Prospect List By Organization_id 
module.exports.GetMeetingProspectList = function (req, res) {
   try {
    Prospect.find({ organisation_id: req.params.organisation_id})
    .exec(function (err, ProspectList) {
      if (err) {
        
        res.status(500).json(err);
      }
      else {
        
        res.json(ProspectList);
      }
    });
   } catch (error) {
    
   }
  
};



//this function is used for get client list contact_person by org_id(Meeting)
module.exports.getAllClientContact = function (req, res) {
  var contact_person = req.params.contact_person;
  ClientList
    .find({contact_person:contact_person})
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
          "message": "contact_person not found"
        };
      }
      res
        .status(response.status)
        .json(response.message);

    });

};



//This function created for Edit The Client's List Meetings and contacts
module.exports.updateClientList = function (req, res) {
    ClientList.findById(req.body._id)
    .exec (  function (err, doc) {
      try {
     if (err) {
       res
         .status(400)
         .json(err);
     }
     else { 
       console.log('in update statuement',req.body)
       console.log('in update statuement doc',doc)
         doc.status = req.body.status,
         doc.client_name=req.body.client_name,
         doc.email = req.body.email,
         doc.client_image = req.body.client_image,
         doc.client_code = req.body.client_code,
         doc.address1 = req.body.address1,
         doc.line_2 = req.body.line_2
         doc.country = req.body.country,
         doc.state=req.body.state,
         doc.city = req.body.city,
         doc.phone_number = req.body.phone_number,
         doc.mobile_number = req.body.mobile_number,
         doc.website = req.body.website,
         doc.pan = req.body.pan
         doc.tan = req.body.tan,
         doc.gstin = req.body.gstin,
         doc.industry = req.body.industry,
         doc.organisation_id = req.body.organisation_id,
         doc.contact_person = req.body.contact_person
         doc.save( function (err, UpdatedData) {
         if (err) {
           res
             .status(500)
             .json(err)
         }
         else {
           res.json(UpdatedData);
         }
       });
     }
    }
    catch (error) {
      console.log('in meeting save catch block',error)
    }
   })
};