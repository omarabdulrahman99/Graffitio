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
		rooms.users.push(user);

	}


}



module.exports = {Rooms};