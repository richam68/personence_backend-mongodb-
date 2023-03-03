var express = require("express");
var router = express.Router();

var ctrlQuotes = require("../../controllers/socialAdmin/quotes.controller");

router
  .route("/quotes")
  // .get(ctrlQuotes.getAllQuotesByDate)
  .post(ctrlQuotes.insertQuotes);

router
  .route("/quotes/organisation_id=:organisation_id")
  .get(ctrlQuotes.getAllQuotesByOrgId);

router
  .route("/quotes/date=:date/organisation_id=:organisation_id")
  .get(ctrlQuotes.getAllQuotesByDate);

router.route("/quotes/:id").get(ctrlQuotes.getQuotesById);

router.route("/quotesDeleted/:quotesId").delete(ctrlQuotes.deleteQuoteLists);

router.route("/quotesUpdate/:id").put(ctrlQuotes.userQuotesUpdate);

module.exports = router;

module.exports = router;
