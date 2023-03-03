var express = require("express");
var router = express.Router();

var ctrlCompanyAnnoucements = require("../../controllers/socialAdmin/companyAnnoucement.controller");

router
  .route("/company")
  .get(ctrlCompanyAnnoucements.getAllCompAnnoucement)
  .post(ctrlCompanyAnnoucements.insertCompAnnoucement);

//Get by date and organization id
router
  //.route('/companygetbydate/:date/:organisation_id')
  .route("/companygetbydate/:organisation_id")
  .get(ctrlCompanyAnnoucements.getCompAnnoucementByDate);

router
  .route("/companyAnnbydate/:organisation_id")
  .get(ctrlCompanyAnnoucements.getCompanyByDate);

router
  .route("/companyAnnoucment/:id")
  .get(ctrlCompanyAnnoucements.getCompAnnoucementById);

router
  .route("/companyDelete/:companyAnnoucementId")
  .delete(ctrlCompanyAnnoucements.deleteCompanyAnnoucment);

router
  .route("/companyUpdate/:id")
  .put(ctrlCompanyAnnoucements.usercompanyUpdate);

router
  .route("/companyVisible")
  .put(ctrlCompanyAnnoucements.companyVisibilityUpdate);

module.exports = router;
