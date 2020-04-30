import React from 'react'
import {
	View,
	Dimensions,
	Image, 
	Text,
	StyleSheet
} from 'react-native'

const RoomCodeIndicator = ({roomCode, color, guruImage}) => {
	return(
		<View style={styles.container}>
			
		
			<Text style={styles.roomCode}>Room code: <Text style={{fontWeight:'bold', fontSize:40}}>{roomCode}</Text></Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		position:'absolute',
		top:0,
		right:0,
		zIndex:100,
		alignItems:'center',
		
		flexDirection:'row',
		
		
	},	
	image:{
		height:80,
		width:38,
		
	},
	roomCode:{
		color:'#fff',
		marginLeft:12,
		fontSize:28, 
		
	},
	label:{

	},
})

export default RoomCodeIndicator