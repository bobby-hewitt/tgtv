import React, { useState, useRef, useEffect} from 'react'
import {
	Animated,
} from 'react-native'

const Scale = ({scaleTo, center, scaleFrom, duration, children, animationComplete, fillContainer}) => {
	const scale = useRef(new Animated.Value(scaleFrom || 0)).current
	useEffect(() => {
		Animated.timing(scale).stop()
		Animated.timing(scale, {
	        toValue: scaleTo,
	        useNativeDriver: true,
	        duration: duration,    
	      }).start( () => {
	      	if (animationComplete) {
	      		animationComplete(scaleTo)
	      	}
	      })

	}, [scaleTo])	

	return (
		<Animated.View style={[fillContainer ?  {flex:1, transform:[{scale}]} :  {transform:[{scale}]}, center ?{alignItems:'center', justifyContent:'center'} : {}]}>
			{children}
		</Animated.View>
	)
}


export default Scale