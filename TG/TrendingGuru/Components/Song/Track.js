import React, {useEffect, useState} from 'react'
import {
	View, Text, Image, StyleSheet, Dimensions
} from 'react-native'
import gs from '../../Styles'
import { playRemoteSound, stopRemoteSound } from '../../Helpers/Sound'
import { Scale, Timer } from '../Global'
const Track = ({image_url, preview_url, sendResponses, artist, nextTrack, votesLength, playersLength, votes, name, responses, artistResponses, nameResponses}) => {
	const [ showVotes, setShowVotes ] = useState(false)
	const [ showAnswer, setShowAnswer ] = useState(false)
	const [ fadeOut, setFadeout ] = useState(false)

	useEffect(() => {
		playRemoteSound(preview_url)
		sendResponses(responses)
		return () => {
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

	function votesAnimationComplete(){
		setTimeout(() =>{
			setShowAnswer(true)
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
			},1500)
		}
	}

	function timeUp(){
		stopRemoteSound()
			setShowVotes(true)
	}

	

	return(
		<View style={styles.outerContainer}>	

			{responses.map((item, i) => {
				return(
					
					<View  key={i} style={styles.responseContainer}>
					
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
											<View key={`${i}${j}`} style={styles.voteContainer}>
												<Text style={[gs.bodycopy, gs.bold, {fontSize:24, fontWeight:'bold', color:'#101010'}]}>{vote.player.name} {item.isTrue && showAnswer ? '+' + (100 - Math.floor(vote.time / 100)) : ''}</Text>
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
					</View>
					
				)
			})
			
			}
			{!showVotes &&
				<Timer backgroundColor={'#1DB954'}  inverse duration={20} onComplete={timeUp}/>
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
	responseContainer:{
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
	voteContainer:{
		padding:12,
		marginBottom:24,
		height:60,
		marginRight:24,
		backgroundColor:'#fff',
		borderRadius:50,
		shadowColor: '#000',
	    shadowOffset: { width: 0, height: 0 },
	    shadowOpacity: 0.4,
	    shadowRadius: 20,
		paddingHorizontal:32,
		alignItems:'center',
		justifyContent:'center',
	}
})

export default Track