var express = require('express');
var router = express.Router();
var passport = require("passport");
var chatRoom = require("../models/chatRoom.js")
var users = require("../models/users.js")

/* GET users listing. */
router.post('/', passport.authenticate('bearer', { session: false }),(req, res) => {
   var chat = new chatRoom({
    messages: []
    //users: [req.user.username,req.body.receiver]
})

    users.find({ "username": req.user.username},(e,sender)=>{
        users.find({ "username": req.body.receiver},(e,receiver)=>{
           sender[0].chats.push(chat._id)
           receiver[0].chats.push(chat._id)
           sender[0].save()
           receiver[0].save()
           chat.save()
            res.send(chat._id)
          })
  })

   // chat.save()

   // res.send(chat._id)
})
router.post('/:chatId', passport.authenticate('bearer', { session: false }),(req, res) => {
    var chat = new chatRoom.findById(req.params.chatId,(err,chat)=>{
     var message = { "username":req.user.username , "message":req.body.message }
     chat.messages.push(message)
     chat.save()
     res.send("sent")
    })
     
 })
 
 router.get('/', passport.authenticate('bearer', { session: false }),(req, res) => {
     chatRoom.find({users: { $all: [req.user.username] }},(e,d)=>{
        var chats = d.map((x)=>{
          return { chatIds: x._id }
        })
        res.send(chats)
      })
     
 })

 
module.exports = router;