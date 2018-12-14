var User = require("../../models/users.js")
var chat = require("../../models/chatRoom.js")

var rooms = (socket) => {

    var cb = (msg) => {
        console.log(msg);
        User.findOne({ token: msg }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            
            socket.emit('rooms', user);
          });
        
    }
    return cb
}

module.exports = rooms