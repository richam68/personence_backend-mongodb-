const EventList = require("../../models/socialAdmin/eventList.model");

//To Get Events by Date Filter
module.exports.getEventListByDate = function (req, res) {
  EventList.find({ date: req.body.date }, function (err, eventList) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(eventList);
    }
  });
};

// To Get events by organization id and date
module.exports.getEventListByOrgIdAndDate = function (req, res) {
  
  EventList.find({
    $and: [
      { organisation_id: req.params.organisation_id },
      { date: req.params.date },
    ],
  }).exec(function (err, EventList) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.status(200).json(EventList);
    }
  });
};

//To Get Events by organisation id
module.exports.getAllEventListByOrgId = function (req, res) {
  
  EventList.find({ organisation_id: req.params.organisation_id }).exec(
    function (err, EventList) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(EventList);
      }
    }
  );
};

// To Get Events
module.exports.getEventList = function (req, res) {
  EventList.find().exec(function (err, EventList) {
    if (err) {
      
      res(500).json(err);
    } else {
      
      res.json(EventList);
    }
  });
};

module.exports.insertEventList = function (req, res) {
  
  EventList.create(
    {
      date: new Date(req.body.date).toDateString(),
      location: req.body.location,
      eventHeader: req.body.eventHeader,
      eventSubHeader: req.body.eventSubHeader,
      eventImgUrls: req.body.eventFileUrl,
      organisation_id: req.body.organisation_id,
      // employeeId: req.body.employeeId,
    },
    function (err, eventList) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(eventList);
      }
    }
  );
};
