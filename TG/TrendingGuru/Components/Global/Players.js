import React from 'react'
import {
	View,
	Animated,
	Dimensions,
	StyleSheet,
	Text
} from 'react-native'
import gs from '../../Styles'


const Player = ({name, index, isRequired, backgroundColor, responses}) => {
	const response = responses && responses.find((p) => p.player.name === name)
	const isInverse= ((response) || (!responses && name))
	return (
		<View style={[ styles.playerContainer, isInverse ? {backgroundColor: '#ffffff'} : {}]}>
			<Text style={[gs.bodycopy, gs.bold, isInverse ? {color:backgroundColor} : {}]}>{name ? name : 'Player ' + (index + 1)}<Text style={styles.isRequired}>{ isRequired && !name ? ' (required)': ''}</Text></Text>
		</View>
	)
}

const Players = ({players, responses, maxPlayers, minPlayers, backgroundColor, scale}) => {

	const createInputs = () => {
    let arr = []
    for (let i = 0; i < maxPlayers; i++) {
    	
      arr.push(
      	<Player responses={responses} {...players[i]} key={i} index={i} backgroundColor={backgroundColor}isRequired={i < minPlayers}/>
      )
    }
    return(
    	<View style={{width:'100%', height:'100%', flex:1,alignItems:'center',justifyContent:'center'}}>
        {arr.map(input=>input)}
        </View>
    )
  }
	return(
		<Animated.View style={[styles.playersContainer, {transform: [{scale: scale || 1	}] }]}>
			{createInputs()}
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	playerContainer:{
		justifyContent:'center',
		paddingHorizontal:44,
		flex:1,
		marginVertical:12,
		width:'100%',
		borderRadius:16,
		maxHeight:138,
		borderWidth: 5,
		borderColor:'white',
		borderStyle:'dashed',
		backgroundColor:'#ffffff11',
	},
	isRequired:{
		borderColor:'#fff',
		fontSize:30,
	},
	playersContainer:{		
		flex:0.5,
		
		overflow:'hidden',
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'center'
	}

})

export default Players