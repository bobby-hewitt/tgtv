import React, { Component, useEffect, useRef } from 'react'
import { 
	View,
	StyleSheet,
	Animated,
	Text
} from 'react-native'
import {Reveal} from '../../Components/Search'
import { Players, Timer, PlayerResponses,Options } from '../../Components/Global'
import gs from '../../Styles'



const Round = ({question, players, answerTimeout, voteTimeout, backgroundColor, config, sendAnswerInput, onRevealComplete}) => {
	

	function answerTimerComplete(){
		answerTimeout()
	}

	
	function voteTimerComplete(){
		voteTimeout()
	}


	return (
		<View style={[gs.centeredContainer, {flex:1}]}>
		<View style={[styles.topContainer, {height:20}]}>
		{question.responses.length < players.length &&
			<React.Fragment>
				<PlayerResponses responses={question.responses} inline />
				<Timer backgroundColor={backgroundColor} duration={60} onComplete={answerTimerComplete}/>
			</React.Fragment>

		}
		{question.responses.length >= players.length && question.votes.length < players.length &&
		 	<Timer backgroundColor={backgroundColor}  duration={60} onComplete={voteTimerComplete}/>
		}
		{question.votes.length >= 1 && question.votes.length < players.length &&
		 	<PlayerResponses responses={question.votes} />
		}

		</View>
		<Animated.View style={[gs.centeredContainer, {flex:1}]}>
		
			<View style={[styles.innerContainer]}>
				<Text style={[gs.subtitle, gs.bold, gs.shadowWhite, {textAlign:'center'}]}>{question.q}...</Text>
			 </View>
			 <View style={[gs.centeredContainer, {flex:1}]}>

			 	{question.votes.length < players.length &&
				 	<Options backgroundColor={backgroundColor} responses={question.responses.length >= players.length ? question.responses : []} />
				}
				{question.votes.length >= players.length &&
					<Reveal {...question} players={players} onComplete={onRevealComplete}/>
				}
			</View>
		</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	topContainer:{
		width:'100%',
		
	},
	innerContainer:{
		flex:0.45,
		alignItems:'center',
		justifyContent:'center'
	}
})

export default Round 