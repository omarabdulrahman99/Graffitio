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
app.set('view engine', 'pug');
app.set('views', './views');

rooms.rooms.push({name:'dogs',type:1, users: [], team1users:[], team2users:[], team1p:0, team2p:0 , gip:false});
rooms.rooms.push({name:'dogs',type:1, users: [], team1users:[], team2users:[], team1p:0, team2p:0 , gip:false});

io.on('connection', (socket) => {


	socket.on('join', (params) => {

		console.log('joinfirst');
		socket.join(params.room);	
		users.removeUser(socket.id);
		users.addUser(socket.id, params.username, params.room);
		rooms.addUser(socket.id, params.username, params.room);
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', {name:'Admin', text:'Welcome to the chat app'});
		socket.broadcast.to(params.room).emit('newMessage', {name:'Admin', text: params.username + ' has joined'})
		console.log('joinsecond');
		io.emit('updateRoomList', {roomlist:rooms.rooms});

		
		

	})


	socket.on('createMessage', (message) => {


		var user = users.users.filter((user) => user.id === socket.id);
		
		io.to(user[0].room).emit('newMessage', {text:message.text, name: user[0].name});


	})

	socket.on('socketusercheck', function(){

		console.log('usercheck');
		var user = users.users.filter((user) => user.id === socket.id);
		
		if((user.length > 0) && (user[0].name != null) && (user[0].room != null)){

			socket.emit('validstatus', {validstatus:true});

	}else{
		socket.emit('validstatus', {validstatus:false});
	}



	})

	socket.on('disconnect', function(){

		console.log('disconnected this: ' + socket.id);
		rooms.removeUser(socket.id);
		users.removeUser(socket.id);
		io.emit('updateRoomList', {roomlist:rooms.rooms});
	
	})


})



app.post('/rooms', function(req,res){

	res.send({rooms: rooms.rooms});


})

app.post('/join', function(req,res){

	
	var roomsearch = rooms.rooms.filter((room) => room.name === req.body.roomj)
	

			
			res.send({roomsearch, usernamej:req.body.usernamej});



})



server.listen(port, () => {

	console.log('Server is up on port' + port)
})