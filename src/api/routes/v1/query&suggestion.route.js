var express = require('express');
var router = express.Router();

var ctrlQueryAndSuggestion = require('../../controllers/socialAdmin/query&suggestion.controller');

router 
    .route('/queryandsuggestion')
    .get(ctrlQueryAndSuggestion.getQueryAndSuggestion)
    .post(ctrlQueryAndSuggestion.postQueryAndSuggestion);

router 
    .route('/queryandsuggestion/:id')
    .get(ctrlQueryAndSuggestion.getQueryAndSuggestionbyId)

module.exports = router;