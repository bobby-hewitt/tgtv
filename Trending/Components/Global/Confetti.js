import React, { useRef, useEffect, useState } from 'react'
import {
	View,
	StyleSheet,
	Animated,
	Easing
} from 'react-native'
const n = 45
const Confetti = ({colors}) => {
	const [pieces, setPieces] = useState(false)
	const yVal = useRef(new Animated.Value(0)).current
	const rotate = useRef(new Animated.Value(0)).current

	useEffect(() => {
		createPieces()
			Animated.timing(yVal, {
				toValue: 1,
				duration: 15000,
				useNativeDriver:true,
			}).start()
		
		return() => {
			setPieces(false)
		}
	},[])
	function createPieces(){
		let p = []
		for (var i = 0; i < n; i++){
			p.push({
				start: -((Math.floor(Math.random() * 1920))),
				end: (Math.floor(Math.random() * 1920)) + 1920,
				skew: (Math.floor(Math.random() * 36)) -16
			})
		}
		setPieces(p)
	}

	
	return(
		<View style={styles.container}>
			{pieces && pieces.map((piece, i) => {
				const rotateVal = rotate.interpolate({
				    inputRange: [0, 1],
				    outputRange: [`${0 + piece.skew}deg`, `${1080 - piece.skew}deg`]
				  })
				return (
					<View key={i} style={[styles.piece, {transform: [{skewX: piece.skew}]}]}>
					<Animated.View style={[
						styles.piece,
						
						{
							backgroundColor: colors? colors[i% colors.length] : '#fff',
							transform: [
								{translateX: (1920 / pieces.length) * i},
								{translateY: yVal.interpolate({
								    inputRange: [0, 1],
								    outputRange: [piece.start, piece.end]
								  })},

								{rotateX: rotateVal},
								{rotateY: rotateVal},
								{rotateZ: rotateVal}
								
							]
						}

					]} />
					</View>
				)
			})}
		</View>
	)
}


const styles = StyleSheet.create({
	container:{
		width:1920,
		height:1080,
		// backgroundColor:'red',
		position:'absolute',
		top:-50,
		left:0,
	},
	piece:{
		zIndex:1,
		position:'absolute',
		top:0,
		left:0,
		width:20,
		height:20,
		backgroundColor:'white'
	}
})

export default Confetti