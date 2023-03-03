// var mongoose = require('mongoose');
const LeavePolicies = require('../../models/leave/leaveTypes.model');

//Get AttendancePolicies list
module.exports.getLeavePolicies = async function (req, res) {
    try {
        const leavePolicies = await LeavePolicies.find({ clientID: req.params.client_id })
        if (leavePolicies.err) {
            res .status(500)
        } else {
            res.json(leavePolicies);
        }
    } catch (error) {

    }

};

module.exports.leavePoliciesAddOne = function (req, res) {

    LeavePolicies.create({
        organisation_id: req.body.data.organisation_id,
        clientID: req.body.data.client_id,
        name: req.body.data.name,
        code: req.body.data.code,
        description: req.body.data.description,
        validityFrom: req.body.data.validityFrom,
        validityTo: req.body.data.validityTo,
        minLeave: req.body.data.minLeave,
        maxLeave: req.body.data.maxLeave,
        enableFileUpload: req.body.data.enableFileUpload,
        unitDays: req.body.data.unitDays,
        allowRequestForFutureDate: req.body.data.allowRequestForFutureDate,
        typePaid: req.body.data.typePaid,
        allowRequestForPastDate: req.body.data.allowRequestForPastDate,
        effectiveAfter: req.body.data.effectiveAfter,
        effectiveFrom: req.body.data.effectiveFrom,
        prorateAccuralType: req.body.data.prorateAccuralType,
        totalNoOfLeaveInYear: req.body.data.totalNoOfLeaveInYear,
        startingMonth: req.body.data.startingMonth,
        accural: req.body.data.accural,
        reset: req.body.data.reset,
        carryForword: req.body.data.carryForword,
        isMin: req.body.data.isMin,
        color: req.body.data.color,
        employeeList: req.body.data.empList
    },

        function (err, leavePolicies) {
            if (err) {

                res
                    .status(400)
                    .json(err);
            } else {

                res
                    .status(201)
                    .json(leavePolicies);
            }
        });
};

module.exports.updateLeavePolicies = function (req, res) {

    LeavePolicies.findById(req.body.data.updateLeavePolicyId)
        .exec((err, doc) => {
            if (err) {

            }
            else {
                doc.clientID = req.body.data.client_id,
                    doc.name = req.body.data.name,
                    doc.code = req.body.data.code,
                    doc.description = req.body.data.description,
                    doc.validityFrom = req.body.data.validityFrom,
                    doc.validityTo = req.body.data.validityTo,
                    doc.minLeave = req.body.data.minLeave,
                    doc.maxLeave = req.body.data.maxLeave,
                    doc.enableFileUpload = req.body.data.enableFileUpload,
                    doc.unitDays = req.body.data.unitDays,
                    doc.allowRequestForFutureDate = req.body.data.allowRequestForFutureDate
                doc.typePaid = req.body.data.typePaid,
                    doc.allowRequestForPastDate = req.body.data.allowRequestForPastDate,
                    doc.effectiveAfter = req.body.data.effectiveAfter,
                    doc.effectiveFrom = req.body.data.effectiveFrom,
                    doc.prorateAccuralType = req.body.data.prorateAccuralType,
                    doc.totalNoOfLeaveInYear = req.body.data.totalNoOfLeaveInYear,
                    doc.startingMonth = req.body.data.startingMonth,
                    doc.accural = req.body.data.accural,
                    doc.reset = req.body.data.reset,
                    doc.carryForword = req.body.data.carryForword,
                    doc.isMin = req.body.data.isMin,
                    doc.color = req.body.data.color,
                    doc.employeeList = req.body.data.empList,
                    doc.save(function (err, response) {
                        if (err) {

                        }
                        else {
                            res.json(response)
                        }
                    })
            }
        })

}

