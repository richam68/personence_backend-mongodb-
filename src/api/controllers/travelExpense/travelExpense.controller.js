const TravelExpense = require('../../models/travelExpense/travelExpense.model');
const mongoose = require("mongoose");

//To Create Reimburstment 
module.exports.createTravelExpense = async function (req, res) {
    TravelExpense.create({
        travelExpense_id: req.body.travelExpense_id,
        employee_id: req.body.employee_id,
        organisation_id: req.body.organisation_id,
        client_id: req.body.client_id,
        submition_date: req.body.submition_date,
        total_amount: req.body.total_amount,
        expense_claim_type: req.body.expense_claim_type,
        status: req.body.status,
        description: req.body.description,
        trip_name: req.body.trip_name,
        purpose: req.body.purpose,
        travelDate_from: req.body.travelDate_from,
        travelDate_To: req.body.travelDate_To,
        location_from: req.body.location_from,
        locatione_To: req.body.locatione_To,
        index: req.body.index,
        travelCoupon_code: req.body.travelCoupon_code,
        date: req.body.date,


    }, function (err, travelExpense) {
        if (err) {
            console.log("Error in Creating travelExpense");
            res.status(500).json(err);
        }
        else {
            console.log("travelExpense Created Succesfully");
            res.status(201).json(travelExpense);
        }
    });
};

// To get All rembursment 
module.exports.getTravelExpense = async function (req, res) {
    TravelExpense.find().exec(function (err, travelExpense) {
        if (err) {
            console.log("Error in Getting travelExpense");
            res.status(500).json(err);
        }
        else {
            console.log("Found travelExpense : ", travelExpense.lenght);
            res.status(200).json(travelExpense);
        }
    })
}

