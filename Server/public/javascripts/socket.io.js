$(document).ready(function(){

	var socket = io();

	socket.on('connect',function(data){
		console.log(' connected to ther server');
		// socket.on()
	});

	socket.on('new-client', function (data) {
		console.log(data);
	})

	socket.on('connect_error',function(data){
	console.log(' server id offline');
	});

})