exports.startGame = (socket, data) => {
	socket.broadcast.to(data.room).emit('start-game')
}

exports.toHost = (socket, data) => {
	console.log("SUBMITTING", data.room, data.action)
	socket.to(data.room).emit(data.action, data)
}

exports.toRoom = (socket, data) => {
	socket.broadcast.to(data.room).emit(data.action, data)
}