var socket = io();

socket.on('updateRoomList', function(roomdata){

console.log('updateroom');
var rooms = roomdata.roomlist;

console.dir(rooms);

$(".appendhere").html("");

for(var i =0; i<rooms.length; i++){


	$(".appendhere").append('<tr>' + '<th scope="row"></th>' + '<td>' + rooms[i].name  + '</td>'
	+ '<td>' + rooms[i].users.length + '</td>' + '<td>' + rooms[i].gip + '</td>' + '</tr>' );

}



})



$.post("/rooms", function(data, status){


		var rooms = data.rooms;
		console.log(rooms);
		for(var i =0; i<rooms.length; i++){

			$(".appendhere").append('<tr>' + '<th scope="row"></th>' + '<td>' + rooms[i].name  + '</td>'
			+ '<td>' + rooms[i].users.length + '</td>' + '<td>' + rooms[i].gip + '</td>' + '</tr>' );

		}

		

})

$('.signupForm').on('submit', function(e){

	e.preventDefault();
	var usernamej = $('#usernamej').val();
	var roomj = $('#roomj').val();


	$.post("/join",{

		usernamej: usernamej,
		roomj: roomj

	}, function(data,status){
		console.log('lets go yay!');

		if(data.roomsearch[0].type === 1){
			/*
			$('.usernameh').val(usernamej);
			$('.roomh').val(roomj);
			*/

			sessionStorage.setItem("usernamej", data.usernamej);
			sessionStorage.setItem("roomj", data.roomsearch[0].name);

			$('.hsignupForm').attr('action', '/chat.html').submit();
			

		}

	})

})

