var inputs = (socket)=>{


var cb = (msg)=>{
    console.log(msg);
    socket.emit('inputs', msg);
}
return cb
}

module.exports = inputs