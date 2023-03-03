// var mongoose = require('mongoose');
const Quotes = require("../../models/socialAdmin/quotes.model");

//Get All Quotes by organisation id
module.exports.getAllQuotesByOrgId = function (req, res) {
  Quotes.find({ organisation_id: req.params.organisation_id }).exec(function (
    err,
    Quotes
  ) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(Quotes);
    }
  });
  //.sort({ createdAt: -1 }) .limit(1);
};

//Get All Quotes by Date
module.exports.getAllQuotesByDate = function (req, res) {
  "checking Quotes backend", req.params.date, req.params.organisation_id;
  Quotes.find({
    $and: [
      { date: req.params.date },
      { organisation_id: req.params.organisation_id },
    ],
  }).exec(function (err, Quotes) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(Quotes);
    }
  });
};

module.exports.getQuotesById = function (req, res) {
  // const {date, organisation_id}  = req.params
  //
  Quotes.findOne({
    _id: req.params.id,
  }).exec(function (err, Quotes) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(Quotes);
    }
  });
};

// Function used for create quotes  (insert)
module.exports.insertQuotes = function (req, res) {
  Quotes.create(
    {
      quoteImageUrl: req.body.quoteImageUrl,
      quoteDescription: req.body.draftToHtml,
      date: req.body.date,
      // editorState: req.body.editorState,
      organisation_id: req.body.organisation_id,
      // employeeId: req.body.employeeId,
    },
    function (err, quotes) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(quotes);
      }
    }
  );
};

module.exports.deleteQuoteLists = function (req, res) {
  var quotesId = req.params.quotesId;
  Quotes.findByIdAndRemove(quotesId).exec(function (err, Notice) {
    if (err) {
      res.status(404).json(err);
    } else {
      console.log("quotes list deleted id", quotesId);
      res.status(204).json();
    }
  });
};

module.exports.userQuotesUpdate = async function (req, res) {
  const { quoteDescription, quoteImageUrl } = req.body;
  const { id } = req.params;
  try {
    await Quotes.updateOne({ _id: id }, { quoteDescription, quoteImageUrl });
    return res.status(200).send({ message: "Record Updated Successfully." });
  } catch (error) {
    throw res.status(500).send(error.message);
  }
};
