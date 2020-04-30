import React, { useState, useRef, useEffect} from 'react'
import {
	Animated,
	Easing
} from 'react-native'

const Translate = ({toVal,easing, center, fromVal, duration, delay, children, animationComplete, translateXY,fillContainer}) => {
	const transform = useRef(new Animated.Value(fromVal || 0)).current
	useEffect(() => {

		Animated.timing(transform).stop()
		Animated.timing(transform, {
	        toValue: toVal,
	        useNativeDriver: true,
	        duration: duration,
	        easing: Easing[easing] ,
	        delay: delay || 0   
	      }).start( () => {
	      	if (animationComplete) {
	      		animationComplete(toVal)
	      	}
	      })

	}, [toVal])	

	return (
		<Animated.View style={[fillContainer ?  {flex:1, transform:[{[translateXY]:transform}]} :  {transform:[{translateY:transform}]}, center ?{alignItems:'center', justifyContent:'center'} : {}]}>
			{children}
		</Animated.View>
	)
}


export default Translate