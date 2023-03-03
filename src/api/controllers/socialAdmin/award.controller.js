const Awards = require("../../models/socialAdmin/award.model");

//Function to get All Awards
module.exports.getAllAwards = function (req, res) {
  Awards.find().exec(function (err,Awards){
    if(err){
      
      res.status(500).json(err);
    }else
    {
      
      res.json(Awards);
    }
  })
}

//Function to get Awards by Date and OrganisationId

module.exports.getAllAwardsByOrgAndMonth = function (req, res) {
  ('checking Award backend', req.params.date,
  req.params.organisation_id )

  Awards.find({
    organisation_id: req.params.organisation_id}).sort({ createdAt: -1 }) .limit(4)
  .exec(function (err,Awards){
    
    if(err){
      
      res.status(500).json(err);
    }
    else
    {
      
      res.status(200).json(Awards);
    }
  }) 
}


//Function to get Awards by OrganisationId
module.exports.getAllAwardsByOrgId = function (req, res) {
  Awards.find({ organisation_id: req.body.organisation_id })
    .exec(function (err, Awards) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.status(200).json(Awards);
      }
    });
};



//Function to get Awards by Month
module.exports.getAwardsByMonth = function (req, res){
  


  Awards.find({month : req.body.month})
  
  .exec(function(err,Awards){
    if(err){
            res.status(501).json(err);  }
    else{
    res.json(Awards);}
});};




//Function to insert Awards
module.exports.insertAwards = function (req, res) {
  
  Awards.insertMany(
   req.body,
    function (err, awards) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(awards);
      }
    }
  );
};