import React, { Component, useState, useEffect } from 'react'
import { 
	View,
	StyleSheet,
	Animated,
	Text
} from 'react-native'
import gs from '../../Styles'
import Option from './Option'
import BullsEye from './BullsEye'
import { PlayerResponses, Scale } from '../Global'
import {playSound } from '../../Helpers/Sound'
import {startSpeech } from '../../Helpers/TTS'

const RevealOption = ({votes, responses, index, createPlayersText, callback, isTrue,also, players}) => {
	const [ showVotes, setShowVotes] = useState(false)
	const [ showResult, setShowResult] = useState(false)
	
	
	function animateResponsesComplete(){
		setShowResult(true)
		if (isTrue && votes.length) playSound('tada')
		else if (isTrue) playSound('fail')
		setTimeout(( ) => {
			if (isTrue){
				let comment = votes.length === players.length ? 'question-comment-all-correct' : 
						votes.length > 1 ? 'question-comment-some-correct' : 
						votes.length === 1 ? 'question-comment-one-correct' : 
						'question-comment-none-correct'
			
				startSpeech(comment, {player: votes[0] ? votes[0].player.name : ''}, () => {
					callback()
				})
			} else {
					callback()
			}
			
		},isTrue ? 3000 : 1200)
	}

	function createResultText(){
		return responses[index] ? 
			responses[index].isTrue ? 'The truth!' : 
			responses[index].player ? 
				createPlayersText(responses[index]) + "'s Lie" : 
				responses[index].ourLie ? "Our lie" : 
				
			' ':
		' '

	}
	return(
		<React.Fragment>
			<Option {...responses[index]} i={0} animationComplete={() => setShowVotes(true)}/>
			<View style={[styles.vSpacing]} />
			{showVotes &&
				<PlayerResponses responses={votes} animateVisibleComplete={animateResponsesComplete} inline/>
			}
			{!showVotes &&
				<View style={{height:100}}/>
			}
			<View style={[styles.vSpacing]} />
			{showResult &&
				<Scale duration={500} scaleTo={1} >
				<Text style={[gs.subtitle, gs.bold, {color:"#fff"}]}>{createResultText()}</Text>
				</Scale>
			}
			{!showResult &&
				<Text style={[gs.subtitle, gs.bold, {color:"#fff", fontWeight: '800'}]}>{ ' '} </Text>
			}
		</React.Fragment>
	)
}

const Reveal = ({responses, votes, onComplete, players}) => {
	const [filteredResponses, setFilteredResponses] = useState(filterResponses())
	const [filteredVotes, setFilteredVotes] = useState(filterVotes(0, true))
	const [index, setIndex] = useState(0)
	const [ showBullsEye, setShowBullseye] = useState(false)

	function filterVotes(i, firstRun){
		console.log('filtering votes',votes, i)
		const newVotes = votes.filter(item => {
			return (item.index === (filteredResponses[i] ? filteredResponses[i].index : false))
		})
		if (!firstRun){
			setFilteredVotes(newVotes)
		} else {
			return newVotes
		}
	}

	function filterResponses(){
		let newResponses= []
		for (var i = responses.length - 1; i >= 0; i--) {
			let hasVotes = votes.find(v => v.index === responses[i].index)
			if(hasVotes && !responses[i].isTrue){
				 newResponses.push(responses[i])
			}
		}
		let isTrue = responses.find(r => r.isTrue)
		newResponses.push(isTrue)
		return newResponses
	}

	function setNext(){
		console.log('SETTING NEXT')
		if (index < filteredResponses.length-1){
			const newIndex = index + 1
			filterVotes(newIndex)
			setIndex(newIndex)
			
		} else {
			if (filteredResponses[index].player){
				setShowBullseye(true)
				setIndex(index +1)
				startSpeech('bullseye', {player: createPlayersText(filteredResponses[index])}, () => {
					onComplete()
				})
			} else {
				onComplete()
			}
			
		}
	}

	function createPlayersText(response){


		let str = ''
		if (response.player) str += response.player.name 
		if (response.also && response.also.length > 0){
			for (var i =0; i < response.also.length; i++){
				str += ' & ' + response.also[i].player.name 
			}
		}
		return str
	}

	return (
		<View style={[gs.centeredContainer, styles.outerContainer, gs.column, {justifyContent:'flex-end'}]}>
			{filteredResponses && filteredResponses.map((item, i) => {
				if (index !== i) return <View key={i}/>
				return(
					<RevealOption createPlayersText={createPlayersText} key={i} isTrue={item.isTrue} players={players}callback={setNext}votes={filteredVotes} responses={filteredResponses} index={index}/>
					
				)
			})}
			<Scale duration={500} scaleTo={showBullsEye ? 0.6 : 0}>
				<BullsEye playerText={createPlayersText(filteredResponses[filteredResponses.length-1])}/>
			</Scale>
		</View>
	)
}





const styles = StyleSheet.create({
	outerContainer:{
		flex:1,
		flexDirection:'row',
		marginBottom:60,
	},
	vSpacing:{
		marginVertical:24,
	},
	wordContainer:{
		padding:12,
		marginHorizontal:40,
		borderWidth: 0,
		borderBottomWidth:16,
		borderBottomColor:'white',
		borderStyle:'solid'
	},
	hidden:{
		opacity:0,
	}
})

export default Reveal 