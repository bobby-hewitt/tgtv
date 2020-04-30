import React, { useState, useRef, useEffect} from 'react'
import {
	Animated,
	Easing
} from 'react-native'

const Scale = ({scaleTo, center, scaleFrom, duration, delay, children, animationComplete, fillContainer}) => {
	const scale = useRef(new Animated.Value(scaleFrom || 0)).current
	useEffect(() => {
		function getOptions(){
			return {
	        toValue: scaleTo,
	        useNativeDriver: true,
	        duration: duration, 
	        
	        delay: delay || 0   
	      }

			
		}
		
		Animated.timing(scale).stop()
		Animated.timing(scale, 
			scaleTo > 0 ? 
				{
					toValue: scaleTo,
					useNativeDriver: true,
					duration: duration, 
					easing:Easing.elastic(-1),
					delay: delay || 0   
				} : 
				{
					toValue: scaleTo,
					useNativeDriver: true,
					duration: duration, 
					easing:Easing.easeOut,
					delay: delay || 0   
				},
			).start( () => {
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