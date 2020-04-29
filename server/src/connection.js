
const Rooms = require('./Models/room')
exports.hostConnected = function(socket, game){
	
	function createCode(){
		var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
		var text = '';
		for (var i = 0; i < 4; i++){
    		text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
	function createUniqueRoomId(){
		let room = createCode()
		Rooms.findOne({short: room}, function(err, result){
			if (result) return createUniqueRoomId()
			storeRoom(room)
		})
	}
	function storeRoom(room){
		Rooms.create({short: room, long: socket.id}, (err, roomToSend)=> {
			socket.emit('host-room-generated', roomToSend)
		})
	}
	const code = 'ABCD'
	function createDevRoom(){
		Rooms.findOne({short: code}, function(err, result){
			if (result) return deleteRooms()
			createRoom()
		})
	}
	function deleteRooms(){
		Rooms.deleteMany({}, () => {
			createRoom()
		})
	}
	function createRoom(){
		Rooms.create({short: code, long: socket.id, game}, (err, room)=> {
			console.log('host connected')
			socket.emit('host-room-generated', room)
		})
	}

	if (process.env.IS_DEV){
		createDevRoom()
	} else {
		createUniqueRoomId()
	}
}


exports.playerConnected = function(socket, playerData){
	console.log('player connected')
	Rooms.findOne({short: playerData.room}, function(err, result){
		
		if (err){	
			console.log('err')
			return socket.emit('error-joining', "Oops, something went wrong.")
		} else if (result) {
			playerData.game = result.game
			// socket.join(result.long)
			socket.to(result.long).emit('player-joined', playerData);
			// result.player = playerData
			// socket.emit('success-joining', result)
		} else {
			console.log('errorrr')
			return socket.emit('error-joining', "That room doesn't exist")
		}
	})
}


exports.playerJoinedRoom = function(io, socket, playerData){
	playerData.roomid = socket.id 
	socket.to(playerData.id).emit('success-joining', playerData)
	if (io.sockets.connected[playerData.id]){
		io.sockets.connected[playerData.id].join(socket.id);
		if (playerData.allowStartGame){
			socket.broadcast.to(socket.id).emit('min-players-reached')
		}
	}
}

exports.playerRejoinedRoom = function(io, socket, playerData){
	playerData.roomid = socket.id 
	console.log('rejoining', playerData)
	
	if (io.sockets.connected[playerData.id]){
		socket.to(playerData.id).emit('success-rejoining', playerData)
		io.sockets.connected[playerData.id].join(socket.id);
	} else {
		socket.to(playerData.id).emit('error-joining')
	}
	
}

exports.roomFull = function (socket, playerData){
	 socket.to(playerData.id).emit('error-joining', 'Room full')
}