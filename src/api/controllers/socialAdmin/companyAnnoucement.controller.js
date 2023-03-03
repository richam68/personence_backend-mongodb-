// var mongoose = require('mongoose');
const CompanyAnnoucement = require("../../models/socialAdmin/companyAnnoucements.model");

//Get All Company Announcement
module.exports.getAllCompAnnoucement = function (req, res) {
  CompanyAnnoucement.find().exec(function (err, CompanyAnnoucement) {
    if (err) {
      
      res.status(500).json(err);
    } else {
      
      res.json(CompanyAnnoucement);
    }
  });
};

// Function used for create Company Announcement  (insert)
module.exports.insertCompAnnoucement = function (req, res) {
  
  // const { date, organisation_id, companyDraftToHtml} = req.body
  CompanyAnnoucement.insertMany(
    req.body,
    {
      visibile: "true",
    },
    function (err, companyAnnoucements) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.status(201).json(companyAnnoucements);
      }
    }
  );
};

module.exports.companyVisibilityUpdate = async function (req, res) {
  let { companyVisibility } = req.body;
  
  try {
    for (let company of companyVisibility) {
      await CompanyAnnoucement.updateOne(
        { _id: company._id },
        {
          visibile: company.visibile,
        }
      );
    }
    res.status(200).json("Data updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
  return true;
};

//Function used for get updates using date filter)
module.exports.getCompAnnoucementByDate = function (req, res) {
  // const {date, organisation_id}  = req.params
  // 
  CompanyAnnoucement.find({
    organisation_id: req.params.organisation_id,
    //visibile: "true",
  })
    .sort({ createdAt: -1 })
    .limit(10)
    .exec(function (err, companyAnnoucements) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(200).json(companyAnnoucements);
      }
    });
};

module.exports.getCompanyByDate = function (req, res) {
  // const {date, organisation_id}  = req.params
  // 
  CompanyAnnoucement.find(
    {
      organisation_id: req.params.organisation_id,
      visibile: true,

      // $and:
      // [
      //   { date },
      //   { organisation_id },
      // ],
    },
    function (err, companyAnnoucements) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(200).json(companyAnnoucements);
      }
    }
  )
    .sort({ createdAt: -1 })
    .limit(10);
};

// module.exports.getCompAnnoucementByDate = async function (req, res) {

//   const { date, organisation_id } = req.params;
//   
//   try {
//     const companies = await CompanyAnnoucement.find({
//       $and: [{ date }, { organisation_id }],
//     });
//     res.json(companies);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// };

module.exports.getCompAnnoucementById = function (req, res) {
  // const {date, organisation_id}  = req.params
  // 
  CompanyAnnoucement.findOne({
    _id: req.params.id,
  }).exec(function (err, companyAnnoucements) {
    if (err) {
      
      res.status(400).json(err);
    } else {
      
      res.status(200).json(companyAnnoucements);
    }
  });
};

module.exports.usercompanyUpdate = async function (req, res) {
  const { companyDraftToHtml } = req.body;
  const { id } = req.params;
  try {
    await CompanyAnnoucement.updateOne({ _id: id }, { companyDraftToHtml });
    return res.status(200).send({ message: "Record Updated Successfully." });
  } catch (error) {
    throw res.status(500).send(error.message);
  }
  // CompanyAnnoucement.updateOne({ _id: id }, { companyDraftToHtml })
  //   .then(() =>
  //     res.status(200).send({ message: "Record Updated Successfully." })
  //   )
  //   .catch((err) => res.status(500).send(err.message));
};

module.exports.deleteCompanyAnnoucment = function (req, res) {
  var companyAnnoucementId = req.params.companyAnnoucementId;

  CompanyAnnoucement.findByIdAndRemove(companyAnnoucementId).exec(function (
    err,
    companyAnnoucement
  ) {
    if (err) {
      res.status(404).json(err);
    } else {
      
      res.status(204).json();
    }
  });
};
