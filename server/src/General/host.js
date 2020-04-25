exports.submitSuggestions = (socket, data) => {
	socket.broadcast.to(socket.id).emit('submit-suggestions')
}

exports.setRoomWaiting = (socket) => {
	console.log("SHOULD SET WAITING")
	socket.broadcast.to(socket.id).emit('set-waiting')	
}

exports.sendAnswerInput = (socket) => {
	socket.broadcast.to(socket.id).emit('send-answer-input')		
}

exports.toPlayer = (socket, data) => {
	socket.to(data.player).emit(data.action, data)
}

exports.toRoom = (socket, data) => {
	socket.broadcast.to(socket.id).emit(data.action, data)
}