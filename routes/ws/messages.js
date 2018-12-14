
var messages = (socket) => {


    var cb = (msg) => {
        console.log(msg);
        socket.emit('messages', msg);
    }
    return cb
}

module.exports = messages