import React, { useState, useEffect} from 'react'
import {
	View,
	Animated,
	Dimensions,
	StyleSheet,
	Text
} from 'react-native'
import gs from '../../Styles'
import {playSound } from '../../Helpers/Sound'


const PlayerResponses = ({responses, animateVisibleComplete, inline}) => {
	const [visibleIndex, setVisibleIndex] = useState(animateVisibleComplete ? 0 : 8)
	useEffect(() => {
		let timeout
		if (animateVisibleComplete && visibleIndex < responses.length)	{
			 timeout = setTimeout(() => {
			 	playSound('thud')
				setVisibleIndex(visibleIndex + 1)
			},150)
		} else if (animateVisibleComplete){
			 timeout = setTimeout(() => {
			animateVisibleComplete()
		},1200)
		}
		return () => {
			clearTimeout(timeout)
		}
	}, [visibleIndex])	

	return(
		<Animated.View style={[inline ? styles.playersContainerInline : styles.playersContainer]}>
			{responses && responses.map((item, i) => {
				
				return(
					<View key={i} style={[styles.playerContainer, animateVisibleComplete &&i >= visibleIndex ? {opacity: 0 } : {opacity:1} ]}>
						<Text style={[gs.bodycopy, gs.bold, {fontSize:40, fontWeight:'bold', color:'#101010'}]}>{item.player ? item.player.name : item.falseName}</Text>
					</View>
				)
			})}
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	playerContainer:{
		padding:12,
		marginRight:24,
		backgroundColor:'#fff',
		borderRadius:50,
		// borderWidth:10,
		// borderColor:'#000',
		shadowColor: '#000',
	    shadowOffset: { width: 0, height: 0 },
	    shadowOpacity: 0.4,
	    shadowRadius: 20,
		paddingHorizontal:32,
		alignItems:'center',
		justifyContent:'center',
	},
	playersContainerInline: {	
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',

		height:100,
	},
	playersContainer:{	
		position:'absolute',
		top:0,
		left:0,	
		right:0,
		height:100,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	}

})

export default PlayerResponses