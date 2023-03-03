// var mongoose = require('mongoose');
const WarmWelcome = require("../../models/socialAdmin/warmWelcome.model");
const Employee = require("../../models/employee/employee.model");

//Get All Warm Welcome
module.exports.getAllWarmWel = function (req, res) {
  WarmWelcome.find().exec(function (err, WarmWelcome) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(WarmWelcome);
    }
  });
};

// Function used for create quotes  (insert)
module.exports.insertWarmWel = function (req, res) {
  

  WarmWelcome.create(
    {
      date: req.body.date,
      employeeId: req.body.employeeId,
      organisation_id: req.body.organisation_id,
      days: req.body.days,
    },
    function (err, warmWelcome) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(warmWelcome);
      }
    }
  );
};

const getorgDays = async (organisation_id) => {

  try {
    let day = await WarmWelcome.aggregate([
      {
        $match: { organisation_id: organisation_id },
      },
      { $sort: { updatedAt: -1 } },
    ]);
  
    return day && day[0].days;
  } catch (error) { 
  }
};

//Get All Warm Welcome by Date
module.exports.getAllWarmWelcomeByDate = async function (req, res) {
  let orgdays = await getorgDays(req.params.organisation_id);

  let day = orgdays || 0;

  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - day);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  currentDate = formatDate(currentDate);
  Employee.find({
    $and: [
      {
        organisation_id: req.params.organisation_id,
        joining_date: { $gte: currentDate },
      },
    ],
  })
    .sort({ createdAt: -1 })
    .exec(function (err, WarmWelcome) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(WarmWelcome);
      }
    });
};

module.exports.getAllWarmWelcomeByOrgId = function (req, res) {
  
  WarmWelcome.find({ organisation_id: req.params.organisation_id }).exec(
    function (err, Warm) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(Warm);
      }
    }
  );
};
