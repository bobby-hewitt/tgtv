const request = require('request');

const path = 'https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q='



exports.autocomplete = (query) => {
	const q = encodeURIComponent(query+ ' ')
	console.log('atuo', q)
	let params = {
		method : 'GET',
		uri: 'https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=' + q + '%20',
		headers : {
		  'Ocp-Apim-Subscription-Key' : process.env.BING_KEY,
		}
	};
	return new Promise((resolve, reject) => {
		request(params, (err, res, body) => {
			if (err) return reject(err)
			else {
				resolve(body)
			}
		})
	})
} 