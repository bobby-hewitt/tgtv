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
import { PlayerResponses, Scale, Translate } from '../Global'
import {playSound } from '../../Helpers/Sound'
import {startSpeech } from '../../Helpers/TTS'
import Score from './Score'
const RevealOption = ({votes, round, responses, index, createPlayersText, colors, callback, isTrue,also, players}) => {
	const [ showVotes, setShowVotes] = useState(false)
	const [ showResult, setShowResult] = useState(false)
	const [ isVisible, setIsVisible ] = useState(true)
	const [ showResultScore, setShowResultScore ] = useState(false)

	const multiplier = round < 2 ? 1 : round < 4 ? 2 : 3
	
	function onScaleComplete(){
		callback()
	}

	
	function animateResponsesComplete(){
		setTimeout(() => {


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
						setIsVisible(false)
				}
				
			},3000)
		},1000)
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

	function createResultColor(){
		return responses[index] ? 
			responses[index].isTrue ? '#34a853' : 
			responses[index].player ? "#000000" : 
				responses[index].ourLie ? '#ea4335' : 
				
			"#000000":
		"#000000"
	}
	return(
		
		<Translate toVal={isVisible ? 0 : isTrue ? 0 : 1000} fromVal={0} transformOrigin="top" duration={300} animationComplete={() => {if (!isVisible) onScaleComplete()}}>
		
		<View style={{width:'100%', height:'100%', alignItems:'center'}}>
			<Option {...responses[index]} color={colors ? colors[responses[index].index % colors.length] : '#333'} i={0} animationComplete={() => setShowVotes(true)}/>
			<View style={[]} />
			{showVotes &&
				<View style={{position:'relative'}}>
				<PlayerResponses colors={colors} responses={votes} animateVisibleComplete={animateResponsesComplete} inline/>
				{responses[index].isTrue && showResultScore && votes && votes.length > 0 &&
					<Score score={200 * multiplier} backgroundColor={'#000'}/>
				}
				</View>
			}
			{!showVotes &&
				<View style={{height:100}}/>
			}
			<View style={{marginTop:votes.length > 0 ? 80 : 0}} />
			{showResult &&
				<Scale duration={500} scaleFrom={10} scaleTo={1} animationComplete={() => {
					setShowResultScore(true)
					
				}}>
					<View style={{width:'100%'}}>
					<View style={[styles.resultOuterContainer, {borderColor:createResultColor()}]}>
						<Text style={[gs.subtitle, gs.bold, {color:createResultColor()}]}>{createResultText()}</Text>
					</View>
					
					</View>
					{showResultScore && responses[index].player && !responses[index].isTrue && !responses[index].ourLie &&
						<Score score={multiplier * responses.length * 100 } backgroundColor={createResultColor()}/>
					}
				</Scale>

			}
			{!showResult &&
				<View style={[styles.resultOuterContainer, {borderColor:'transparent', backgroundColor:'transparent'}]}>
				<Text style={[gs.subtitle, gs.bold, {color:"#fff", fontWeight: '800'}]}>{ ' '} </Text>
				</View>
			}
			</View>
			
			</Translate>
			
		
	)
}

const Reveal = ({round, responses, votes, colors, onComplete, players}) => {
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
					<RevealOption round={round} colors={colors} createPlayersText={createPlayersText} key={i} isTrue={item.isTrue} players={players}callback={setNext}votes={filteredVotes} responses={filteredResponses} index={index}/>
					
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
	resultOuterContainer:{
		transform:[

			{rotate:-0.05},
			
		],
		borderWidth:10,
		backgroundColor:'#fff',
		padding:20,
		borderRadius:20
	},
	vSpacing:{
		marginVertical:60,
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