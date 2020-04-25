import React, {useEffect, useState, useRef} from 'react'
import {
	View, Text, Image, StyleSheet, Dimensions, Animated
} from 'react-native'
import gs from '../../Styles'
import { playRemoteSound, stopRemoteSound } from '../../Helpers/Sound'
import { Scale, Timer } from '../Global'
import globalContext from '../../Context/global'
const Track = ({image_url, preview_url, toRoom, sendResponses, gameState, artist, nextTrack, votesLength, playersLength, votes, name, responses, artistResponses, nameResponses}) => {
	const [ showVotes, setShowVotes ] = useState(false)
	const [ showAnswer, setShowAnswer ] = useState(false)
	const [ fadeOut, setFadeout ] = useState(false)
	const translateX = useRef(new Animated.Value(0)).current
	const translateY = useRef(new Animated.Value(0)).current


	useEffect(() => {
		console.log('TRACKMOUNTING')
		if (gameState === 'round'){
			console.log("PLATYING SOUND HERE")
			playRemoteSound(preview_url)
			sendResponses(responses)
		}
		return () => {
			console.log('STOPPING SOND IN TRACK')
			stopRemoteSound()
		}
	}, [])


	
	useEffect(() => {
		
		if (votes.length >=  playersLength){
			
			stopRemoteSound()
			setShowVotes(true)
		}
	}, [
		votes,
		votesLength
	])

	function translate(){
		const trueIndex = responses.findIndex(r => r.isTrue)
		let to = 
			trueIndex=== 0 ? {x: 415, y:250} : 
			trueIndex=== 1 ? {x: -450, y:250} : 
			trueIndex=== 2 ? {x: 415, y:-240} : 
			{x: -450, y:-240} 
		Animated.parallel([
			Animated.timing(translateX, {
		        toValue: to.x,
		        useNativeDriver: true,
		        duration: 500,    
		      }),
			Animated.timing(translateY, {
		        toValue: to.y,
		        useNativeDriver: true,
		        duration: 500,    
		      })
		]).start()
	}

	function votesAnimationComplete(){
		setTimeout(() =>{
			setShowAnswer(true)
			translate()
		},1500)
	}

	function correctAnimationComplete(item){
		if(item.isTrue && fadeOut){
			setTimeout(() =>{
				nextTrack()
			},1000)
		} else if (showAnswer){
			console.log('setting fadeout')
			setTimeout(() =>{
				setFadeout(true)
			},2000)
		}
	}

	function timeUp(){
		toRoom({action:'set-waiting'})
		stopRemoteSound()
			setShowVotes(true)
	}

	

	return(
		<View style={styles.outerContainer} >	

			{responses.map((item, i) => {
				return(
					
					<Animated.View  key={i} style={[{transform: [{translateX:item.isTrue ? translateX : 0}, {translateY:item.isTrue ? translateY : 0}]},styles.responseContainer]}>
					
					<Scale  scaleFrom={1} fillContainer scaleTo={showAnswer ? fadeOut ? 0 : item.isTrue ? 1 : 0 : 1} duration={500} animationComplete={() => correctAnimationComplete(item)}>
					<View style={[styles.responseInnerContainer, {transform: [{rotate: i % 2 === 0 ? -0.05 : 0.05}]}]}>
					
						<Text  style={[gs.bodycopy, gs.bold, {textAlign:'center', color:'#101010'}]}>{item.name}</Text>
						<Text  style={[gs.bodycopy, gs.bold, {textAlign:'center', color:'#101010', marginTop:24}]}>{item.artist}</Text>
					</View>
					{showVotes &&
							<Scale duration={500} scaleTo={1} animationComplete={votesAnimationComplete}>
								<View style={styles.votesContainer}>
								{votes &&votes.map((vote, j) => {
									if (vote.index === i){
										
										return(
											<View key={`${i}${j}`} style={styles.voteOuterContainer}>
											<View style={styles.voteContainer}>
												<Text style={[gs.bodycopy, gs.bold, {fontSize:32, fontWeight:'bold', color:'#101010'}]}>{vote.player.name} </Text>
												
											</View>
												{item.isTrue && showAnswer &&
												<View style={styles.scoreContainerPosition}>
												<Scale scaleTo={1} delay={500}fillContainer>
													<View style={styles.scoreContainer}>
														<Text style={styles.scoreText}>{'+' +(100 - Math.floor(vote.time / 100))}</Text>
													</View>
												</Scale>
												</View>
												
												}
											</View>
										)
									} else {
										return(
											<View key={`${i}${j}`} />
										)
									}
								})}
								</View>
							</Scale>
						}
					</Scale>	
					</Animated.View>
					
				)
			})
			
			}
			{!showVotes &&
				<Timer backgroundColor={'#1DB954'}  inverse duration={10} onComplete={timeUp}/>
			}
		</View>
	)
}

const styles= StyleSheet.create({
	outerContainer:{
		flex:1,
		width: Dimensions.get('window').width - (Dimensions.get('window').width/10),
		flexDirection:'row',
		flexWrap:'wrap'
	},
	scoreContainer:{
		width:60,
		borderRadius:30,
		height:60,
		alignItems:"center",
		justifyContent:'center',
		backgroundColor:'#000'
	},
	scoreContainerPosition:{
		position:'absolute',
		top:-30,
		right:0,
	},
	scoreText:{
		fontWeight:'bold',
		fontSize:24,
		color:'#fff',
	},
	responseContainer:{
		position:'relative',
		width:'50%',
		padding:50,
		height:'50%',
	},
	responseInnerContainer:{
		position:'relative',
		alignItems:'center',
		justifyContent:'center',
		borderRadius:20,
		borderWidth:10,
		borderColor:'#000',
		width:'100%',
		height:'100%',
		padding:50,
		borderRadius:20,
		backgroundColor:'#fff',
	},
	votesContainer:{
		width:'100%',
		// backgroundColor:'#ff000077',

		position:'absolute',
		bottom:-84,
		left:0,
		zIndex:100,
		
		flexDirection:'row',
		flexWrap:'wrap',
		alignItems:'center',
		justifyContent:'center'
	},
	voteOuterContainer:{

	},
	voteContainer:{
		
		marginBottom:24,
		height:60,
		marginRight:24,
		backgroundColor:'#fff',
		borderRadius:50,
		shadowColor: '#000',
	    shadowOffset: { width: 0, height: 0 },
	    shadowOpacity: 0.4,
	    shadowRadius: 20,
	    paddingVertical:9,
		paddingLeft:32,
		paddingRight:20,
		alignItems:'center',
		// justifyContent:'center',
	}
})

export default Track