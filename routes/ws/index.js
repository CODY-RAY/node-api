var inputs = require("./inputs")
var messages = require("./messages")
var rooms = require("./rooms")
var ws = (socket)=>{
    console.log("no");
    
    socket.on('inputs',inputs(socket))
    socket.on('messages',messages(socket))
    socket.on('rooms',rooms(socket))
}
module.exports = ws