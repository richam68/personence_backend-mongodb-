const Modules = require("../../models/module/module.model");

//Get Modules list
module.exports.getAllModules = function (req, res) {
  Modules.find()
    .exec(function (err, modules) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        
        res.json(modules);
      }
    });
};

//Get Single Module
// module.exports.getOneModule = function(req, res){
//     var moduleId = req.params.moduleId;
//     

//     Modules
//     .findById(moduleId)
//     .exec(function(err,doc){
//         var response = {
//             status : 200,
//             message : doc
//         }

//         if(err) {
//             
//             response.status=500;
//             response.message=err;
//     }else if(!doc){
//         res
//             response.status=404;
//             response.message={
//                 "message" : "moduleId ID not found"
//             };
//     }
//     res
//         .status(response.status)
//         .json(response.message);

//     });
// };

//Add a new module(create = insert karne ka)
module.exports.moduleAddOne = function (req, res) {
  

  Modules.create(
    {
      id:req.body.id,
      name: req.body.name,
      module_code: req.body.module_code,
      module_URL: req.body.module_URL,
      parent_Id: req.body.parent_Id,
      screen_Id: req.body.screen_Id,
      level:req.body.level,
      client_id: req.body.client_id,
      organisation_id: req.body.organisation_id,
      module_Type: req.body.module_Type,
      module_Description: req.body.module_Description,
      component:req.body.component,
      children:req.body.children,
    },

    function (err, modules) {
      if (err) {
        
        res.status(400).json(err);
      } else {
        
        res.status(201).json(modules);
      }
    }
  );
};

//Update module
module.exports.moduleUpdateOne = function (req, res) {
  var moduleId = req.params.moduleId;
  

  Modules.findById(moduleId)
    .select(" ")
    .exec(function (err, doc) {
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
          message: "module ID not found",
        };
      }
      if (response.status !== 200) {
        res.status(response.status).json(response.message);
      } else {
        //Update columns like this here
        doc.name = req.body.name;
        doc.module_code = req.body.module_code;
        doc.module_URL = req.body.module_URL;
        doc.parent_Id = req.body.parent_Id;
        doc.screen_Id = req.body.screen_Id;
        doc.client_id = req.body.client_id;
        doc.organisation_id = req.body.organisation_id;
        doc.module_Type = req.body.module_Type;
        doc.level=req.body.level;
        doc.module_Description = req.body.module_Description;

        doc.save(function (err, moduleUpdated) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(204).json();
          }
        });
      }
    });
};

module.exports.moduleDeleteOne = function(req, res){
   var moduleId = req.params.moduleId;

   Modules
       .findByIdAndRemove(moduleId)
       .exec(function(err, module){
       if(err){
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
