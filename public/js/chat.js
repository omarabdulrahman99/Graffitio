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




$("#message-form").on('submit', function(e){

	e.preventDefault();

	/*var params = jQuery.deparam(window.location.search);*/

	var message = $('[name=message]').val();
	

	//$(".messages").append("User says:" + message);


	socket.emit('createMessage', {

			text: message

	})



})





socket.on('newMessage', function(message) {

	
	$(".messages").append('<br>' + '<h3>' + message.name + '</h3>' +": " + message.text);
	txt = " " + message.text;
	


})



document.addEventListener("DOMContentLoaded", function() {
   var mouse = { 
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev: false
   };
   // get canvas element and create context
   var canvas  = document.getElementById('drawing');
   var context = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;
   var socket  = io.connect();

   // set canvas to full browser width/height
   canvas.width = width;
   canvas.height = height;

   // register mouse event handlers
   canvas.onmousedown = function(e){ mouse.click = true; };
   canvas.onmouseup = function(e){ mouse.click = false; };

   canvas.onmousemove = function(e) {
      // normalize mouse position to range 0.0 - 1.0
      mouse.pos.x = e.clientX / width;
      mouse.pos.y = e.clientY / height;
      mouse.move = true;
   };

   // draw line received from server
	socket.on('draw_line', function (data) {
      var line = data.line;
      context.beginPath();
      context.moveTo(line[0].x * width, line[0].y * height);
      context.lineTo(line[1].x * width, line[1].y * height);
      context.stroke();
   });
   
   // main loop, running every 25ms
   function mainLoop() {
      // check if the user is drawing
      if (mouse.click && mouse.move && mouse.pos_prev) {
         // send line to to the server
         socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
         mouse.move = false;
      }
      mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
      setTimeout(mainLoop, 25);
   }
   mainLoop();
});