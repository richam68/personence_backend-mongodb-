// var mongoose = require('mongoose');
const Holidays = require('../../models/holidays/holidays.model');

////////
//Get Holidays list using client id
module.exports.getAllHolidaysClientId = function (req, res) {

    Holidays
        .find({ client_id: req.params.client_id })
        .exec(function (err, holidays) {
            if (err) {

                res
                    .status(500)
                    .json(err);
            } else {

                res
                    .json(holidays);
            }
        });

};
//Get Single Holidays using holiday id and client id
module.exports.getOneHolidaysClientId = function (req, res) {
    var _id = req.params.holidaysId;
    //var client_id = req.params.client_id;

    Holidays
        .find({ _id })
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            }

            if (err) {

                response.status = 500;
                response.message = err;
            } else if (!doc) {
                res
                response.status = 404;
                response.message = {
                    "message": "Holidays ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);
        });
};

module.exports.getHolidaysByClient = function (req, res) {
    Holidays.find({ client_id: req.params.clientId })
        .exec((err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.json(result)
            }
        })
}

//Get Holidays list
module.exports.getAllHolidays = function (req, res) {
    Holidays
        .find()
        .exec(function (err, holidays) {
            if (err) {

                res
                    .status(500)
                    .json(err);
            } else {

                res
                    .json(holidays);
            }
        });

};
//Get Single Holidays 
module.exports.getOneHolidays = function (req, res) {
    var _id = req.params.holidaysId;


    Holidays
        .findById(_id)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            }


            if (err) {

                response.status = 500;
                response.message = err;
            } else if (!doc) {
                res
                response.status = 404;
                response.message = {
                    "message": "Holidays ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);

        });

};

//Add a new Holidays 
module.exports.holidaysAddOne = function (req, res) {
    Holidays
        .create({
            // clientId: req.body.clientId,
            client_id: req.body.client_id,
            name: req.body.name,
            date: req.body.date,
            organisation_id: req.body.organisation_id,
            description: req.body.description,
            reminderDay: req.body.reminderDay,
            zone: req.body.zone,
            department: req.body.department,
            location: req.body.location,
            designation: req.body.designation,
            division: req.body.division,
            status: req.body.status,
            calenderYear: req.body.calenderYear,
            employeeList: req.body.employeeList
        }, function (err, holidays) {
            if (err) {

                res
                    .status(400)
                    .json(err);
            } else {

                res
                    .status(201)
                    .json(holidays);
            }
        });
};


module.exports.holidaysUpdateOne = function (req, res) {
    var holidaysId = req.params.holidaysId;


    Holidays
        .findById(holidaysId)
        .select(" ")
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            }


            if (err) {

                response.status = 500;
                response.message = err;
            } else if (!doc) {
                res
                response.status = 404;
                response.message = {
                    "message": "holidays ID not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                //Update columns like this here
                doc.client_id = req.body.client_id;
                //    doc.trainNo = parseInt(req.body.trainNo);
                doc.name = req.body.name;
                doc.date = req.body.date;
                doc.description = req.body.description;
                doc.reminderDay = req.body.reminderDay;
                doc.zone = req.body.zone;
                doc.department = req.body.department;
                doc.location = req.body.location;
                doc.designation = req.body.designation;
                doc.division = req.body.division;
                doc.status = req.body.status;
                doc.calenderYear = req.body.calenderYear;
                doc.employeeList = req.body.employeeList
                doc.save(function (err, holidaysUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);

                    } else {
                        res
                            .status(204)
                            .json();

                    }
                });
            }
        });
};


module.exports.holidaysDeleteOne = function (req, res) {
    var holidaysId = req.params.holidaysId;

    Holidays
        .findByIdAndRemove(holidaysId)
        .exec(function (err, holidays) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {

                res
                    .status(204)
                    .json();
            }
        });
};


