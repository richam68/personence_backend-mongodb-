
const LocationTracking=require('../../models/locationTracking/locationTracking.model')


module.exports.insertLocation = function (req, res) {
  

    LocationTracking
    .create({
      employeeId: req.body.employeeId,
      datetime: new Date(),
      location: req.body.location,
      organisation_id: req.body.organisation_id,
    }, function (err, locationTracking) {
      if (err) {
        
        res
          .status(400)
          .json(err);
      } else {
        

  
          res.json(locationTracking);
        }
    });

    
};
