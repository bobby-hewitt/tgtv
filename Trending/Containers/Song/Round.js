import React, { Component, useEffect, useRef, useState } from 'react'
import { 
	View,
	StyleSheet,
	Animated,
	Easing,
	Dimensions,
	Image,
	Text
} from 'react-native'
import {Reveal} from '../../Components/Search'
import {  Scale, Translate } from '../../Components/Global'
import gs from '../../Styles'

import { Track } from '../../Components/Song'
import {startSpeech} from '../../Helpers/TTS'


const Round = ({question, trackIndex, round, toRoom,players, setGameState, nextTrack,config, gameState, sendResponses}) => {
	const [recordIndex, setRecordIndex ] = useState(0)
	useEffect(() => {
		console.log('question', question)
		startSpeech('songs-playlist', {round: round + 1, player: question.player ? question.player.name : false, name: question.playlistName}, () => {
			nextTrack()
		})
	}, [])

	function updateRecordIndex(){
		
			setRecordIndex(recordIndex+1)
		
	}
	return(
		<View>
			{trackIndex === -1 && 
				<Scale duration={500} fillContainer scaleTo={1}>
					<View style={[styles.imageContainer ]}>
						<Image style={styles.image}source={{uri: question.image}} />
					</View>
				</Scale>
				
				
			}
			<View style={styles.recordsContainer}>
			<Translate fillContainer translateXY={'translateX'} easing={'easeIn'} duration={1000} toVal={recordIndex > question.tracks.length - 1 ?  -1080 : 0}> 
			<View>
			
			
				<View style={styles.selector} />
				
				
				<View style={{flexDirection:'row'}}>
				
				<Translate fillContainer translateXY={'translateX'} easing={'easeInOut'} duration={1000} toVal={recordIndex < question.tracks.length  ? recordIndex * - 110 : (recordIndex-1)* - 110}> 
				<View style={{flexDirection:'row'}}>
				{question.tracks && question.tracks.map((item, i )=> {
					return(
						<Image key={i} style={styles.record} source={require('../../assets/images/record.png')} />
					)
				})}

				</View>
				</Translate>	
				
				
				</View>

				
				
			
			
			</View>
			</Translate>
			</View>
			{question.tracks && question.tracks.map((item, i )=> {
				
				if(i === trackIndex && trackIndex >= 0 && trackIndex < config.maxTracks){
					return(
						
						<Track tracksLength={question.tracks.length}recordIndex={recordIndex} updateRecordIndex={updateRecordIndex}key={i}toRoom={toRoom} {...item} setGameState={setGameState } gameState={gameState} sendResponses={sendResponses} nextTrack={nextTrack} votes={question.tracks[trackIndex].votes} votesLength={question.tracks[trackIndex].votes.length} playersLength={players.length}/>
						
					)
				}
				else return <View key={i}/>
			})}

			
			
			
		</View>
	)
}

const styles = StyleSheet.create({
	topContainer:{
		width:'100%',
	},
	recordsContainer:{
		
		
		
		flexDirection:'row',
		position:'absolute',
		left:Dimensions.get('window').width/2 - Dimensions.get('window').width/20 -55 ,
		bottom:0,
	},
	selector:{
		position:'absolute',
		left:-5,
		bottom:-10,
		
		backgroundColor:'#fff',
		width:120,
		height:120,
		borderRadius:60,
	},
	record:{
		height:100,
		width:100,
		marginHorizontal:5,
	},
	imageContainer:{
		alignItems:'center',
		justifyContent:'center',
		
		width: Dimensions.get('window').width - (Dimensions.get('window').width/10),
		height: Dimensions.get('window').height - (Dimensions.get('window').height/10),
	},
	image:{
		alignItems:'center',
		justifyContent:'center',
		width:600,
		height:600,
		borderRadius:20,
		shadowColor: '#000',
	    shadowOffset: { width: 0, height: 0 },
	    shadowOpacity: 1,
	    shadowRadius: 20,
	},
	innerContainer:{
		flex:0.45,
		alignItems:'center',
		justifyContent:'center'
	}
})

export default Round 