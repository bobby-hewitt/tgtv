const request = require('request')


const calls = {
	categories: 'https://api.spotify.com/v1/browse/categories?limit=50',
	playlists: 'https://api.spotify.com/v1/browse/featured-playlists?limit=50',
	searchPlaylists: 'https://api.spotify.com/v1/search?limit=50&type=playlist&q='
}


function categories(){
	return new Promise((resolve, reject) => {
		authenticate()
		.then((token) => {
			getCategories(token).then((data) =>{
				resolve(data)
			})
		})
		.catch((err) => {
			reject()
		})
	})
}

function getCategories(token){
	const options = {
		url: calls.categories,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		json: true
	};
	return new Promise((resolve, reject)=> {
		 request.get(options, function(error, response, body) {
	    	if (!error && body){
	    		
	    		resolve(body.categories.items)
	    	} else {
	    		reject('error hetting playlists')
	    	}
	    });
	})
}

function getPlaylistsByCategory(){
	return new Promise((resolve, reject) => {
		authenticate()
		.then((token) => {
			getCategories(token).then((data) =>{
				resolve(data)
			})
		})
		.catch((err) => {
			reject()
		})
	})
}



function playlists(data){
	const search  = data.search
	const category = data ? data.category : false
	return new Promise((resolve, reject) => {
		authenticate()
		.then((token) => {
			if (search){
				searchPlaylists(token, search)
				.then((data) => {
					resolve(data.items.filter(i => i.tracks.total >=5))
				})
				.catch(() => {
					reject()
				})
			} else {
				getPlaylists(token, category)
				.then((data) => {
					resolve(data.items.filter(i => i.tracks.total >=5))
				})
				.catch(() => {
					reject()
				})
			} 
		})
		.catch((err) => {
			reject()
		})
	})
	
}


function tracks(id){
	return new Promise((resolve, reject) => {
		const url = `https://api.spotify.com/v1/playlists/${id}/tracks`
		authenticate()
		.then((token) => {
			getTracks(token, url)
			.then((data) => {
				if (data.length >= 5){
					resolve(data)
				} else {
					reject()
				}
			})
		})
		.catch((err) => {
			reject()
		})
	})
}


function authenticate(){
	var authOptions = {
	  url: 'https://accounts.spotify.com/api/token',
	  headers: {
	    'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
	  },
	  form: {
	    grant_type: 'client_credentials'
	  },
	  json: true
	};
	return new Promise((resolve, reject) => {
		request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {	
				resolve(body.access_token)
			} else {
				reject('error authenticating')
			}		
		})
	})
}

function searchPlaylists(token, search){

	const options = {
		url: calls.searchPlaylists + search,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		json: true
	};
	return new Promise((resolve, reject)=> {
		 request.get(options, function(error, response, body) {
	    	if (!error && body && body.playlists){
	    		resolve(body.playlists)
	    	} else {
	    		reject('error hetting playlists')
	    	}
	    });
	})
}


function getPlaylists(token, category){
	const url = category ? `https://api.spotify.com/v1/browse/categories/${category}/playlists?country=GB` : calls.playlists
	const options = {
		url: url,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		json: true
	};
	return new Promise((resolve, reject)=> {
		 request.get(options, function(error, response, body) {
	    	if (!error && body && body.playlists){
	    		resolve(body.playlists)
	    	} else {
	    		reject('error hetting playlists')
	    	}
	    });
	})
	
}

function getTracks(token, url){
	const options = {
		url: url,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		json: true
	};
	return new Promise((resolve, reject)=> {
		 request.get(options, function(error, response, body) {
	    	if (!error && body ){
	    		
	    		let newTracks = filterTracks(body.items)
	    		let withResponses = addResponses(newTracks)

	
	    		resolve(withResponses)

	    	} else {
	    		reject('error getting tracks')
	    	}
	    });
	})
}

function getRandom(limit){
	return Math.floor(Math.random() * limit)
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function addResponses(tracks){

	const { allNames, allArtists } = createTrackSets(tracks)

	for (var i = 0; i < tracks.length; i++){

		tracks[i] = createResponses(tracks[i], allArtists, allNames,tracks )
	}
	let shuffled = shuffle(tracks)
	return shuffled.splice(0,10)
}

function createTrackSets(tracks){
	let allArtists = []
	let allNames = []
	for (var i = 0; i < tracks.length; i++){
		allArtists.push( tracks[i].artist)
		allNames.push( tracks[i].name)
	}
	return {
		allArtists: [ ...new Set(allArtists)],
		allNames: [ ...new Set(allNames)],
	}
}

function createResponses(track, allArtists, allNames, tracks){
	track.artistResponses = [track.artist]
	track.nameResponses = [track.name]
	track.responses = [{
		artist: track.artist,
		name: track.name,
		isTrue: true,
	}]
	for (var j = 0; j < 3; j++){

		// track.artistResponses.push( allArtists[getRandom(allArtists.length)])
		// track.nameResponses.push( allNames[getRandom(allNames.length)])
		let newTrack = getRandomTrack(getRandom(tracks.length), tracks, track.responses)
		if (newTrack){
		track.responses.push({
			artist: newTrack.artist,
			name: newTrack.name
		})
		}
	}
	// track.artistResponses = shuffle(track.artistResponses)
	// track.nameResponses = shuffle(track.nameResponses)
	track.responses = shuffle(track.responses)

	return track
}

function getRandomTrack(index, tracks, fullResponses){
	return tracks[test(index)]	
	function test(){
		const initialIndex = index
		let index2 = index
		let isIncluded = fullResponses.find(r => r.name === tracks[index2].name && r.artist === tracks[index2].artist )

		while (isIncluded){
			console.log('in while')
			index2 = index2 + 1 < tracks.length -1 ? index2 + 1 : 0
			if (index2 === initialIndex)
			return false
			isIncluded = fullResponses.find(r => r.name === tracks[index2].name && r.artist === tracks[index2].artist )
		}
		return index2
	}
	
}

function pullKeyTrackData(track){
	return {
		image_url: track.track.album.images[0].url,
		preview_url: track.track.preview_url,
		artist: track.track.artists[0].name,
		name: track.track.name,
		votes: [],
		responses: [],
	}
}

function filterTracks(items){
	let newTracks = []
	for (var i = 0; i < items.length; i++){
		if (items[i].track && items[i].track.preview_url){
			newTracks.push(pullKeyTrackData(items[i]))
		}
	}
	return newTracks
}
   
module.exports = {
	categories,
	playlists,
	tracks
}

