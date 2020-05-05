import React, { Component, useEffect,useState, useRef } from 'react'
import { 
	View,
	StyleSheet,
	Dimensions,
	Animated,
	Text
} from 'react-native'
import {Reveal} from '../../Components/Search'
import { Players, Timer, PlayerResponses,Options, Scale } from '../../Components/Global'
import gs from '../../Styles'



const Round = ({question, players, answerTimeout, timer, questions, round, voteTimeout, backgroundColor, config, sendAnswerInput, onRevealComplete, sendVote, gameState}) => {
	const [ roundIsVisible, setRoundIsVisible ] = useState(true)
	const questionTranslate = useRef(new Animated.Value(285)).current
	useEffect(() => {
		if (question.responses.length >= players.length){
			Animated.timing(questionTranslate, {
		        toValue: 0,
		        useNativeDriver:true,
		        duration: 300,    
		      }).start()
		}
	},[question.responses.length, round, players.length])


	function scaleBack(){
		setRoundIsVisible(false)
	}
	return (
		<Scale fillContainer scaleTo={roundIsVisible ? 1 : 0} animationComplete={() => {if (!roundIsVisible) {
			
			onRevealComplete()
		}}}>
			<View style={[gs.centeredContainer, styles.outerContainer,{flex:1}]}>
			
				
			
			<View style={[gs.centeredContainer, {flex:1}]}>
				<Animated.View style={[styles.innerContainer, {transform:[{translateY:questionTranslate}, {scale:1}]}]}>
					<Text style={[gs.subtitle, gs.bold,  {textAlign:'center'}]}>{question.q}</Text>
					<Text style={[gs.subtitle, gs.bold,  {textAlign:'center',padding:0,marginTop:-30}]}>...</Text>
				 </Animated.View>
				 <View style={[styles.answersContainer]}>
				 	{question.votes.length < players.length && gameState === 'votes' &&
					 	<Options backgroundColor={backgroundColor} sendVote={sendVote} responses={question.responses.length >= players.length ? question.responses : []} />
					}
					{question.votes.length >= players.length &&
						<Reveal {...question} players={players} onComplete={scaleBack}/>
					}
				</View>
			</View>
			</View>
		</Scale>
	)
}




const Rounds = ({question, players, answerTimeout, timer, questions, round, voteTimeout, backgroundColor, config, sendAnswerInput, onRevealComplete, sendVote, gameState}) => {
	function answerTimerComplete(){
		answerTimeout()
	}
	
	function voteTimerComplete(){
		voteTimeout()
	}
	return (
		<View style={gs.centeredContainer, {flex:1}}>
		{question.responses.length < players.length && gameState === 'answers' && timer === 'answers' &&
			<Timer backgroundColor={backgroundColor} duration={60} onComplete={answerTimerComplete}/>
		}
		{question.responses.length >= players.length && question.votes.length < players.length && gameState === 'votes' && timer === 'votes' &&
		 	<Timer backgroundColor={backgroundColor}  duration={20} onComplete={voteTimerComplete}/>
		} 
		{questions && questions.map((item, i) => {
			if ( i === round ){
				return(
					<Round  key={i} {...{question, players, answerTimeout, timer, questions, round, voteTimeout, backgroundColor, config, sendAnswerInput, onRevealComplete, sendVote, gameState}} />
				)
			} else return <View key={i} />
		})}
		</View>
	)
}

const styles = StyleSheet.create({
	topContainer:{
		width:'100%',
	},
	answersContainer:{
		flex:1,
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

export default Rounds 