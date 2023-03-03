  //Tree structure
  Employee.find({ organisation_id: new mongoose.Types.ObjectId(req.params.organisation_id) })
    .exec(function (err, employee) {
      if (err) {
        
        res.status(500).json(err);
      } else {
        let tree = [];
        function getChildsTree(childs){
          childs.forEach(childNode=>{
            getChilds(childNode.EmpCognitoID);
          })
        }
        function getChilds(id) {
          let childs = employee.filter(ele => { if (ele.reporting_manager_id == id) { return ele; } })
          if (childs.length > 0) {
            tree.push({
              EmpCognitoID: id,
              childs: childs
            })
            getChildsTree(childs)
          }
          else {
            tree.push({
              EmpCognitoID: id,
              childs: []
            })
          }
        }
        getChilds(req.params.emp_id);
        res.status(200).json(tree);
       

      }
    })