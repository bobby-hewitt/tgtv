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


const Options = ({responses, backgroundColor, sendVote}) => {

	// console.log('optoins', responses)
	const [ showResponses, setShowResponses ] = useState(false)
	function animationComplete(){
		setShowResponses(true)
	}

	function responseShown(i){
		console.log('response shown', i)
		if (i === responses.length-1){
			sendVote()
		}
	}
	return(
		<Scale scaleTo={1} fillContainer animationComplete={animationComplete}>
		<View style={[gs.centeredContainer,  gs.row,{flex:1,flexWrap:'wrap', flexDirection: 'row',alignItems:'flex-start', justifyContent:'center'}]}>
			{showResponses && responses.map((item, i) => {
				return(
					<SearchOption animationComplete={responseShown}backgroundColor={0} key={i} {...item} i={i} />
				)
			})}
		</View>
		</Scale>
	)
}

const styles = StyleSheet.create({
	
})

export default Options