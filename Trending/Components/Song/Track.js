import React, {useEffect, useState, useContext,  useRef} from 'react'
import {
	View, Text, Image, StyleSheet, Dimensions, Animated, Easing
} from 'react-native'
import gs from '../../Styles'
import { playRemoteSound, stopRemoteSound } from '../../Helpers/Sound'
import { Scale, Timer, Translate } from '../Global'
import globalContext from '../../Context/global'
const Track = ({updateRecordIndex, image_url, preview_url, toRoom, setGameState, sendResponses, tracksLength, recordIndex, gameState, artist, nextTrack, votesLength, playersLength, votes, name, responses, artistResponses, nameResponses}) => {
	const globalState = useContext(globalContext)
	const [ showVotes, setShowVotes ] = useState(false)
	const [ showAnswer, setShowAnswer ] = useState(false)
	const [ fadeOut, setFadeout ] = useState(false)
	const translateX = useRef(new Animated.Value(0)).current
	const voteMargin = useRef(new Animated.Value(5)).current
	const votesMargin = useRef(new Animated.Value(-300)).current
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
			votesOver()
		}
	}, [
		votes,
		votesLength
	])

	function getPosVal(){
		const trueIndex = responses.findIndex(r => r.isTrue)
		let to = 
			trueIndex=== 0 ? {x: 435, y:270} : 
			trueIndex=== 1 ? {x: -435, y:270} : 
			trueIndex=== 2 ? {x: 435, y:-120} : 
			{x: -435, y:-120} 

		return to
	}

	function translate(){
		const to = getPosVal()
		Animated.parallel([
			Animated.timing(translateX, {
		        toValue: to.x,
		        useNativeDriver: true,easing:Easing.easeInOut,
		        duration: 500,    
		      }),
			Animated.timing(translateY, {
		        toValue: to.y -100,
		        useNativeDriver: true,easing:Easing.easeInOut,
		        duration: 500,    
		      }),
			Animated.timing(voteMargin, {
		        toValue: 60,
		        easing:Easing.easeInOut,
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
			
				globalState.setBackgroundSpin(globalState.backgroundSpin - 1)
				updateRecordIndex()
			
			setTimeout(() =>{
			
				nextTrack()
			},1000)
		} else if (showAnswer){
			console.log('setting fadeout')
			setTimeout(() =>{
					const to = getPosVal()
				Animated.timing(translateY, {
			        toValue: to.y,
			        useNativeDriver: true,
			        easing:Easing.easeInOut,
			        duration: 500,    
			      }).start()
				setFadeout(true)
			
			},2000)
		}
	}

	function votesOver(){
		setGameState('reveal')
		toRoom({action:'set-waiting'})
		stopRemoteSound()
		setShowVotes(true)
	}




	

	return(
		<View style={gs.centeredContainer} >	
			<Scale duration={500} fillContainer scaleTo={1}>
			<View style={styles.outerContainer} >
			{responses.map((item, i) => {
				return(
					
					<Animated.View  key={i} style={[{zIndex: item.isTrue ? 100: 0, transform: [{translateX:item.isTrue ? translateX : 0}, {translateY:item.isTrue ? translateY : 0}]},styles.responseContainer]}>
					
					<Scale  scaleFrom={1} fillContainer scaleTo={showAnswer ? fadeOut ? 0 : item.isTrue ? 1 : 0 : 1} duration={500} animationComplete={() => correctAnimationComplete(item)}>
					<View style={[styles.responseInnerContainer, {zIndex: item.isTrue ? 100: 0, transform: [{rotate: i % 2 === 0 ? -0.05 : 0.05}]}]}>
					
						<Text  style={[gs.bodycopy, gs.bold, {fontSize:36, fontWeight:'900', textAlign:'center', color:'#101010'}]}>{item.name}</Text>
						<Text  style={[gs.bodycopy, gs.bold, {fontSize:36, textAlign:'center', color:'#101010', marginTop:12}]}>{item.artist}</Text>
					</View>
					{showVotes &&
							<Scale duration={500} scaleTo={1} animationComplete={votesAnimationComplete}>
								<Animated.View style={{transform:[{translateY: votesMargin}]}, styles.votesContainer}>
								{votes &&votes.map((vote, j) => {
									if (vote.index === i){
										
										return(
											<View key={`${i}${j}`} style={[styles.voteOuterContainer]}>
											<Animated.View style={[item.isTrue ? {marginTop:voteMargin} : {marginTop:5}, styles.voteContainer]}>
												<Text style={[gs.bodycopy, gs.bold, {fontSize:32, fontWeight:'bold', color:'#101010'}]}>{vote.player.name} </Text>
											</Animated.View>
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
								</Animated.View>
							</Scale>
						}

					</Scale>	
					</Animated.View>
					
				)
			})
			
			}
			</View>
			</Scale>
			{!showVotes && 
				<Timer backgroundColor={'#1DB954'}  inverse duration={10} onComplete={votesOver}/>
			}

		</View>
	)
}

const styles= StyleSheet.create({
	outerContainer:{
		paddingTop:50,
		paddingBottom:250,
		flex:1,
		width: Dimensions.get('window').width - (Dimensions.get('window').width/10),
		flexDirection:'row',
		flexWrap:'wrap'
	},
	scoreContainer:{
		width:80,
		borderRadius:50,
		height:80,
		alignItems:"center",
		justifyContent:'center',
		
	},
	scoreContainerPosition:{
		position:'absolute',
		top:-5,
		left:'50%',
		transform:[

			
			{translateX:'-50%'}
			
		]
		
	},
	scoreText:{
		fontWeight:'bold',
		fontSize:40,
		color:'#fff',
	},
	responseContainer:{
		position:'relative',
		width:'50%',
		padding:50,
		height:'50%',
		marginBottom:60,
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
		width:'120%',
		marginLeft:'-10%',
		
		// backgroundColor:'#ff000077',

		zIndex:110,
		
		flexDirection:'row',
		flexWrap:'wrap',
		alignItems:'center',
		justifyContent:'center'
	},
	voteOuterContainer:{

	},
	voteContainer:{
		
		
		height:68,
		marginRight:24,
		backgroundColor:'#fff',
		borderRadius:50,
		shadowColor: '#000',
	    shadowOffset: { width: 0, height: 0 },
	    shadowOpacity: 0.4,
	    shadowRadius: 20,
	    paddingVertical:4,
	    borderWidth:10,
		borderColor:'#000',
		paddingLeft:32,
		paddingRight:20,
		alignItems:'center',
		// justifyContent:'center',
	}
})

export default Track