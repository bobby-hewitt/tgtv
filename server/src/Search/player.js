const Bing = require('../bing')

exports.submitSuggestion = (socket, data) => {
	
	// const response = {"_type": "Suggestions", "queryContext": {"originalQuery": "what can i do to do the old doo de doo dar that is really long"}, "suggestionGroups": [{"name": "Web", "searchSuggestions": [ { url:
	//      'https://www.bing.com/search?q=what+can+i+make+with+these+letters&FORM=USBAPI',
	//     displayText: 'what can i make with these letters',
	//     query: 'what can i make with these letters',
	//     searchKind: 'WebSearch' },
	//   { url: 'https://www.bing.com/search?q=what+can+i+claim&FORM=USBAPI',
	//     displayText: 'what can i claim',
	//     query: 'what can i claim',
	//     searchKind: 'WebSearch' },
	//   { url: 'https://www.bing.com/search?q=what+can+i+do&FORM=USBAPI',
	//     displayText: 'what can i do',
	//     query: 'what can i do',
	//     searchKind: 'WebSearch' },
	//   { url:
	//      'https://www.bing.com/search?q=what+can+i+run+it&FORM=USBAPI',
	//     displayText: 'what can i run it',
	//     query: 'what can i run it',
	//     searchKind: 'WebSearch' },
	//   { url:
	//      'https://www.bing.com/search?q=what+can+i+make+with+these+ingredients&FORM=USBAPI',
	//     displayText: 'what can i make with these ingredients',
	//     query: 'what can i make with these ingredients',
	//     searchKind: 'WebSearch' },
	//   { url:
	//      'https://www.bing.com/search?q=what+can+i+do+youtube&FORM=USBAPI',
	//     displayText: 'what can i do youtube',
	//     query: 'what can i do youtube',
	//     searchKind: 'WebSearch' },
	//   { url:
	//      'https://www.bing.com/search?q=what+can+i+make+with+plain+flour&FORM=USBAPI',
	//     displayText: 'what can i make with plain flour',
	//     query: 'what can i make with plain flour',
	//     searchKind: 'WebSearch' },
	//   { url:
	//      'https://www.bing.com/search?q=what+can+i+use+instead+of+yeast&FORM=USBAPI',
	//     displayText: 'what can i use instead of yeast',
	//     query: 'what can i use instead of yeast',
	//     searchKind: 'WebSearch' } ]
	// }]}

	function cleanResponses(arr, q){
		let newResponses = []
		for (var i = 0 ; i < arr.length; i++){
			let r = arr[i].displayText
			console.log('in cleaning')
			if (r.indexOf(q.trim()) > -1){
				console.log('in the same')
				r= r.replace(q.trim(), '').trim()
				if (r && r.length){
					newResponses.push(r)
				}
			}
		}
		return newResponses
	}

	// let q = response.queryContext.originalQuery
	// let arr = response.suggestionGroups[0].searchSuggestions
	// const responses = cleanResponses(arr, q)
	// const questionData = {
	// 	q,
	// 	a: responses,
	// 	responses: [],
	// 	votes: [],
	// 	also,
	// 	player: data.player

	// }
	// socket.to(data.room).emit('submit-suggestion', questionData)
	

	Bing.autocomplete(data.suggestion).then((res) => {
		let response = JSON.parse(res)
		let q = response.queryContext.originalQuery
		let arr = response.suggestionGroups[0].searchSuggestions
		if (!arr.length)  return socket.emit('search-suggestion-error', data.suggestion)
		const responses = cleanResponses(arr, q)
		if (responses.length){
			const questionData = {
				q,
				a: responses,
				responses: [],
				votes: [],
				player: data.player

			}
			
			socket.to(data.room).emit('submit-suggestion', questionData)
		} else {
			socket.emit('search-suggestion-error', data.suggestion)
		}
	})
	.catch((err) => {
		console.log('ERR', err)
	})
}
