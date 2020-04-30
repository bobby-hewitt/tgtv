import React, { useState } from 'react'
import { 
	View,
	StyleSheet,
	Text,
	Animated
} from 'react-native'
import Scale from './Scale'
import { SearchOption } from '../Search'
import gs from '../../Styles'


const Options = ({responses, backgroundColor}) => {


	const [ showResponses, setShowResponses ] = useState(false)
		function animationComplete(){
			setShowResponses(true)
		}
	return(
		<Scale scaleTo={1} animationComplete={animationComplete}>
		<View style={[gs.centeredContainer,  gs.row,{flexWrap:'wrap', flexDirection: 'row-reverse',alignItems:'flex-start', justifyContent:'center'}]}>
		

			

			{showResponses && responses.map((item, i) => {
				return(
					<SearchOption backgroundColor={0} key={i} {...item} i={i} />
				)
			})}
		</View>
		</Scale>
	)
}

const styles = StyleSheet.create({
	option: {
		marginHorizontal:24,
		marginVertical:30,
		backgroundColor:'#fff',
		borderRadius:20,
		backgroundColor:'green',
		padding:24,
		maxWidth:'30%',
		flexWrap:'wrap',
		alignItems:'center',
		justifyContent:'center'
	}
})

export default Options