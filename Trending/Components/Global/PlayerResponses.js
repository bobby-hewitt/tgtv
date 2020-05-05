import React, { useState, useEffect} from 'react'
import {
	View,
	Animated,
	Dimensions,
	StyleSheet,
	Text
} from 'react-native'
import gs from '../../Styles'
import Scale from './Scale'
import {playSound } from '../../Helpers/Sound'


const PlayerResponses = ({responses, animateVisibleComplete, inline}) => {
	const [visibleIndex, setVisibleIndex] = useState(animateVisibleComplete ? 0 : 8)
	useEffect(() => {
		let timeout
		if (animateVisibleComplete && visibleIndex < responses.length)	{
			 timeout = setTimeout(() => {
			 	
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
					<Scale key={i} scaleTo={i < visibleIndex ? 1 : 0} animationComplete={() => { if (i < visibleIndex) playSound('thud')}}>
						<View  style={[styles.playerContainer]}>
							<Text style={[gs.bodycopy, gs.bold, {fontSize:40, fontWeight:'bold', color:'#101010'}]}>{item.player ? item.player.name : item.falseName}</Text>
						</View>
					</Scale>
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
		borderWidth:10,
		borderColor:'#333',
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
		

		height:100,
	},
	playersContainer:{	
		width:'100%',

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