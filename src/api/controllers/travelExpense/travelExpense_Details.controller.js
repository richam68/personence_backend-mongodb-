const travelExpenseDetails = require('../../models/travelExpense/travelExpense_Details.model');
const mongoose = require('mongoose');

//To Create RembursmentDetails 
module.exports.createTravelDetails = async function (req,res)
{
    travelExpenseDetails.insertMany(req.body,
    //     {
    //     client_id : req.body.client_id,
    //     emp_id : req.body.emp_id,
    //     organisation_id : req.body.organisation_id,
    //     rembursment_id : req.body.rembursment_id,
    //     rembursment_detail_id : req.body.rembursment_detail_id,
    //     bill_date : req.body.bill_date,
    //     select_claim_type : req.body.select_claim_type,
    //     remark : req.body.remark,
    //     amount  : req.body.amount,
    //     attachment : req.body.attachment
    // },
    function(err,travelExpenseDetails)
    {
        if(err)
        {
            console.log(err);
            res.status(500).json(err);
        }
        else 
        {
            console.log("Found Rembursments", travelExpenseDetails.length);
            res.status(201).json(travelExpenseDetails);
        }
    });
};

//To get Rembursment details
module.exports.getTravelExpenseDetails = async function(req,res)
{
    travelExpenseDetails.find().exec(function(err,travelExpenseDetails)
    {
        if(err)
        {
            console.log(err);
            res.status(500).json(err);
        }
        else 
        {
            console.log("Found Rembursments Details total : ",travelExpenseDetails.length);
            res.status(200).json(travelExpenseDetails);
        }
    }) 
}

// Module to update reimbursment 
module.exports.updateTravelExpenseDetails =  function(req,res)
{
   let _id = req.params._id;
   console.log("rembursmentDetailsId",_id);
   travelExpenseDetails.findById( {_id : req.params._id}) 
    .select(" ")
    .exec(function(err,docs){
        var response = {
            status : 200,
            message : docs,
    };
    if(err)
    {
        console.log("Error finding travelExpenseDetails Details");
        res.status = 500;
        response.message = err;    
    }else if(!docs)
    {
        res;
        response.status = 404;
        response.message = {
            message : "travelExpenseDetails Details not found"
        };
    }
    if(response.status !== 200)
    {
        res.status(response.status).json(response.message);
    }else{
        // docs.client_id = req.body.client_id;
        // docs.emp_id = req.body.emp_id;
        docs.organisation_id = req.body.organisation_id;
        docs.rembursment_id = req.body.rembursment_id;
        docs.rembursment_detail_id = req.body.rembursment_detail_id;
        docs.bill_date = req.body.bill_date;
        docs.select_claim_type = req.body.select_claim_type;
        docs.remark = req.body.remark;
        docs.amount = req.body.amount;
        docs.attachment = req.body.attachment;
        docs.save(function(err,travelExpenseDetails){
            if(err)
            {
                res.status(500).json(err);
            }else{
                res.status(204).json(travelExpenseDetails);
            }
        });
    }
    });
}
