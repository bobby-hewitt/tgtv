import React, { useState, useRef, useEffect} from 'react'
import {
	Animated,
	Easing
} from 'react-native'

const Scale = ({scaleTo, center, scaleFrom, duration, absolute, relative, delay, transformOrigin, children, animationComplete, fillContainer}) => {
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
		<Animated.View style={[{transformOrigin: transformOrigin ? transformOrigin : 'center'}, absolute ? {position:'absolute', top:0,left:0} : {}, fillContainer ?  {flex:1, transform:[{scale}]} :  {transform:[{scale}]}, center ?{alignItems:'center', justifyContent:'center'} : {}, relative ? {position:'relative'} : {}]}>
			{children}
		</Animated.View>
	)
}


export default Scale