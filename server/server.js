const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var {Users} = require('./utils/users');
var {Rooms} = require('./utils/Rooms');

var users = new Users();
var rooms = new Rooms();
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

rooms.rooms.push({name:'dogs',type:1, users: [], team1users:[], team2users:[], team1p:0, team2p:0 , gip:false});

io.on('connection', (socket) => {


	socket.on('join', (params) => {



		


		socket.join(params.room);	
		users.removeUser(socket.id);
		users.addUser(socket.id, params.username, params.room);
		rooms.addUser(socket.id, params.username, params.room);
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		io.emit('updateRoomList', rooms.rooms);
		socket.emit('newMessage', {name:'Admin', text:'Welcome to the chat app'});
		socket.broadcast.to(params.room).emit('newMessage', {name:'Admin', text: params.username + ' has joined'})

		
		





	})

	socket.on('joinj', (data) => {


	   

		
		



	})

	socket.on('createMessage', (message) => {

		io.to(message.room).emit('newMessage', {text:message.text, name: message.username});


	})



})

app.post('/join', function(req,res){

	console.log('postjoin');
	var roomsearch = rooms.rooms.filter((room) => room.name === req.body.roomj)
	console.log(req.body.roomj+'roomj');
		if(roomsearch.length > 0){

			console.log(roomsearch);
			if(roomsearch[0].type === 1){

				console.log('postjoin2');
				console.log('lol' + path.join(__dirname, '../public/chat.html');
				res.sendFile(path.join(__dirname, '../public/chat.html'));
			}

		}

})



server.listen(port, () => {

	console.log('Server is up on port' + port)
})