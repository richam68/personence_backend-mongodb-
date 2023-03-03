// var mongoose = require('mongoose');
const AttendancePolicies = require('../../models/attendance/attendancePolicies.model');

//Get AttendancePolicies list
module.exports.getAllAttendancePolicies = function (req, res) {
    var offset = 0;
    var count = 5;
    var maxCount = 10;


    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }


    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message": "If supplied in querystring count and offset should be a number"
            });
        return;
    }

    if (count > maxCount) {
        res
            .status(400)
            .json({
                "message": "Count limit of " + maxCount + " exceeded"
            });
        return;
    }

    AttendancePolicies
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, attendancePolicies) {
            if (err) {

                res
                    .status(500)
                    .json(err);
            } else {

                res
                    .json(attendancePolicies);
            }
        });

};

//Get AttendancePolicies list using client id
module.exports.getAllByClientId = async function (req, res) {
    try {
        var attendancePolicies = await AttendancePolicies.find({ client_id: req.params.client_id })

        if (attendancePolicies.err) {

        } else {

            res.json(attendancePolicies);
        }
    } catch (error) {

    }

};

//Get Single AttendancePolicies 

//Add a new AttendancePoliciesId 
module.exports.attendancePoliciesAddOne = async function (req, res) {
    try {
        let attendancePolicies = await AttendancePolicies
            .create({
                client_id: req.body.client_id,
                totalHours: req.body.totalHours,
                minimumHoursReqForDay: req.body.minimumHoursReqForDay,
                showOvertime: req.body.showOvertime,
                includeWeekend: req.body.includeWeekend,
                includeHolidays: req.body.includeHolidays,
                carryOverTime: req.body.carryOverTime,
                webCheckInOut: req.body.webCheckInOut,
                mobileCheckInOut: req.body.mobileCheckInOut,
                desktopCheckInOut: req.body.desktopCheckInOut,
                locationSharing: req.body.locationSharing,
                showAllCheckInOut: req.body.showAllCheckInOut,
                employeeList: req.body.empList,
                policyName: req.body.policyName,
                manualInput: req.body.manualInput,
                lanientMode: req.body.lanientMode,
                breakTime: req.body.breakTime
            });

        res.json(attendancePolicies)
    } catch (error) {

    }

};


module.exports.attendancePoliciesUpdateOne = function (req, res) {
    var attendancePoliciesId = req.body.data.attendancePoliciesId;

    AttendancePolicies
        .findById(attendancePoliciesId)
        .select(" ")
        .exec(function (err, doc) {
            try {
                if (err) {
                    res
                        .json(err);
                } else {

                    doc.client_id = req.body.data.client_id;
                    doc.totalHours = req.body.data.totalHours;
                    doc.minimumHoursReqForDay = req.body.data.minimumHoursReqForDay;
                    doc.showOvertime = req.body.data.showOvertime;
                    doc.includeWeekend = req.body.data.includeWeekend;
                    doc.includeHolidays = req.body.data.includeHolidays;
                    doc.carryOverTime = req.body.data.carryOverTime;
                    doc.webCheckInOut = req.body.data.webCheckInOut;
                    doc.mobileCheckInOut = req.body.data.mobileCheckInOut;
                    doc.desktopCheckInOut = req.body.data.desktopCheckInOut
                    doc.locationSharing = req.body.data.locationSharing
                    doc.showAllCheckInOut = req.body.data.showAllCheckInOut;
                    doc.manualInput = req.body.data.lanientMode.fromTime == undefined ? doc.manualInput : req.body.data.manualInput,
                        doc.lanientMode = req.body.data.lanientMode.fromTime == undefined ? doc.lanientMode : req.body.data.lanientMode
                    doc.employeeList = req.body.data.empList
                    doc.policyName = req.body.data.policyName
                    doc.breakTime = req.body.data.breakTime

                    doc.save(function (err, attendancePoliciesUpdated) {
                        if (err) {
                            res
                                .status(500)
                                .json(err);

                        } else {
                            res
                                .status(204)
                                .json(attendancePoliciesUpdated);

                        }
                    });
                }
            } catch (error) {

            }

        });
};


module.exports.attendancePoliciesDeleteOne = async function (req, res) {
    var attendancePoliciesId = req.params.attendancePoliciesId;
    try {
        const attendancePolicies = await AttendancePolicies.findByIdAndRemove(attendancePoliciesId)
        res.json(attendancePolicies)
    } catch (error) {

    }

};

module.exports.getAttendancePolicyByEmp = async function (req, res) {
    try {
        var policy = await AttendancePolicies.find({ employeeList: req.params.emp_id })
        res.json(policy)
    } catch (error) {

    }

}