const RembursmentAccount = require('../../models/reimbursement/reimbursement_Account.model');
const mongoose = require("mongoose");



//To Create Reimburstment  Account
module.exports.createRembursmentAccount = async function (req, res) {
    RembursmentAccount.create({
        account_id: req.body.account_id,
        employee_id: req.body.employee_id,
        organisation_id: req.body.organisation_id,
        client_id: req.body.client_id,
        opening_balance: req.body.opening_balance,
        closing_balance: req.body.closing_balance,
        date: req.body.date,
        amount: req.body.amount,
        advance_type_for_Report: req.body.advance_type_for_Report,
        expense_type: req.body.expense_type,
        to_date: req.body.to_date,
        select_claim_type: req.body.select_claim_type,
        // select_claim_type: req.body.select_claim_type,



    }, function (err, rembursmentAccount) {
        if (err) {
            console.log("Error in Creating rembursmentAccount");
            res.status(500).json(err);
        }
        else {
            console.log("rembursmentAccount Created Succesfully");
            res.status(201).json(rembursmentAccount);
        }
    });
};


// To get All rembursment 
// module.exports.getRembursmentAccount = async function (req, res) {
//     RembursmentAccount.find({ employee_id: req.params.employee_id }).exec(function (err, rembursmentAccount) {
//         if (err) {
//             console.log("Error in Getting rembursmentAccount");
//             res.status(500).json(err);
//         }
//         else {
//             let test = []
//             let x = {}
//             let y = {}
//             let arrayrembursmentAccount = []
//             let a=rembursmentAccount.pop()
//             arrayrembursmentAccount.push()
//             console.log('check data in line no. 49',a)
//             arrayrembursmentAccount && rembursmentAccount.map((ele) => {

//                 if (ele.advance_type_for_Report == "Advance") {
//                     x = (+ele.opening_balance) - (+ele.amount)       
//                     // console.log('check dat in line no. 42', x,test)
//                 }
//                 if (ele.expense_type == "Expense") {
//                     y = (+ele.opening_balance) + (+ele.amount);
//                     // console.log('check dat in y 56', y)
//                 }              
//                 console.log('check data inside rembursaement acount', x, y,test)
//             })

//             console.log('check data in line no.71',x,x.length-1)
//             console.log("Found rembursmentAccount : ", rembursmentAccount.lenght);
//             res.status(200).json(rembursmentAccount);
//         }
//     })
// }
module.exports.getRembursmentAccount = function async(req, res) {
    // organisation_id = req.params.organisation_id;
    // fromdate = req.params.fromdate;
    // todate = new Date();

    RembursmentAccount.aggregate([
        {
            $match: {
                employee_id: req.params.employee_id,
                date: req.params.date,
                // status: "Approve"
                //   client_id: new mongoose.Types.ObjectId(req.params.client_id),
                //   createdAt:
                //   {
                //     $gte: new Date(fromdate),
                //     $lte: new Date(todate)
                //   }

            }
        },
        //   {
        //     $group: {
        //       _id: "$education.education_detail",
        //       count: { $sum: 1 },

        //     },
        //   },
    ])

        .exec(function (err, rembursmentAccount) {
            if (err) {

                res.status(500).json(err);
            } else {



                let test = []
                let x = {}
                let y = {}
                let arrayofAccount = []
                arrayofAccount.push(rembursmentAccount.pop())
                console.log('chekc data in line no. 115')
                arrayofAccount && arrayofAccount.map((ele) => {
                    // console.log('check dat in liine no. 40', ele)
                    // advance_type: req.body.advance_type,
                    // expense_claim_type: req.body.expense_claim_type,
                    // select_claim_type: req.body.select_claim_type,

                    if (ele && ele.advance_type_for_Report && ele.advance_type_for_Report == "Advance") {

                        x = (+ele.opening_balance) - (+ele.amount)
                        console.log('check dat in line no. 42', x)

                    }
                    if (ele && ele.expense_type && ele.expense_type == "Expense") {
                        y = (+ele.opening_balance) + (+ele.amount);
                        console.log('check dat in y 56', y)
                    }

                    test.push({ ...ele, closing_balance: x || y })
                    console.log('check data inside rembursaement acount', x, y, test)

                })

                // empdata.map((emp) => {
                //   

                // })


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
                console.log('check data in side 164', test)
                res.status(200).json(test);


            }
        });
};
// update Api

