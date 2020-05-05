import React, {useRef, useEffect} from 'react'
import { 
	View,
	StyleSheet,
	Text,
	Animated
} from 'react-native'
import { Scale } from '../Global'
import gs from '../../Styles'

const Option = ({answer, i, animationComplete, backgroundColor}) => {
	
	return(
		
		<View style={[styles.option , { transform: [{rotate: i % 2 === 0 ? -0.05 : 0.05}]}]}>
		<Scale scaleTo={1} delay={300 * (i + 1)} duration={500} animationComplete={() => {
			if (animationComplete){
				animationComplete(i)
			} 
		}}>
		<View style={[styles.optionInner]}>
			<Text style={[gs.subtitle, gs.bold, {color:"#101010", textAlign:'center',fontSize:40}]}>{answer}</Text>
		</View>
		</Scale>
		</View>

		
	)
	
}

const styles = StyleSheet.create({
	option: {

		
		
		maxWidth:'30%',
	},
	optionInner:{
		backgroundColor:'#fff',
		shadowColor: '#000',
		padding:24,
	    shadowOffset: { width: 0, height: 0 },
	    shadowOpacity: 0.4,
	    shadowRadius: 20,
		marginHorizontal:24,
		marginVertical:30,
		borderColor:'#333',
		borderRadius:20,
		borderWidth:10,
	}
})

export default Option