import React from 'react'
import {
	View,
	Animated,
	Dimensions,
	StyleSheet,
	Text
} from 'react-native'
import Translate from './Translate'
import Scale from './Scale'
import gs from '../../Styles'

const PlayerJoin = ({name, index, isRequired, backgroundColor, color, responses, darkTheme}) => {
	const response = responses && responses.find((p) => p.player.name === name)
	const isInverse= ((response) || (!responses && name))
	return (
		<View style={styles.playerOuterContainer}>
			<View style={[styles.player, styles.placeholder, {borderColor:darkTheme ? '#000' :'#fff'}]}>
				<Text style={[gs.bodycopy, gs.bold, {color: darkTheme ? '#000' :'#fff'}]}>{'Player ' + (index + 1)}<Text style={[styles.isRequired, {color: darkTheme ? '#000' :'#fff'}]}>{ isRequired ? ' (required)': ''}</Text></Text>
			</View>
			{name &&

				
				<Translate translateXY={'translateX'}fromVal={-400} easing={'bounce'} toVal={0} duration={500}fillContainer>
				
				<View style={[ styles.playerContainer, styles.player, {backgroundColor: color}]}>
					<Text style={[gs.bodycopy, gs.bold, {color: darkTheme ? '#000' :'#fff'}]}>{name}</Text>
						<View style={styles.playerUnderline} />
				</View>
				
				</Translate>
				
			}
		</View>
	)
}

const styles = StyleSheet.create({

	playerOuterContainer:{
		overflow:'hidden',
		position:'relative',
		justifyContent:'center',
		flex:1,
		width:'100%',
		borderRadius:16,
		// paddingHorizontal:44,
		marginVertical:12,

	},
	player:{
		position:'absolute',
		top:0,
		left:0,
		justifyContent:'center',
		flex:1,
		height:'100%',
		width:'100%',
		paddingHorizontal:44,
	},
	placeholder:{
		
		borderWidth: 5,
		borderStyle:'dashed',
	},
	playerContainer:{
		overflow:'hidden',
		position:'relative',
		justifyContent:'center',
		
		flex:1,
		
		width:'100%',
		borderRadius:16,
		maxHeight:138,

		
	},
	playerUnderline:{
		
		position:'absolute',
		bottom:0,
		left:0,
		right:0,
		height:10,
		backgroundColor:'#00000030',
	}	,
	
	isRequired:{
		borderColor:'#fff',
		fontSize:30,
	},
})


export default PlayerJoin