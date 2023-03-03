const Queryandsuggestion = require('../../models/socialAdmin/query&suggestion.model');

//To Get Query and Suggestion
module.exports.getQueryAndSuggestion = function (req,res)
{
    Queryandsuggestion.find()
    .exec(function(err,queryandsuggestion)
    {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).json(queryandsuggestion);
        }
    })   
}

//To Get Query and Suggestion by OrganisationId and Date
module.exports.getQueryAndSuggestionbyId = function (req,res)
{
    
    Queryandsuggestion.find({$and : [{organisation_id:req.body.organisation_id},
        {employeeId:req.body.employeeId}]},
        function(err,queryandsuggestion)
        {
            if(err)
            {
                res.status(500).send(err);
            }
            else
            {
                res.status(200).json(queryandsuggestion);
            }
        }
    )
}

// To Post Query and Suggestion
module.exports.postQueryAndSuggestion = function (req,res)
{
    
    Queryandsuggestion.create(req.body,function(err,queryandsuggestion)
    {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(201).json(queryandsuggestion);
        }
    })
}
