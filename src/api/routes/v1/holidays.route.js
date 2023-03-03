var express = require('express');
var router = express.Router();

var ctrlHolidays = require('../../controllers/holidays/holidays.controller');

router
    .route('/holidays')
    .post(ctrlHolidays.holidaysAddOne)
    .put(ctrlHolidays.holidaysUpdateOne)

router
    .route('/getHolidaysByClient/:clientId')
    .get(ctrlHolidays.getAllHolidays)

router
    .route('/holidays/:holidaysId')
    .get(ctrlHolidays.getOneHolidays)
    .delete(ctrlHolidays.holidaysDeleteOne);
router
    .route('/client_id=:client_id')
    .get(ctrlHolidays.getAllHolidaysClientId)
router
    .route('/client_id=:client_id/holidaysId=:holidaysId')
    .get(ctrlHolidays.getOneHolidaysClientId)

module.exports = router;