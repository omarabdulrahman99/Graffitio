var socket = io();

var username = sessionStorage.getItem("usernamej");
 var room = sessionStorage.getItem("roomj");
  var params = {
  	username,
  	room
  }

sessionStorage.removeItem("usernamej");
sessionStorage.removeItem("roomj");


socket.on('connect', function(){

	

	

  //var params = jQuery.deparam(window.location.search);
  
  	socket.emit('join', params, function (err) {
    		if (err) {
      		alert(err);
      		window.location.href = '/';
    	} else {
      		console.log('No error');
    			}


  			});//endsocketemit

  	socket.emit('socketusercheck');
	


})

socket.on('validstatus', function(data){

console.log(data.validstatus);
	if(data.validstatus != true){

		
		window.location.href = '/';

	}//endifelse

})

socket.on('newMessage', function(message) {

	
	$(".messages").append('<br>' + message.name + " says:" + message.text);


})




$("#message-form").on('submit', function(e){

	e.preventDefault();

	/*var params = jQuery.deparam(window.location.search);*/

	var message = $('[name=message]').val();
	

	//$(".messages").append("User says:" + message);


	socket.emit('createMessage', {

			text: message

	})



})

