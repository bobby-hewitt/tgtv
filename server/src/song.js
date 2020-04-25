const Spotify = require('./spotify')

exports.sendCategories = (socket, data) => {
	console.log('Getting CATEGORies')
	Spotify.categories().then((categories) => {
		
		socket.to(socket.id).emit('choose-category', categories)
		socket.emit('choose-category', categories)
	})
} 

exports.sendPlaylists = (socket, data) => {
	console.log('lookin', data, socket.id)
	Spotify.playlists(data).then((playlists) => {
		console.log('got playlists', playlists[0])
		socket.to(socket.id).emit('choose-playlist', playlists)
		socket.emit('choose-playlist', playlists)
	})
} 


exports.sendTracks = (socket, data) => {
	Spotify.tracks(data.id)
	.then((tracks) => {
		const response = {
			tracks,
			player:data.me,
			image: data.image,
			playlistName: data.name

		}
		socket.to(data.room).emit('submit-suggestion', response)
	})
	.catch((err) => {
		socket.emit('playlist-suggestion-failed', data.index)
	})
}
