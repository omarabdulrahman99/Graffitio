var socket = io();


socket.on('connect', function(){




	console.log('connected wtf')
	$(".messages").append("User connected");

	



})


socket.on('newMessage', function(message) {


	$(".messages").append('<br>' + message.name + " says:" + message.text);


})


$('.signupForm').on('submit', function(e){

	e.preventDefault();
	var usernamej = $('#usernamej').val();
	var roomj = $('#roomj').val();

	
	$.post("/join",{

		usernamej: usernamej,
		roomj: roomj

	}, function(data,status){


	})

	

})



$("#message-form").on('submit', function(e){

	e.preventDefault();

	var params = jQuery.deparam(window.location.search);

	var message = $('[name=message]').val();
	console.log(message+'message to be appended');

	//$(".messages").append("User says:" + message);


	socket.emit('createMessage', {

			text: message,
			room: params.room,
			username: params.username


	})



})