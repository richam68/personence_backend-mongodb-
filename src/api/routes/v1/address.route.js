var express = require("express");
var router = express.Router();

var ctrlAddress = require("../../controllers/organisationSetup/address.controller");

router
  .route("/address")
  .get(ctrlAddress.getAllAddress)
  .post(ctrlAddress.addressAddOne)
  .put(ctrlAddress.addressUpdateOne);

router.route("/address/bulk").post(ctrlAddress.addressBulkCreate);

// router
// .route('/addresssort')
// .get(ctrlAddress.AddressSort)

router
  .route("/address/:addressId")
  .get(ctrlAddress.getOneAddress)
  .delete(ctrlAddress.addressDeleteOne);
router
  .route("/organisation_id=:organisation_id")
  .get(ctrlAddress.getAllAddressOrganizationId);

router
  .route("/organisation_id=:organisation_id/addressId=:addressId")
  .get(ctrlAddress.getOneAddressOrganizationId);

router.route("/places").post(ctrlAddress.addressAutocomplete);

module.exports = router;
