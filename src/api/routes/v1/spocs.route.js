var express = require('express');
var router = express.Router();

var ctrlSpocs = require('../../controllers/businessUnit/spocs.controller');

router
    .route('/spocs')
    .get(ctrlSpocs.getAllSpocs)
    .post(ctrlSpocs.spocsAddOne);

router
    .route('/spocs/:spocsId')
    .get(ctrlSpocs.getOneSpocs)
    .put(ctrlSpocs.spocsUpdateOne)
    .delete(ctrlSpocs.spocsDeleteOne);
router
    .route('/client_id=:client_id')
    .get(ctrlSpocs.getAllByClientId)
router
    .route('/organisation_id=:organisation_id/spocsId=:spocsId')
    .get(ctrlSpocs.getOneByOrgId)

 module.exports = router;
