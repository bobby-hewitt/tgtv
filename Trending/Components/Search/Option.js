import React, {useRef, useEffect} from 'react'
import { 
	View,
	StyleSheet,
	Text,
	Animated
} from 'react-native'
import gs from '../../Styles'

const Option = ({answer, i, animationComplete, backgroundColor}) => {
	const scale = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(scale, {
	        toValue: 1,
	        delay:300,
	        duration: 500,    
	      }).start( () => {
	      	if (animationComplete) animationComplete()
	      })
	})
	return(
		<Animated.View key={i} style={[styles.option , {borderColor:'#333',  transform: [{rotate: i % 2 === 0 ? -0.05 : 0.05}, {scale}]}]}>
			<Text style={[gs.bodycopy, gs.bold, {color:"#101010", textAlign:'center'}]}>{answer}</Text>
		</Animated.View>
	)
	
}

const styles = StyleSheet.create({
	option: {
		shadowColor: '#000',
	    shadowOffset: { width: 0, height: 0 },
	    shadowOpacity: 0.4,
	    shadowRadius: 20,
		marginHorizontal:24,
		marginVertical:30,
		backgroundColor:'#fff',
		borderRadius:20,
		borderWidth:10,
		padding:24,
		maxWidth:'30%',
		flexWrap:'wrap',
		alignItems:'center',
		justifyContent:'center'
	}
})

export default Option