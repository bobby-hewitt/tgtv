import React, { Component, useEffect, useRef } from 'react'
import { 
	View,
	StyleSheet,
	Animated,
	Dimensions,
	Image,
	Text
} from 'react-native'
import {Reveal} from '../../Components/Search'
import {  Scale } from '../../Components/Global'
import gs from '../../Styles'

import { Track } from '../../Components/Song'
import {startSpeech} from '../../Helpers/TTS'


const Round = ({question, trackIndex, round, toRoom,players, nextTrack,config, gameState, sendResponses}) => {
	
	useEffect(() => {
		startSpeech('songs-playlist', {round: round + 1, name: question.playlistName}, () => {
			nextTrack()
		})
	}, [])
	return(
		<View>
			{trackIndex === -1 && 
				<Scale duration={500} fillContainer scaleTo={1}>
				<View style={[styles.imageContainer ]}>
				
					<Image style={styles.image}source={{uri: question.image}} />
				
				</View>
				</Scale>
				
				
			}
			{question.tracks && question.tracks.map((item, i )=> {
				
				if(i === trackIndex && trackIndex >= 0 && trackIndex < config.maxTracks){
					return(
						<Scale key={i} duration={500} fillContainer scaleTo={1}>
						<Track  toRoom={toRoom} {...item} gameState={gameState} sendResponses={sendResponses} nextTrack={nextTrack} votes={question.tracks[trackIndex].votes} votesLength={question.tracks[trackIndex].votes.length} playersLength={players.length}/>
						</Scale>
					)
				}
				else return <View key={i}/>
			})
			
			}
		</View>
	)
}

const styles = StyleSheet.create({
	topContainer:{
		width:'100%',
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
		width:800,
		height:800,
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