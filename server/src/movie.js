exports.sendQuestions = (socket, {players, questions}) => {
	let filteredQuestions = Object.assign([], questions)
	for (var i = 0; i < players.length; i++){

		const {id, name} = players[i]
		console.log('mapping players', name)
		let playerQuestions = []
		for ( var j = 0; j < filteredQuestions.length; j++){
			console.log('mapping questions', filteredQuestions[j])
			if (playerQuestions.length < 3 && filteredQuestions[j].player.name !== name){
				playerQuestions.push(filteredQuestions[j])
				filteredQuestions.splice(j, 1)
			}
		}
		if (playerQuestions.length < 3 && filteredQuestions.length > 0){
			for ( var j = 0; j < filteredQuestions.length; j++){
				if (playerQuestions.length < 3){
					playerQuestions.push(filteredQuestions[j])
					filteredQuestions.splice(j, 1)
				}
			}
		}
		socket.to(id).emit('movie-questions', playerQuestions)
	}

}