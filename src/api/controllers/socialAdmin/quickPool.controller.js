const QuickPool = require("./../../models/socialAdmin/quickPool.model");
const lastPoolDetails = require("./../../models/socialAdmin/poolDetails.model");
const { response } = require("express");

//Function to get QuickPool by org id (Get)
module.exports.getAllQuickPoolByOrgId = async function (req, res) {
  var offset = 0;
  var count = 1;
  var maxCount = 1;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 1);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 1);
  }

  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({
      message: "If supplied in querystring count and offset should be a number",
    });
    return;
  }

  if (count > maxCount) {
    res.status(400).json({
      message: "Count limit of " + maxCount + " exceeded",
    });
    return;
  }

  // 
  const { emp_id } = req.params;
  let currentDate = new Date(req.params.date);
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month].join("-");
  }
  md = formatDate(currentDate);

  try {
    const quickPool = await QuickPool.find({
      endDate: { $regex: md },
      //endDate: { $gt: new Date() },
      organisation_id: req.params.organisation_id,
      //visible: true,
    })
      .skip(offset)
      .limit(count)
      .sort({ updatedAt: -1 })
      .lean();
    //
    let result = [];
    for (let pool of quickPool) {
      let lastPoolDetail = await lastPoolDetails
        .findOne({ question_id: pool._id, empId: emp_id })
        .lean();
      if (
        lastPoolDetail &&
        JSON.stringify(pool._id) == JSON.stringify(lastPoolDetail.question_id)
      ) {
        pool.selectedOption = lastPoolDetail.option;
        result.push(pool);
      } else {
        pool.selectedOption = null;
        result.push(pool);
      }
    }
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getAllQuickPoolAdminByOrgId = async function (req, res) {
  let currentDate = new Date(req.params.date);
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month].join("-");
  }
  md = formatDate(currentDate);

  try {
    const quickPool = await QuickPool.find({
      endDate: { $regex: md },
      organisation_id: req.params.organisation_id,
    })
      .sort({ updatedAt: -1 })
      //.limit(1)
      .lean();

    res.json(quickPool);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Function to get QuickPool by Enddate (Get)
module.exports.getQuickPoolByEndDate = function (req, res) {
  QuickPool.find({ endDate: req.body.endDate }).exec(function (err, quickPool) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(quickPool);
    }
  });
};

//Function to get QuickPool (Get)
module.exports.getAllQuickPool = function (req, res) {
  QuickPool.find().exec(function (err, quickPool) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(quickPool);
    }
  });
};

//Function to create QuickPool(Insert)
module.exports.insertQuickPool = function (req, res) {
  
  const { organisation_id, date } = req.body;
  const {
    question,
    option1,
    option2,
    option3,
    option4,
    quickPoolLocation,
    selectedDate,
  } = req.body;
  QuickPool.create(
    {
      endDate: selectedDate,
      endTime: quickPoolLocation,
      question,
      organisation_id,
      date,
      option1: { name: option1 },
      option2: { name: option2 },
      option3: { name: option3 },
      option4: { name: option4 },
    },
    function (err, quickPool) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.status(200).json(quickPool);
      }
    }
  );
};

module.exports.userQuickPollUpdate = async function (req, res) {
  let { selectedQuestions } = req.body;
  
  try {
    for (let poll of selectedQuestions) {
      await QuickPool.updateMany(
        // { _id: { $in: selectedQuestions } },
        { _id: poll },
        {
          visible: true,
        },
        { multi: true }
      );
    }
    res.status(200).json("Data updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
  return true;
};

//Module  to create a pool
module.exports.insertPollDetails = function (req, res) {
  

  lastPoolDetails.create(
    {
      question: req.body.question,
      question_id: req.body.question_id,
      empId: req.body.empId,
      option: req.body.option,
      organisation_id: req.body.organisation_id,
    },
    function (err, result) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(result);
      }
    }
  );
};

//Employee pool voting status
// module.exports.employeePoolVotingStatus = function (req,res)
// {

//   lastPoolDetails.find({$and:[{question_id:req.params.question_id},{empId:req.params.emp_id}]})
//   .exec(function(err,lastpool){
//     if(err){
//       
//       res.status(500).json(err);
//     }else{
//       
//       res.status(200).json(lastpool);
//     }
//   });
// };

//Employee pool voting percentage
module.exports.employeePoolVotingPercentage = function (req, res) {
  lastPoolDetails
    .find({ question_id: req.params.question_id })
    .exec(function (err, lastpool) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.status(200).json(lastpool);
      }
    });
};

// Function to get pool Details by results

module.exports.getPoolDetailsByResults = function (req, res) {
  const _id = req.params.question_id;

  lastPoolDetails
    .aggregate([

      { $match: { question_id: req.params.question_id } },
      { $sort: { updatedAt: -1 } },
      {
        $group: {
          _id: "$option",
          count: { $sum: 1 },
          // sum : { $sum: option1.name},
        },
      },
      
    ])

    .exec(function (err, lastpool) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.status(200).json(lastpool);
      }
    });
  // 
};
// module.exports.poolResults = async function (req, res) {

//   let teamemployeelist = await ClockInOut.aggregate([
//       {
//           $lookup: {
//               from: "employees",
//               localField: "employeeId",
//               foreignField: "EmpCognitoID",
//               as: "employeedata"
//           }
//       },
//       {
//           $match: { organisation_id: req.params.organisation_id, clockInOutDate: req.params.date }
//       },
//       {
//           $group: { _id: "$employeeId", clockIn: { $first: "$clockIn" }, clockOut: { $last: "$clockOut" }, location: { $addToSet: "$clockInLatLang" }, totalWorkHrs: { $sum: "$totalHours" }, employeedata: { $addToSet: "$employeedata" }, name: { $first: "$employeedata.name" } }
//       }

//   ])

//   if (teamemployeelist.err) {
//       
//   }
//   else {
//       

//       res.json(teamemployeelist)
//   }
// }

// module.exports.PoolDetailUpdate = function (req, res) {
//   var EventId = req.params.EventId;

//   Event.findById(EventId)
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
//       } else if (!doc) {
//         res;
//         response.status = 404;
//         response.message = {
//           message: "Event ID not found",
//         };
//       }
//       if (response.status !== 200) {
//         res.status(response.status).json(response.message);
//       } else {
//         //Update columns like this here
//         doc.date = new Date(req.body.date).toDateString(),
//         doc.location = req.body.location;
//         doc.eventHeader = req.body.eventHeader;
//         doc.eventSubHeader = req.body.eventSubHeader;
//         doc.eventImgUrls = req.body.eventFileUrl;
//         doc.status =req.body.status;
//         doc.save(function (err, userEventUpdated) {
//           if (err) {
//             res.status(500).json(err);
//           } else {
//             res.status(204).json();
//           }
//         });
//       }
//     });
// };
