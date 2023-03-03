const User = require('../../models/user/createuser.model')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken')
const JWT_SECRET='jasvant'

module.exports.createuser = async function (req, res) {

  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
      organisation_id: req.body.organisation_id,
      employeeId: req.body.employeeId,
      Buid:req.body.Buid
    });


    res.json(user)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
}



module.exports.updateuser = async function (req, res) {

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);
  try {

    User.findOne({ email: req.body.email })
      .exec(async function (err, doc) {
        if (err) {
          res.json(err)
        }
        else {


          doc.password = secPass;
          doc.save((err, response) => {
            if (err) {
              res.json(err)
            }
            else {
              res.json(response)
            }
          })
        }
      })


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
}

module.exports.getuser = async function (req, res) {

  

  try {

    let user = await User.findOne({ email: req.body.email })

    const passwordCompare = await bcrypt.compare(req.body.password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please enter correct details" });
    }
    else {
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
      res.json({authtoken,user})
    }


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
}
