const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const util = require('util');

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



io.on('connection', (socket) => {


	socket.on('join', (params) => {

		
		socket.join(params.room);	
		users.removeUser(socket.id);
		users.addUser(socket.id, params.username, params.room);
		rooms.addUser(socket.id, params.username, params.room);
		console.log('user joined room');
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', {name:'Admin', text:'Welcome to the chat app'});
		socket.broadcast.to(params.room).emit('newMessage', {name:'Admin', text: params.username + ' has joined'})
		
		io.emit('updateRoomList', {roomlist:rooms.rooms});

		
		

	})


	socket.on('createMessage', (message) => {


		var user = users.users.filter((user) => user.id === socket.id);
		
		io.to(user[0].room).emit('newMessage', {text:message.text, name: user[0].name});


	})

	socket.on('socketusercheck', function(){

		
		var user = users.users.filter((user) => user.id === socket.id);
		
		if((user.length > 0) && (user[0].name != null) && (user[0].room != null)){

			socket.emit('validstatus', {validstatus:true});

	}else{
		socket.emit('validstatus', {validstatus:false});
	}



	})

	socket.on('disconnect', function(){
		var roomz;
		rooms.removeUser(socket.id);
		users.removeUser(socket.id);
		setTimeout(function(){
			roomz = rooms.checkRemove(); 
			console.log('roomremove');
			if(typeof roomz != 'undefined'){
			console.log('its not undefined');
			console.log(util.inspect(roomz, {showHidden: false, depth: null}));
			io.emit('updateRoomList', {roomlist:roomz});
			}else{
			console.log('it is undefined');
			io.emit('updateRoomList', {roomlist:rooms.rooms});
			}


		}, 1000);
		
		
	
	})


})



app.post('/rooms', function(req,res){

	res.send({rooms: rooms.rooms});


})

app.post('/join', function(req,res){

	
	var roomsearch = rooms.rooms.filter((room) => room.name == req.body.roomj);
	var usersearch = users.users.filter((user) => user.name == req.body.usernamej);
	console.log(usersearch + "usersearchjoin");
	if((roomsearch.length == 0) || (usersearch.length > 0) ){

		console.log('justerrorsent');
		if(roomsearch.length == 0){
			res.send({errorm:"Room does not exist."})
		}
		if(usersearch.length > 0){
			res.send({erroru:"Username already exists."})
		}

	}else{
		console.log('wtfsendtheroomsearch');
		res.send({roomsearch, usernamej:req.body.usernamej});
	}


})

app.post('/createroom', function(req,res){

	var usersearch = users.users.filter((user) => user.name == req.body.usernamej);
	var roomsearch = rooms.rooms.filter((room) => room.name == req.body.roomj);
	var errorcmsg;
	var errorcumsg;
	if((roomsearch.length > 0) || usersearch.length > 0 ) {

		if(roomsearch.length > 0){

			errorcmsg = "Room already exists";
		}
		if(usersearch.length > 0){

			errorcumsg = "Username already exists.";
		}

		res.send({errorc:errorcmsg, errorcu:errorcumsg});

		
	}else{

		rooms.addRoom(req.body.roomj , req.body.roomtc);
		console.log('roomadded');
		var roomsearch = rooms.rooms.filter((room) => room.name == req.body.roomj);
		io.emit('updateRoomList', {roomlist:rooms.rooms});

		res.send({roomsearch, usernamej:req.body.usernamej});
	}

	


})



server.listen(port, () => {

	console.log('Server is up on port' + port)
})