// update Api
module.exports.updateTravelExpense = async function (req, res) {
    var travelExpense_id = req.params.travelExpense_id;
    TravelExpense.findById(travelExpense_id).select(" ").exec(function (err, doc) {
        var response = {
            status: 200,
            message: doc,
        };

        if (err) {

            response.status = 500;
            response.message = err;
        } else if (!doc) {
            res;
            response.status = 404;
            response.message = {
                message: "travelExpense_id ID not found",
            };
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            doc.submition_date = req.body.submition_date,
                doc.total_amount = req.body.total_amount,
                doc.description = req.body.description,
                doc.status = req.body.status,
                doc.tripname = req.body.tripname,
                doc.purpose = req.body.purpose,
                doc.travelFromDate = req.body.travelFromDate,
                doc.travelToDate = req.body.travelToDate,
                doc.locationFrom = req.body.locationFrom,
                doc.locationTo = req.body.locationTo
            doc.managerRemarkone = req.body.managerRemarkone,
                doc.managerRemarktwo = req.body.managerRemarktwo,
                doc.managerRemarkthreee = req.body.managerRemarkthreee,
                doc.managerRemarkfour = req.body.managerRemarkfour,


                doc.save(function (err, travelExpense) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(travelExpense);
                    }
                });
        }
    })
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    // return [year, month, day].join('-');
    return [year, month, day].join('-');

}
// travel expense Controller
module.exports.getTravelExpenseSheet = function async(req, res) {
    // organisation_id = req.params.organisation_id;
    let date = req.params.date

    const now = new Date(date)
    const temp = new Date(now).setMonth(now.getMonth() - 1);
    let priorOne = {}
    priorOne = new Date(temp)
    const a = formatDate(priorOne)
    // var d = req.params.date;
    // var d = new Date();
    // let x=d.setMonth(d.getMonth() - 1)
    console.log('check dataa in 109', priorOne, now, temp, a)

    TravelExpense.aggregate([
        {
            $match: {
                employee_id: req.params.employee_id,
                // date: req.params.date,
                date:
                {
                    $gte: a,
                    $lte: date
                },
                status: "Approve"
            }
        },
        //   {
        //     $group: {
        //       _id: "$education.education_detail",
        //       count: { $sum: 1 },

        //     },
        //   },
    ])

        .exec(function (err, travelExpenseSheet) {
            if (err) {

                res.status(500).json(err);
            } else {
                let x = []
                let Total_Amount_Sheet = []
                for (i = 0; i < travelExpenseSheet.length; i++) {
                    console.log('in line no. 180', travelExpenseSheet[i])
                    let c = new Date(travelExpenseSheet[i].travelDate_To)
                    let d = new Date(travelExpenseSheet[i].travelDate_from)
                    var Difference_In_Time = c.getTime() - d.getTime();

                    // to calculate Difference between two days
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    let no_Of_Travel_Days = Math.round(Difference_In_Days)

                    console.log('in line no 178888===', no_Of_Travel_Days, Difference_In_Days)
                    // let a=[]
                    x.push(no_Of_Travel_Days)
                    // x.push({total_No_Of_Days:a.reduce((a, b) => a + b, 0)})
                    // let Total_Amount_Sheet = []
                    Total_Amount_Sheet.push(parseInt((travelExpenseSheet[i].total_amount == 0 || travelExpenseSheet[i].total_amount == 0) ? 0 : travelExpenseSheet[i].total_amount))
                    // let z = Total_Amount_Sheet.reduce((a, b) => a + b, 0)
                    // console.log('check data  of Total_Amount_Sheet in line no. 181',Total_Amount_Sheet,z)
                }

                // for (i = 0; i < travelExpenseSheet.length; i++) {
                //     console.log('in line no. 180', travelExpenseSheet[i])
                //     // Calculate Total Amount in Travel Expense Sheet
                //     let Total_Amount_Sheet = []
                //     Total_Amount_Sheet.push(parseInt((travelExpenseSheet[i].total_amount == 0 || travelExpenseSheet[i].total_amount == 0) ? 0 : travelExpenseSheet[i].total_amount))
                //     let z = Total_Amount_Sheet.reduce((a, b) => a + b, 0)
                //     console.log('check data  of Total_Amount_Sheet in line no. 181',Total_Amount_Sheet,z)

                // }
                console.log('check data== in line no. 139', travelExpenseSheet, 
                x.reduce((a, b) => a + b, 0),Total_Amount_Sheet.reduce((a, b) => a + b, 0))
                let total_No_Of_Days = travelExpenseSheet.length
                let travelExpense=[]
                travelExpense.push({
                    total_No_Of_Trips:total_No_Of_Days,
                    no_Of_Travel_Days:x.reduce((a, b) => a + b, 0),
                    Total_amount_spent:Total_Amount_Sheet.reduce((a, b) => a + b, 0)
                })
                console.log('check data in line no. 146', total_No_Of_Days,travelExpense)
                // travelExpenseSheet.map((ele) => {
                //     let c = new Date(ele.travelDate_To)
                //     let d = new Date(ele.travelDate_from)
                //     var Difference_In_Time = c.getTime() - d.getTime();

                //     // to calculate Difference between two days
                //     var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                //     let no_Of_Travel_Days = Math.round(Difference_In_Days)
                //     let  Total_Amount_Sheet=[]
                //     let z=Total_Amount_Sheet.reduce((a, b) => a + b, 0)
                //     Total_Amount_Sheet.push(parseInt((ele.total_amount == 0 || ele.total_amount == 0) ? 0 : ele.total_amount))
                //     console.log('check in line no. 167', Difference_In_Days, no_Of_Travel_Days,Total_Amount_Sheet,Total_Amount_Sheet.reduce((a, b) => a + b, 0),z)

                //     x.push({...ele,total_No_Of_Days:total_No_Of_Days,no_Of_Travel_Days:no_Of_Travel_Days,sum_Of_total_amount:Total_Amount_Sheet,sum_of_Total_Amount:Total_Amount_Sheet.reduce((a, b) => a + b, 0)})

                // })


                

                // console.log('check data in x in line no. 176',x)

                // var Difference_In_Time = date2.getTime() - date1.getTime();

                // // To calculate the no. of days between two dates
                // var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);



                //   let tempArr = [];


                //   empdata.map(emp => {
                //     tempArr.push({ ...emp, education: emp._id == "Ssc" ? "SSC" : emp._id == "Hsc" ? "HSC" : emp._id == "Grad" ? "Grad" : emp._id == "PG" ? "PG" : "other" })
                //   })
                // 


                // let tempArr = [];
                // empdata.map(data => {
                //   
                //   tempArr.push({ name: data._id.length > 0 ? data._id[0] : '', count: data.count },
                // {name:'ssc',count: data.count},
                // {name:'Grad',count: data.count},{name:'Post Grad',count: data.count},{name:'Other',count: data.count}
                // )
                // }
                // )

                // empdata.name = 'garduation';
                res.status(200).json(travelExpense);


            }
        });
};