function listner(io){

	io.sockets.on('connection', function(socket){

		console.log(' New Mobile Client Connected');

		socket.emit("new-client",{massage:"Hello user"});

	});
}

module.exports.listner = listner;
