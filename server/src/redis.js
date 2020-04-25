const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});
client.on("end", function(error) {
  console.log('Disconnected from redis');
});
client.on('connect',function(){
    console.log('connected to redis');
});



exports.get = (game) => {
	return new Promise((resolve, reject) => {
		client.get(game, (err, res) => {
			if (err){
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

exports.set = (game) => {
	return new Promise((resolve, reject) => {
		client.set(game.roomCode, game, (err, res) => {
			if (err){
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}