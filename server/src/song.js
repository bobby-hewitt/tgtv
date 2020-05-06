const Spotify = require('./spotify')

exports.sendCategories = (socket, data) => {
	console.log('Getting CATEGORies')
	Spotify.categories().then((categories) => {
		
		socket.to(socket.id).emit('choose-category', categories)
		socket.emit('choose-category', categories)
	})
} 

exports.sendCategoriesPlayer = (socket, data) => {
	Spotify.categories().then((categories) => {
		console.log('got cats', categories.length)
		socket.emit('choose-category-player', categories)
	})
} 

exports.sendPlaylists = (socket, data) => {
	console.log('lookin', data, socket.id)
	Spotify.playlists(data).then((playlists) => {

		console.log('got playlists', playlists[0])
		socket.to(socket.id).emit('choose-playlist', playlists)
		socket.emit('choose-playlist', playlists)
	})
	.catch(() => {
		socket.emit('error-getting-playlist')
		
	})
} 


exports.sendTracks = (socket, data) => {
	Spotify.tracks(data.id)
	.then((tracks) => {
		const response = {
			tracks,
			player:data.player,
			image: data.image,
			playlistName: data.name

		}
		socket.to(data.room).emit('submit-suggestion', response)
	})
	.catch((err) => {
		socket.emit('playlist-suggestion-failed', data.index)
	})
}
