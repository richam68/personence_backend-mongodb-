var express = require("express");
var router = express.Router();
var ctrluser = require('../../controllers/user/createuser.controller')



router
  .route('/user')
  .post(ctrluser.createuser)
  .put(ctrluser.updateuser)

  router
  .route('/checkUser')
  .post(ctrluser.getuser)



module.exports = router;
