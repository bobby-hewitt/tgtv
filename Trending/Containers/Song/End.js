import React, { useRef, useEffect, useState } from 'react'
import {
	View,
	Image,
	StyleSheet,
	Animated,
	Easing,
} from 'react-native'
const End = ({questions}) => {
	const translate = useRef(new Animated.Value(1920)).current
	const rotate = useRef(new Animated.Value(0)).current
	useEffect(() => {
		Animated.parallel([
			Animated.timing(translate, {
				toValue: -10980,
				duration:30000,
				useNativeDriver:true,
				easing: Easing.linear
			}),
			Animated.timing(rotate, {
				toValue: 1,
				duration:30000,
				useNativeDriver:true,
				
			})
		]).start()
		
		return() => {
			// translate.stopAnimation()
		}
	},[])

	const rotatePos = rotate.interpolate({
	    inputRange: [0, 1],
	    outputRange: [`0deg`, `1080deg`]
	  })
	console.log(rotatePos)
	return(
		<View style={[styles.container]}>
			{questions && questions.map((question, i) => {
				return(
					<Animated.View key={`${i}`}style={[styles.questionContainer, {transform: [{translateX: translate}]}]}>
						{question.tracks.map((track, j) => {
							return(
								
								<Animated.Image key={`${i}${j}`} source={{uri: track.image_url}} style={[styles.image, {transform: [{rotate: rotatePos}]}]}/>
								
							)
						})}
					</Animated.View>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		// paddingHorizontal:1920,
		width:1920,
		height:540,
		position:'absolute',
		bottom:100,
		alignItems:'center',
		left:0,
		zIndex:1000,
		right:0,
		// backgroundColor:'red',
		flexDirection:'row',
	},
	
	questionContainer:{
		flexDirection:'row',
	},
	image:{
		borderWidth:5,
		borderColor:'#000',

		borderRadius:150,
		margin:20,
		width:300,
		height:300,
	}
})

export default End