module.exports.updateRembursmentAccount = async function (req, res) {
    // var employee_id = req.params.employee_id;
    RembursmentAccount.find({ employee_id: req.body.employee_id }).select(" ").exec(function (err, doc) {
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
                message: "rembursement_id ID not found",
            };
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {

            // console.log('check data inside doc in 69',doc)
            doc[0].account_id = req.body.account_id,
                doc[0].employee_id = req.body.employee_id,
                doc[0].organisation_id = req.body.organisation_id,
                doc[0].client_id = req.body.client_id,
                doc[0].opening_balance = req.body.opening_balance,
                doc[0].closing_balance = req.body.closing_balance,
                doc[0].date = req.body.date,
                doc[0].amount = req.body.amount,
                doc[0].select_claim_type = req.body.select_claim_type,
                doc[0].to_date = req.body.to_date,
                doc[0].save(function (err, rembursmentAccountupdate) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(rembursmentAccountupdate);
                    }
                });
        }
    })
}


// Api Of Expense Type
module.exports.getExpenseType = function async(req, res) {
    // organisation_id = req.params.organisation_id;
    let date = req.params.date
    let to_date = req.params.to_date

    // const now = new Date(date)
    // const temp = new Date(now).setMonth(now.getMonth() - 1);
    // let priorOne = {}
    // priorOne = new Date(temp)
    // const a = formatDate(priorOne)

    RembursmentAccount.aggregate([
        {
            $match: {
                employee_id: req.params.employee_id,

                date:
                {
                    $gte: "2022-11-01",
                    $lte: "2023-01-15"
                    // $gte: new Date(date),
                    // $lte: new Date(to_date)
                }

            }
        },
        // {$group : "$select_claim_type", count:{$sum:"$amount"}},
        {
            $group: { _id: "$select_claim_type", totalQuantity: { $sum: "$amount" } }
        },

    ])

        .exec(function (err, rembursmentAccountc) {
            if (err) {

                res.status(500).json(err);
            } else {

                console.log('check data in rembursmentAccount in 266 line', rembursmentAccountc)
                let a = [];
                let c = []
                rembursmentAccountc.map((ele) => {
                    // console.log('check data inside map in line no 269', ele, ele._id, ele._id.select_claim_type)
                    a.push({ ...ele, color: emp._id == 'Travel Expense' ? "#619EE5" : emp._id == 'Document  Expense' ? "#EB97D3" : "black" })


                })
                console.log('checck data in line no 278=', a, c)
                // empdata.map((emp) => {
                //   

                // })


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
                // console.log('check data in side 164',test)
                res.status(200).json();


            }
        });
};

// get all Employee Expense Type 62c51c804d0f4f001346fc24

module.exports.getExpenseTypeOfAllEmployee = function async(req, res) {
    organisation_id = req.params.organisation_id;
    let date = req.params.date
    let to_date = req.params.to_date

    // const now = new Date(date)
    // const temp = new Date(now).setMonth(now.getMonth() - 1);
    // let priorOne = {}
    // priorOne = new Date(temp)
    // const a = formatDate(priorOne)

    RembursmentAccount.aggregate([
        {
            $match: {
                organisation_id: req.params.organisation_id,

                date:
                {
                    $gte: "2022-01-01",
                    $lte: "2023-01-15"
                    // $gte: new Date(date),
                    // $lte: new Date(to_date)
                }

            }
        },
        // {$group : "$select_claim_type", count:{$sum:"$amount"}},
        {
            $group: { _id: "$select_claim_type", totalQuantity: { $sum: "$amount" } }
        },

    ])

        .exec(function (err, rembursmentAccoofAllEmp) {
            if (err) {

                res.status(500).json(err);
            } else {

                console.log('check data in rembursmentAccount in 266 line', rembursmentAccoofAllEmp)
                let a = [];
                let c = []
                rembursmentAccoofAllEmp.map((ele) => {
                    console.log('check data inside map in line no 269', ele, ele._id,)
                    // a.push({ ...ele, color: emp._id == 'Travel Expense' ? "#619EE5" : emp._id == 'Document  Expense' ? "#EB97D3" : "black" })


                })
                console.log('checck data in line no 278=', a, c)
                
                res.status(200).json();


            }
        });
};


