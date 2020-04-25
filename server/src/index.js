require('dotenv').config({path: '.env'})
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
const PORT = process.env.PORT || 9000
app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {  useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on('error', () => console.info('Error: Could not connect to MongoDB.?'));
mongoose.connection.on('connected', () =>  console.info('Successfully connected to the database'))

const Rooms = require('./Models/room')
const Connection = require('./Connection')
const GeneralPlayer = require('./General/player')
const GeneralHost = require('./General/host')
const SearchPlayer = require('./Search/player')
const Song = require('./song')
const Movie = require('./movie')



server.listen(PORT);

io.on('connection', function(socket){
  	
  	console.log('socket connected', socket.id)
  	socket.on('disconnect', disconnect.bind(this, socket));
  	socket.on('host-joined', Connection.hostConnected.bind(this, socket)) 	
  	socket.on('player-joined', Connection.playerConnected.bind(this, socket)) 
  	socket.on('success-joining', Connection.playerJoinedRoom.bind(this, io, socket))	
  	socket.on('success-rejoining', Connection.playerRejoinedRoom.bind(this, io, socket))
  	socket.on('room-full', Connection.roomFull.bind(this, socket))

  	socket.on('start-game', GeneralPlayer.startGame.bind(this, socket)) 
  	socket.on('submit-suggestions', GeneralHost.submitSuggestions.bind(this, socket)) 
  	socket.on('submitting-search-suggestion', SearchPlayer.submitSuggestion.bind(this, socket))
  	socket.on('set-room-waiting', GeneralHost.setRoomWaiting.bind(this, socket))
  	socket.on('send-answer-input', GeneralHost.sendAnswerInput.bind(this, socket))

  	socket.on('player-to-host', GeneralPlayer.toHost.bind(this, socket))
  	socket.on('player-to-room', GeneralPlayer.toRoom.bind(this, socket))
  	socket.on('host-to-player', GeneralHost.toPlayer.bind(this, socket))
  	socket.on('host-to-room', GeneralHost.toRoom.bind(this, socket))
    socket.on('choose-category', Song.sendCategories.bind(this, socket))
    socket.on('choose-playlists', Song.sendPlaylists.bind(this, socket))
    socket.on('submitting-song-suggestion', Song.sendTracks.bind(this, socket))

    socket.on('send-movie-questions', Movie.sendQuestions.bind(this, socket))

  	// //player
  	// socket.on('player-joined', Player.connected.bind(this, socket)) 	
  	// socket.on('start-game', Player.start.bind(this, socket)) 	

  	// //custom logic.
  	// // socket.on('send-round', Host.sendRound.bind(this, socket))
  	// socket.on('send-player-model', Host.sendPlayerModel.bind(this, socket))
  	// socket.on('submit-response', Player.submitResponse.bind(this, socket))
  	// socket.on('send-ballot', Host.sendBallot.bind(this, socket))
  	// socket.on('submit-vote', Player.submitVote.bind(this, socket))
  	// socket.on('generic-set', Host.genericSet.bind(this, socket))
  	// socket.on('final-round-answer-input', Host.finalRoundAnswerInput.bind(this, socket))
  	// socket.on('submit-final-response', Player.submitFinalResponse.bind(this, socket))
  	// socket.on('final-round-ballot', Host.finalRoundBallot.bind(this, socket))
  	// socket.on('submit-final-vote', Player.submitFinalVote.bind(this, socket))
});


function disconnect(socket){
	console.log('disconnected', socket.id)
	Rooms.findOne({long: socket.id}, (err, room) => {
		if (room){
			console.log('host gone', room)
			socket.broadcast.to(room.long).emit('host-disconnected')
      room.remove()
      Rooms.deleteMany({short: room.short}, (err, res) => {
        console.log(res)
      } )
			return 
		} 
		else {
			const rooms = Object.keys(socket.adapter.rooms)
			for (var i = 0; i < rooms.length; i++){
				if (rooms[i] !== socket.id){
					socket.broadcast.to(rooms[i]).emit('player-left', {id: socket.id});
				}
			}
		}
	})
}