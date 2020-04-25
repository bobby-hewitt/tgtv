import React from 'react'
import TTS from 'react-native-tts';

TTS.setDefaultPitch(1.9);
TTS.setDefaultRate(0.5);
export const cancelSpeech =() => {
	TTS.stop()
}



 export const startSpeech = (key, params, callback) => {
 	if (callback) return callback()
 	TTS.stop()
 	TTS.removeEventListener('tts-start', start);
	TTS.removeEventListener('tts-finish', finish);
	TTS.removeEventListener('tts-cancel', finish);
 	TTS.addEventListener('tts-start', start);
	TTS.addEventListener('tts-finish', finish);
	TTS.addEventListener('tts-cancel', finish);
	
	
	const script = getScript(key, params)
	TTS.speak(script, { iosVoiceId: "com.apple.ttsbundle.Daniel-compact" })

	function start(){

	}

	function finish(){
		TTS.removeEventListener('tts-start', start);
		TTS.removeEventListener('tts-finish', finish);
		TTS.removeEventListener('tts-cancel', finish);
		if (callback){
			callback()
		}
		
		
	}
}


function getScript(key, params){
	function getRandomIndex(max){
		return Math.floor(Math.random() * max)
	}
	const speech = {
		'introduction': [
			`Hello, You might know me as Siri, but others know me as the trending Guru.... Let's play.... web...heads`,
			`Hello, I'm the trending guru... Let's play.... web...heads`,
		],
		'introduction-song':[
			`Hello, I'm the trending guru... Let's play.... DJ...D...J.... Pick some playlists to get us going`,
			`Let's play.... DJ...D...J.... You'll need all your music knowledge and lighning speed. Search for some playlists to get us started`,
		],
		question: [
			`This one's from ${params.name}.... ... ${params.question}  .... Enter your lies ... now`,
			`Straight from the mind of ${params.name}.... ... ${params.question}  .... What ....... could .......it .......be?`,
			`Complete the search term .... ... ${params.question} ..... `
		],
		'answers-in': [
			`The answers are in... But which one is real?`,
			`Time to cast your votes. What did people really search foooor?`,
		],
		'waiting-for':[
			`We're waiting for ${params.player} again`,
			`${params.player}... this is too slow`,
		],
		'question-comment-all-correct':[
			`You all deserve a medal..... Well not really.. Hahaha ..... hahahahaha ..... ha`
		],
		'question-comment-some-correct':[
			`Not bad`
		],
		'question-comment-one-correct':[
			`Well... at least ${params.player} got it right}`
		],
		'question-comment-none-correct':[
			`Hmmmm, you lot are out of touch`
		],
		'bullseye':[
			`...And... bang on the money with their guess....  ${params.player} got a bulls eye! `,
			`...Boom!...  ${params.player} got a bulls eye! `,
			// `...And... bang on the money....  ${params.player} got a bullseye! `
		],
		'songs-playlist':[
			`Round ${params.round}...... .. ${params.name}.... Starting in 3........... 2...........1........... `
		],
		'songs-suggestions-complete':[
			`Great! Let's get started.... Remember... This game is all about speed.`
		],
		'movie-start-presentations':[
			`Great! Let's get started.... Remember... This game is all about speed.`
		],
	}
	let selection = speech[key]
	let item = selection[getRandomIndex(selection.length)]
	return item
}

