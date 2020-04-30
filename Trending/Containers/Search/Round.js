import React, { Component, useEffect, useRef } from 'react'
import { 
	View,
	StyleSheet,
	Dimensions,
	Animated,
	Text
} from 'react-native'
import {Reveal} from '../../Components/Search'
import { Players, Timer, PlayerResponses,Options } from '../../Components/Global'
import gs from '../../Styles'



const Round = ({question, players, answerTimeout, voteTimeout, backgroundColor, config, sendAnswerInput, onRevealComplete}) => {
	const answersHeightValue = useRef(new Animated.Value(0)).current
	useEffect(() => {
		if (question.responses.length < players.length ){
			Animated.timing(answersHeightValue, {
		        toValue: 0,
		        
		        duration: 500,    
		      }).start()
		} else if (question.responses.length >= players.length){
			Animated.timing(answersHeightValue, {
		        toValue: 540,
		        
		        duration: 500,    
		      }).start()
		}
	},[question.responses.length, players.length])

	function answerTimerComplete(){
		answerTimeout()
	}

	
	function voteTimerComplete(){
		voteTimeout()
	}

	const answersHeight = answersHeightValue.interpolate({
	    inputRange: [0, 1],
	    outputRange: ['0%', '180%']
  	})


	return (
		<View style={[gs.centeredContainer, styles.outerContainer,{flex:1}]}>
		
			{question.responses.length < players.length &&
				<Timer backgroundColor={backgroundColor} duration={60} onComplete={answerTimerComplete}/>
			}
			{/*question.responses.length >= players.length && question.votes.length < players.length &&
			 	<Timer backgroundColor={backgroundColor}  duration={30} onComplete={voteTimerComplete}/>
			*/}
		
		<View style={[gs.centeredContainer, {flex:1}]}>
			<View style={[styles.innerContainer]}>
				<Text style={[gs.subtitle, gs.bold,  {textAlign:'center'}]}>{question.q}...</Text>
			 </View>
			 <Animated.View style={[styles.answersContainer,{height:answersHeightValue}]}>
			 	{question.votes.length < players.length &&
				 	<Options backgroundColor={backgroundColor} responses={question.responses.length >= players.length ? question.responses : []} />
				}
				{question.votes.length >= players.length &&
					<Reveal {...question} players={players} onComplete={onRevealComplete}/>
				}
			</Animated.View>
		</View>
		</View>
	)
}

const styles = StyleSheet.create({
	topContainer:{
		width:'100%',

		
	},
	answersContainer:{
		
		width:Dimensions.get('window').width - Dimensions.get('window').width / 20, 
		
	},
	outerContainer:{
		width:'100%',
		height:'100%',
		
	},

	innerContainer:{
		// backgroundColor:'blue',
		flex:0.66,
		alignItems:'center',
		justifyContent:'center'
	}
})

export default Round 