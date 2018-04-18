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

	$('.erroru').remove();
	$('.errorm').remove();


	$.post("/join",{

		usernamej: usernamej,
		roomj: roomj

	}, function(data,status){
		console.log('lets go yay!');


		if(typeof data.roomsearch != 'undefined'){

			if(data.roomsearch[0].type == 1){
			/*
			$('.usernameh').val(usernamej);
			$('.roomh').val(roomj);
			*/


			sessionStorage.setItem("usernamej", data.usernamej);
			sessionStorage.setItem("roomj", data.roomsearch[0].name);

			$('.hsignupForm').attr('action', '/chat.html').submit();
			

		}


		}else{

	
			if(typeof data.erroru != 'undefined' ){

				$('#usernamej').after('<li class="erroru">' + data.erroru + '</li>');

			}

			if(typeof data.errorm != 'undefined'){

				$('#roomj').after('<li class="errorm">' + data.errorm + '</li>');

			}

	}
		

	})

})



$('.createRoomForm').on('submit', function(e){

	e.preventDefault();
	var usernamej = $('#usernamec').val();
	var roomj = $('#roomc').val();
	var roomtc = $('.roomtypes').val();

	$('.errorc').remove();
	$('.errorcu').remove();

	console.log(roomtc+"roomtc");

	$.post("/createroom",{

		usernamej: usernamej,
		roomj: roomj,
		roomtc: roomtc

	}, function(data,status){
		console.log('lets go yay!');
		


if(typeof data.roomsearch != 'undefined'){


		if(data.roomsearch[0].type == 1){
			/*
			$('.usernameh').val(usernamej);
			$('.roomh').val(roomj);
			*/

			sessionStorage.setItem("usernamej", data.usernamej);
			sessionStorage.setItem("roomj", data.roomsearch[0].name);

			window.location.href = '/chat.html';
			//$('.hsignupForm').attr('action', '/chat.html').submit();
			

		}

	}else{


		
			

			if(typeof data.errorcu != 'undefined' ){

				$('#usernamec').after('<li class="errorcu">' + data.errorcu + '</li>');

			}

			if(typeof data.errorc != 'undefined'){

				$('#roomc').after('<li class="errorc">' + data.errorc + '</li>');

			}
	
		

		


	}

	})

})