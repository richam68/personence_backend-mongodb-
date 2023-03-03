var express = require('express');
var router = express.Router();

var ctrlModule = require('../../controllers/module/module.controller');

//router
router
    .route('/modules')
    .get(ctrlModule.getAllModules)
    .post(ctrlModule.moduleAddOne);

router
    .route('/modules/:moduleId')
    //.get(ctrlModule.getOneModule)
    .put(ctrlModule.moduleUpdateOne)
    .delete(ctrlModule.moduleDeleteOne);

module.exports = router;