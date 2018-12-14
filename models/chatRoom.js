var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our user schema
var chatroomSchema = new mongoose.Schema({
    messages: 
        [{
            username:String,
            message:String,
        }]
       
});

// Export the Mongoose model
module.exports = mongoose.model('chatRoom', chatroomSchema);
