const util = require('util');


class Rooms {


	constructor(){

		this.rooms = [];




	}
	addRoom(name,type){

		var room = {name,type, users: [], team1users:[], team2users:[], team1p:0, team2p:0 , gip:false};
		this.rooms.push(room);

	}

	addUser(id,name,room){

		var user = {id,name,room};

		this.rooms.forEach(function(currval,index,array){
			
			if(currval.name == room){
				array[index].users.push(user);
			}
		})

		//console.log(util.inspect(this.rooms, {showHidden: false, depth: null}));
		

	}

	removeUser(id){
		var croom;
		this.rooms.forEach(function(currval,index,array){

			for(var i=0;i<currval.users.length;i++){
				if(currval.users[i].id == id){
					
					currval.users.splice(i,1);
				}
			}

			
		})
		//console.log(util.inspect(this.rooms, {showHidden: false, depth: null}));
	}

	checkRemove(){
		var roomms = this.rooms;
		this.rooms.forEach(function(currval,index,array){
			
			if(currval.users.length == 0){
				console.log(array[index].name+'currroomtosplice');
				roomms.splice(index,1);
			}

		})

		this.rooms = roomms;
		return this.rooms

	}

	checkRoomExists(rname){
		
		var exists = this.rooms.filter((room) => room.name == rname);
		if(exists.length > 0){

			return true;
		}
		else{
			return false;
		}



	}


}



module.exports = {Rooms};