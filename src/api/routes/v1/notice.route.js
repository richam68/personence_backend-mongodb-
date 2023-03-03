var express = require("express");
var router = express.Router();

var ctrlNotice = require("../../controllers/socialAdmin/notice.controller");
router
  .route("/notice")
  .get(ctrlNotice.getNotices)
  .post(ctrlNotice.insertNotices);

router
  //.route('/noticeorgid/:organisation_id/:date')
  .route("/noticeorgid/:organisation_id")
  .get(ctrlNotice.getAllNoticesByOrgId);

router.route("/noticeUpdate/:_id").put(ctrlNotice.userNoticeUpdate);

router.route("/noticeVisibile").put(ctrlNotice.userVisibileUpdate);

router.route("/noticeDeleted/:noticeId").delete(ctrlNotice.deleteNoticeLists);
module.exports = router;
