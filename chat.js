
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var allmsg = []; 


app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/views/chat.html');
});

io.sockets.on('connection', function(socket){
  console.log(socket.id +'  connected');
  
  	for(var i = 0 ; i<allmsg.length ; i++){
  		  socket.emit('message',allmsg[i]);
  	} 
   
	socket.on('disconnect', function(){
	    console.log('user disconnected');
	}); 

	socket.on('chat', function(msg){
		console.log(msg.from +' : ' + msg.msg);
		allmsg.push(msg);
	   socket.broadcast.emit('message',msg);
	});
	

});

  
http.listen(80, function(){
  console.log('listening on *:3000');
});
