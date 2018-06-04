var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our user schema
var UserSchema = new mongoose.Schema({
    messages: 
        [{
            username:String,
            message:String,
        }]
  ,
  users: [mongoose.Schema.Types.ObjectId]
});

// Export the Mongoose model
module.exports = mongoose.model('chatRoom', UserSchema);