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
			`Let's play.... DJ...D...J.... You'll need all your music knowledge and lightning speed. Search for some playlists to get us started`,
		],
		question: [
			`This one's from ${params.name}.... ... ${params.question}  .... Enter your lies ... now`,
			`Straight from the mind of ${params.name}.... ... ${params.question}  .... What ....... could .......it .......be?`,
			`Complete the search term .... ... ${params.question} ..... `
		],
		'answers-in': [
			`The answers are in... Let's see what we've got.`,
			`What have we got here then?`,
			`Ok, what did you all think`,
		],
		'cast-vote': [
			`Which one is the real answer? Cast your votes.. Now.`,
			`Time to cast your votes.`,
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
			`Round ${params.round}...... .. ${params.name}.... ${params.player ? 'Chosen by ' + params.player : ''}............. Starting in 3........... 2...........1........... `,
			`Round ${params.round}...... .. ${params.player ? 'Chosen by ' + params.player : ''}.......... ${params.name}.... Starting in 3........... 2...........1........... `
		],
		'songs-suggestions-complete':[
			`Great! Let's get started.... Remember... This game is all about speed.`
		],
		'movie-start-presentations':[
			`Great! Let's get started.... Remember... This game is all about speed.`
		],
		'score-time':[
			`That's the end of that round.... Let's have a look at the scores`,
			`That's the end of that round... What are the scores on the doors`,
			`What are the scores looking like.`,
			`Ok, it's time to check out the scores.`,
		],
		'final-scores':[
			`That's it....  Time to see the final scores.`,
			`You've done all you can do... .  Time to see the final scores.`,
			`That's all for now... .  Time to find out who won`,
			`We're all done here... .  Time to shine a light on the scores`,
		],
		'end-of-game':[
			`Congrats ${params.winner}.... See you next time`,
			`Annnnd ${params.winner} is our winner.... See you next time`,
		],
		'movie-headshots':[
			`To get anywhere in this town we need good head shots.  Let's put them together now`
		],
		'movie-create-titles':[
			`Let's come up with some movie titles. Make them hard hitting... The more outrageous the title the better.`
		],
		'movie-choose-title':[
			`I've sent you a few titles. Pick the one you want to make into a movie`
		],
		'movie-storyboard':[
			`Let's start bringing this concept to life. You can submit up to 3 pictures which tell the story of your movie. Be quick, you haven't got long.`
		],
		'movie-cast':[
			`Time to think of the cast. Choose your star and give their character a name`
		],
		'movie-presentation':[
			`It's time for the premiers! .......  Each of you will get to present your movies to the judges. Really sell the concept.. It's the only way you'll win awards.`
		],
		'movie-presentation-player-first':[
			`first up we have...... ${params ? params.name : ''}`
		],
		'movie-presentation-player':[
			`next up. it's...... ${params ? params.name : ''}`
		],
		'movie-presentation-player-last':[
			`Last but not least we have...... ${params ? params.name : ''}`
		],
		'movie-review':[
			`What a show.... ... Judges, submit your reviews.`
		],
		'movie-review-vote':[
			`You've seen the movie... You've read the reviews. Give the best ones a like and then we'll move on`,
			`Pick your favorite reviews and we'll move on.`,
		],

	}
	let selection = speech[key]
	let item = selection[getRandomIndex(selection.length)]
	return item
}

