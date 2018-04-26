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


$('.roomSection').hide();
$('.signupSection').hide();
$('.createRoomSection').hide();



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

			window.location.href = '/chat.html';
			

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

WebFontConfig = {
    google: { families: [ 'Loved+by+the+King::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

// get 2D context
    var ctx = document.querySelector("canvas").getContext("2d"),
    
        // dash-length for off-range
        dashLen = 500,
        
        // we'll update this, initialize
        dashOffset = dashLen,
        dashOffset2 = dashLen,
        
        // some arbitrary speed
        speed = 100,
        
        // the text we will draw
        txt = " Envision",
        
        
        // start position for x and iterator
        x = 200, i = 0, j=0;

// Comic Sans?? Let's make it useful for something ;) w/ fallbacks
    ctx.font = "60px 'Great Vibes' "; 
    
    // thickness of the line
    ctx.lineWidth = 1; 
    
    // to avoid spikes we can join each line with a round joint
    //ctx.lineJoin = "round";
    
    // increase realism letting background (f.ex. paper) show through
    ctx.globalAlpha = 2/3;
    
    // some color, lets use a black pencil
    ctx.strokeStyle = ctx.fillStyle = "#FFF";




function loop() {
      // clear canvas for each frame
      ctx.clearRect(x, 0, 0, 0);
      
      // calculate and set current line-dash for this char
      ctx.setLineDash([0,400]); //dashLen - dashOffset, dashOffset - speed
      
      // reduce length of off-dash
      dashOffset -= speed;
      
      // draw char to canvas with current dash-length
      ctx.strokeText(txt[i], x, 90);
      console.log(dashOffset);
      // char done? no, the loop
      if (dashOffset > 0) requestAnimationFrame(loop);
      else {
      console.log(txt[i]);
        // ok, outline done, lets fill its interior before next
        ctx.fillText(txt[i], x, 90);
        
        // reset line-dash length
        dashOffset = dashLen;
        
        // get x position to next char by measuring what we have drawn
        // notice we offset it a little by random to increase realism
        x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
        
        // lets use an absolute transform to randomize y-position a little
        ctx.setTransform(1, 0, 0, 1, 200, 270); //3 * Math.random()
        
        // and just cause we can, rotate it a little too to make it even
        // more realistic
        ctx.rotate(Math.random() * 0.00);
        
        // if we still have chars left, loop animation again for this char
        if (i < txt.length) requestAnimationFrame(loop);
      }

    };  // just to self-invoke the loop


$('#bgmimick').hide().fadeIn(7000, "swing", function() {
    // Animation complete.
  });
    
setTimeout(function(){

loop();

},500)

setTimeout(function(){
	var canvas =  document.querySelector("canvas");
	ctx.clearRect(0,0,canvas.width,canvas.height);
	dashLen = 500;
	x = 350, i = 0, j=0;

	txt=" your";
	loop();
},2500);

setTimeout(function(){
	var canvas =  document.querySelector("canvas");
	ctx.clearRect(0,0,canvas.width,canvas.height);
	dashLen = 500;
	x = 470, i = 0, j=0;
	ctx.strokeStyle = ctx.fillStyle = "#fff";
	txt=" reality";
	loop();
	ctx.clearRect(0,0,canvas.width,canvas.height);


},4500);

setTimeout(function(){
	var canvas =  document.querySelector("canvas");
	ctx.clearRect(0,0,canvas.width,canvas.height);
	dashLen = 500;
	x = 310, i = 0, j=0;
	ctx.strokeStyle = ctx.fillStyle = "#000";
	txt=" GraffitIO";
	loop();
	ctx.clearRect(0,0,canvas.width,canvas.height);


},6500);

setTimeout(function(){

	$("body").css("background-color","white");
	$('#bgmimick').remove();
	$('.roomSection').show();
	$('.signupSection').show();
	$('.createRoomSection').show();

	
},8500);
