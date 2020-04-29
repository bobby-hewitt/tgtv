import React, { useState, useRef, useEffect} from 'react'
import {
	Animated,
} from 'react-native'

const Scale = ({toVal, center, fromVal, duration, delay, children, animationComplete, fillContainer}) => {
	const transform = useRef(new Animated.Value(fromVal || 0)).current
	useEffect(() => {
		Animated.timing(transform).stop()
		Animated.timing(transform, {
	        toValue: toVal,
	        useNativeDriver: true,
	        duration: duration, 
	        delay: delay || 0   
	      }).start( () => {
	      	if (animationComplete) {
	      		animationComplete(toVal)
	      	}
	      })

	}, [toVal])	

	return (
		<Animated.View style={[fillContainer ?  {flex:1, transform:[{translateY:transform}]} :  {transform:[{translateY:transform}]}, center ?{alignItems:'center', justifyContent:'center'} : {}]}>
			{children}
		</Animated.View>
	)
}


export default Scale