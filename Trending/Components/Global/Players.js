import React from 'react'
import {
	View,
	Animated,
	Dimensions,
	StyleSheet,

	Text
} from 'react-native'
import PlayerJoin from './PlayerJoin'
import gs from '../../Styles'


const Players = ({players, responses, darkTheme, maxPlayers, colors, minPlayers, backgroundColor, scale}) => {
	const createInputs = () => {
	    let arr = []
	    for (let i = 0; i < maxPlayers; i++) {
	      arr.push(
	      	<PlayerJoin darkTheme={darkTheme} key={i} responses={responses} color={colors ? colors[i%colors.length]: darkTheme ? '#000' :'#fff'} {...players[i]} key={i} index={i} backgroundColor={backgroundColor}isRequired={i < minPlayers}/>
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

	playersContainer:{		
		flex:0.42,
		
		minHeight:Dimensions.get('window').height - (Dimensions.get('window').height / 10),
		overflow:'hidden',
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'center'
	}

})

export default Players