// Team Expense Sheet
// module.exports.getTeamExpenseSheetOfAllEmp
module.exports.getTeamExpenseSheetOfAllEmp = function async(req, res) {
    organisation_id = req.params.organisation_id;
    let date = req.params.date
    let to_date = req.params.to_date

    // const now = new Date(date)
    // const temp = new Date(now).setMonth(now.getMonth() - 1);
    // let priorOne = {}
    // priorOne = new Date(temp)
    // const a = formatDate(priorOne)

    RembursmentAccount.aggregate([
        {
            $match: {
                organisation_id: req.params.organisation_id,

                date:
                {
                    $gte: "2022-01-01",
                    $lte: "2023-01-15"
                    // $gte: new Date(date),
                    // $lte: new Date(to_date)
                }

            }
        },
        // {$group : "$select_claim_type", count:{$sum:"$amount"}},
        // {
        //     $group: { _id: "$select_claim_type", totalQuantity: { $sum: "$amount" } }
        // },

    ])

        .exec(function (err, rembursmentTeamExpenseSheetOfAllEmp) {
            if (err) {

                res.status(500).json(err);
            } else {

                console.log('check data in rembursmentAccount in 266 line', rembursmentTeamExpenseSheetOfAllEmp)
                let a = [];
                let c = []
                rembursmentTeamExpenseSheetOfAllEmp.map((ele) => {
                    // console.log('check data inside map in line no 269', ele, ele._id,)
                    if (ele && ele.advance_type_for_Report && ele.advance_type_for_Report == "Advance") {

                        x = (+ele.opening_balance) - (+ele.amount)
                        console.log('check dat in line no. 42', x)

                    }
                    if (ele && ele.expense_type && ele.expense_type == "Expense") {
                        y = (+ele.opening_balance) + (+ele.amount);
                        console.log('check dat in y 56', y)
                    }

                    // a.push({ ...ele, color: emp._id == 'Travel Expense' ? "#619EE5" : emp._id == 'Document  Expense' ? "#EB97D3" : "black" })


                })
                console.log('checck data in line no 278=', a, c)
                
                res.status(200).json();


            }
        });
};

// Expense ThroughOut The yaaer

// module.exports.getExpenseType = function async(req, res) {
//     // organisation_id = req.params.organisation_id;
//     let date = req.params.date
//     let to_date = req.params.to_date

//     // const now = new Date(date)
//     // const temp = new Date(now).setMonth(now.getMonth() - 1);
//     // let priorOne = {}
//     // priorOne = new Date(temp)
//     // const a = formatDate(priorOne)

//     RembursmentAccount.aggregate([
//         {
//             $match: {
//                 employee_id: req.params.employee_id,

//                 date:
//                 {
//                     $gte: "2022-11-01",
//                     $lte: "2023-01-15"
//                     // $gte: new Date(date),
//                     // $lte: new Date(to_date)
//                 }

//             }
//         },
//         // {$group : "$select_claim_type", count:{$sum:"$amount"}},
//         {
//             $group: {
//                 _id: {
//                     month: { $month: "$entryTime" },
//                     year: { $year: "$entryTime" }
//                 }
//             },
//             total: { $sum: "$expenseAmount" }
//         },
//         // {
//         //     $group: { _id: "$select_claim_type", totalQuantity: { $sum: "$amount" } }
//         //   },
        
//     ])

//         .exec(function (err, rembursmentAccountc) {
//             if (err) {

//                 res.status(500).json(err);
//             } else {

//                 console.log('check data in rembursmentAccount in 266 line', rembursmentAccountc)
//                 let a = [];
//                 let c = []
//                 rembursmentAccountc.map((ele) => {
//                     // console.log('check data inside map in line no 269', ele, ele._id, ele._id.select_claim_type)
//                     a.push({ ...ele, color: emp._id == 'Travel Expense' ? "#619EE5" : emp._id == 'Document  Expense' ? "#EB97D3" : "black" })


//                 })
//                 console.log('checck data in line no 278=', a, c)
//                 // empdata.map((emp) => {
//                 //   

//                 // })


//                 //   let tempArr = [];


//                 //   empdata.map(emp => {
//                 //     tempArr.push({ ...emp, education: emp._id == "Ssc" ? "SSC" : emp._id == "Hsc" ? "HSC" : emp._id == "Grad" ? "Grad" : emp._id == "PG" ? "PG" : "other" })
//                 //   })
//                 // 


//                 // let tempArr = [];
//                 // empdata.map(data => {
//                 //   
//                 //   tempArr.push({ name: data._id.length > 0 ? data._id[0] : '', count: data.count },
//                 // {name:'ssc',count: data.count},
//                 // {name:'Grad',count: data.count},{name:'Post Grad',count: data.count},{name:'Other',count: data.count}
//                 // )
//                 // }
//                 // )

//                 // empdata.name = 'garduation';
//                 // console.log('check data in side 164',test)
//                 res.status(200).json();


//             }
//         });
// };
