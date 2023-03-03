const Event = require("../../models/socialAdmin/events.model");
const utils = require("../../utils/utility");

//To Get Events by Date Filter

module.exports.getEventsByDate = function (req, res) {
  Event.find({ date: req.body.date }, function (err, events) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(events);
    }
  });
};

// To Get events by organization id and date
module.exports.getEventsByOrgIdAndDate = function (req, res) {
  
  Event.find({
    $and: [
      { organisation_id: req.params.organisation_id },
      { date: req.params.date },
    ],
  }).exec(function (err, Events) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.status(200).json(Events);
    }
  });
};

//To Get Events by organisation id
module.exports.getAllEventsByOrgId = function (req, res) {
  
  Event.find({
    organisation_id: req.params.organisation_id,
    visibility: "true",
  })
    .lean()
    .exec(function (err, events) {
      if (err) {
        // 
        res.status(500).json(err);
      } else {
        // 
        const updatedEvents = events.map((item) => {
          let files = [...item.eventImgUrls, ...item.eventVideoUrls];
          let suffleFiles = utils.suffleData(files);
          
          item["suffleFiles"] = suffleFiles;
          
          return item;
        });
        
        res.json(updatedEvents);
      }
    });
};

// To Get Events
module.exports.getEvents = function (req, res) {
  Event.find().exec(function (err, Events) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(Events);
    }
  });
};

// To get Upcomming events

//To Get Previous Events

// To Post Events (insert)
module.exports.insertEvents = function (req, res) {
  
  let myDate = new Date(req.body.date);
  Event.create(
    {
      date: myDate.toDateString(),
      location: req.body.location,
      eventHeader: req.body.eventHeader,
      eventSubHeader: req.body.eventSubHeader,
      eventImgUrls: req.body.eventFileUrl,
      eventVideoUrls: req.body.eventVideoUrls,
      visibility: "true",
      organisation_id: req.body.organisation_id,
      // employeeId: req.body.employeeId,
    },
    function (err, event) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(event);
      }
    }
  );
};

module.exports.userVisibilityUpdate = async function (req, res) {
  let { eventVisibility } = req.body;
  
  try {
    for (let event of eventVisibility) {
      await Event.updateOne(
        { _id: event._id },
        {
          visibility: event.visibility,
        }
      );
    }
    res.status(200).json("Data updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
  return true;
};

module.exports.userEventUpdate = function (req, res) {
  var eventId = req.params.eventId;
  
  Event.findById(eventId)
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
          message: "Event ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        (doc.date = new Date(req.body.date).toDateString()),
          (doc.location = req.body.location);
        doc.eventHeader = req.body.eventHeader;
        doc.eventSubHeader = req.body.eventSubHeader;
        doc.eventImgUrls = req.body.eventImgUrls;
        doc.status = req.body.status;
        doc.visibility = req.body.visibility;
        doc.save(function (err, userEventUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(204).json(userEventUpdated);
          }
        });
      }
    });
};

module.exports.deleteEventAnnoucment = function (req, res) {
  var eventId = req.params.eventId;

  Event.findByIdAndRemove(eventId).exec(function (err, Event) {
    if (err) {
      res.status(404).json(err);
    } else {
      console.log("Event List Deleted, id", eventId);
      res.status(204).json();
    }
  });
};
