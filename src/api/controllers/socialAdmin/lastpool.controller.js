const lastpool = require("../../models/socialAdmin/lastpool.model");

//Get All LastPool  (get all lastpool)
module.exports.getAllLastPool = function (req, res) {
  lastpool.find()
       .exec(function (err, lastpool) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(lastpool);
      }
    });
};

//Function used for Date Filter (Get )
module.exports.getLastPoolByDate = function(req,res)
{
  lastpool.find({date : req.body.date}).exec(function (err,lastpool){
    if(err)
    {
      
      res.status(500).json(err);
    }else
    {
      
      res.json(lastpool);
    }
  });
};


// Function used for create lastpool  (insert)
module.exports.insertLastPool = function (req, res) {
    
    lastpool.create(req.body,function(err,lastpool){
        if(err){
            
            res.status(400).json(err);}
            else{
                
                res.status(201).json(lastpool);
            }
    })
}

