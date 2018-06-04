var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require("../models/user.mjs")
var passport = require("passport");

/* GET users listing. */
router.post("/",(req, res)=>{
  console.log(req.body.username+ " "+ req.body.password)
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });
  user.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'added' });
  });
})


router.get('/all',passport.authenticate('basic', { session: false }), function(req, res)  {
User.find({},(e,d)=>{
  var usernames = d.map((x)=>{
    return { username: x.username }
  })
  res.send(usernames)
})
  
})
router.get('/find', function(req, res)  {
  User.find({},(e,d)=>{
    var usernames = d.map((x)=>{
      return { username: x.username }
    })
    res.send(usernames)
  })
    
  })
module.exports = router;
