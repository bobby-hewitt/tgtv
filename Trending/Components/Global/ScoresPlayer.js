import React, { useState, useRef, useEffect} from 'react'
import {
	Animated,
	View,
	Text,
	StyleSheet
} from 'react-native'
import gs from '../../Styles'

const SocresPlayer = ({scaleTo, xTo, yTo, player, position, game, backgroundColor, gameState}) => {
	
	const scale = useRef(new Animated.Value(scaleTo)).current
	const x = useRef(new Animated.Value(xTo-250)).current
	const y = useRef(new Animated.Value(yTo-250)).current

	useEffect(() => {
		
		Animated.parallel([
			Animated.timing(scale, {
				toValue: scaleTo,
				useNativeDriver:true,
				duration: 500,    
			}),
			Animated.timing(x, {
				toValue: xTo-250,
				useNativeDriver:true,
				duration: 500,    
			}),
			Animated.timing(y, {
				toValue: yTo-250,
				useNativeDriver:true,
				duration: 500,    
			})
		]).start()

		
	}, [scaleTo])	

	return (
		<Animated.View style={[ styles.outerContainer, {transform:[{translateX:x}, {translateY: y}]}]}>
		<Animated.View style={[styles.container,{ borderColor:'#000'}, {transform:[{scale}]}]}>
			<View style={[styles.position, {backgroundColor:"#fff", borderColor:'#000'}]}>
				<Text style={{color:'#000', fontSize:50, fontWeight:'bold'}}>{position}</Text>
			</View>
			<Text style={[gs.bold, gs.bodycopy, {color:'#000'}]}>{player.name}</Text>
			<View style={[ {flexDirection:'column', alignItems:'center', justifyContent:'center',height:100}]}>
			{(gameState !== 'scores' || (player.goodLieScore === 0 && player.goodGuessScore === 0 &&player.rightAnswerScore === 0 ))&&
			<Text style={[gs.bold, gs.bodycopy, {color:'#000'}]}>{player.score}</Text>
			}
			{gameState === 'scores'  && game === 'search'&&  player.goodLieScore !== 0 && 
				<Text style={[gs.bold, gs.bodycopy, {color:'#000', fontSize:24}]}>Good lie +{player.goodLieScore}</Text>
			}	
			{gameState === 'scores'  && game === 'search'&&  player.goodGuessScore !== 0 && 
				<Text style={[gs.bold, gs.bodycopy, {color:'#000', fontSize:24}]}>Good guess +{player.goodGuessScore}</Text>
			}
			{gameState === 'scores'  && game === 'search'&&  player.rightAnswerScore !== 0 && 
				<Text style={[gs.bold, gs.bodycopy, {color:'#000', fontSize:24}]}>Bullseye +{player.rightAnswerScore}</Text>
			}
			{gameState === 'scores'  && game === 'song'&&
				<Text style={[gs.bold, gs.bodycopy, {color:'#000', fontSize:24}]}>+{player.roundScore}</Text>
			}
			</View>
		</Animated.View>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	outerContainer:{

		
		alignItems:'center',
		justifyContent:'center',
		position:'absolute',
		top:'50%',
		left:'50%',
		height:500,
		width:500,
	},
	position:{
		position:'absolute',
		top:0,
		left:0,
		height:100,
		borderWidth:10,
		width:100,
		borderRadius:50,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'#000',	
		transform:[
			{
				translateY:-50,
			},
			{
				translateX:-50,
			}
		]
	},
	container:{

		borderWidth:10,
		width:450,
		shadowColor: '#000',
	    shadowOffset: { width: 0, height: 0 },
	    shadowOpacity: 0.4,
	    shadowRadius: 20,
		paddingVertical:20,
		paddingBottom:0,
		paddingHorizontal:60,
		backgroundColor:'#fff', 
		borderRadius:20, 

		alignItems:'center',
		justifyContent:'center'
	}
})




export default SocresPlayer