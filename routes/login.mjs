var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require("passport");


/* GET users listing. */


router.get('/apitoken', passport.authenticate('basic', { session: false }),(req, res) => {
    var token = jwt.sign({ user: req.user.username }, 'shhhhh');
    req.user.token = token
    req.user.save()
    res.send(req.user.token)
})

module.exports = router;