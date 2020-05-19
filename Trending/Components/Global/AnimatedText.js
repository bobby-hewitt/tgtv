import React, {useEffect, useState, useRef}from 'react'
import {
	Text, Animated, Easing , View, StyleSheet
} from 'react-native'

const types = ['scale','shrink','rotate', 'rotate']

const AnimatedText = ({text, colors, isAnimated, delay, style}) => {
	const map = Array.prototype.map
	const animation = useRef(new Animated.Value(1)).current
    const [ animatedIndex, setAnimatedIndex ] = useState(0)
    const [ animatedType, setAnimatedType ] = useState(0)
    const [ isAnimating , setIsAnimating] = useState(false) 
    useEffect(() => {
    	if (!isAnimating && isAnimated){
    		animate(0)
    		setIsAnimating(true)
    	}
    	return () => {
    		// setIsAnimating(false)
    		animation.stopAnimation()
    	}
    	
    	// let timeout = setTimeout(() => {
    	// 	setAnimatedIndex( animatedIndex < text.length ? animatedIndex + 1 : 0)
    	// 	setAnimatedType( getRandom(types.length))
    	// 	animate()
    	// }, 300)
    	// // return () => {
    	// 	clearTimeout(timeout)
    	// }
    },[ animatedIndex, animatedType])

    function getRandom(max){
    	return Math.floor(Math.random() * max)
    }

    function animate(index){
    	// animation.stopAnimation()
    	// console.log('ANIMATIONG')
    	// Animated.sequence([
    	// 	Animated.timing(animation, {
    	// 	toValue: 0,
     //    	duration: 200, 
     //    	delay:delay || 1000,  
    	// 	}),
    	// 	Animated.timing(animation, {
    	// 	toValue: 1,
     //    	duration: 200,  
        	
    	// 	})
    	// ]).start(() => {
    	// 	if (isAnimating){
    	// 		setIsAnimating(false)
	    // 		setAnimatedType( getRandom(types.length -1))
	    // 		setAnimatedIndex( getRandom(text.length -1))

	    // 		// animate(index < text.length ? index + 1 : 0)
    	// 	}
    	// })

    }

    const animationValue = animation.interpolate({
	    inputRange: [0, 1],
	    outputRange: animatedType === 0 ? [`16deg`,`0deg`] : animatedType === 1 ? [1.2, 1 ] : animatedType === 2 ? ['30deg','0deg'] : ['-30deg','0deg'] 
	})	

	function createColoredText(text){
	    return(
	     <View style={styles.container}>
	      {map.call(text, (item, i) => {
	      		if (i === animatedIndex){
		          return (
		          	<Animated.Text key={i} style={[
			          	style ? style : {},
			          	{
			          		color: colors ? colors[i % colors.length] : '#fff', 
				          	transform: [
				          		animatedType === 0 ? {skewY: animationValue}:
				          		animatedType === 1 ? {scale: animationValue}:
				          		{rotate: animationValue}
				          	]
				        }
		          	]}>{item}</Animated.Text>
		          )
	      		} else return <Text key={i} style={[style, {color: colors ? colors[i % colors.length] : '#fff'}]}>{item}</Text>
	      })}
	      </View>
	    )
  	}
	return createColoredText(text)
}


const styles=StyleSheet.create({
	container:{
		flexDirection:'row'
	}
})


export default AnimatedText