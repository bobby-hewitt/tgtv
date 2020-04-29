import React, {useRef, useEffect} from 'react'
import { 
	View,
	StyleSheet,
	Text,
	Animated
} from 'react-native'
import gs from '../../Styles'

const BullsEye = ({playerText}) => {
	

	
	return(
		<View style={styles.container}>
			<View style={[styles.redCircle, {width:500,height:500}]}>	
				<View style={[styles.whiteCircle, {width:400,height:400}]}>
					<View style={[styles.redCircle, {width:300,height:300}]}>
						<View style={[styles.whiteCircle, {width:200,height:200}]}>
							<View style={[styles.redCircle, {width:100,height:100}]}>		
							</View>
						</View>
					</View>
				</View>
			</View>        
			<View style={{padding:60, backgroundColor:'#fff', borderRadius:50, marginTop:60, marginLeft:-80}}>
				<Text style={[gs.subtitle, gs.bold, {color:"#101010", textAlign:'center'}]}>Bullseye +500</Text>
				<Text style={[gs.subtitle, gs.bold, {color:"#101010", textAlign:'center', fontWeight: '900', marginTop:12}]}>{playerText}</Text>
			</View>
		</View>
	)
	
}

const styles = StyleSheet.create({
	container:{

		position:'absolute',
		left:'0%',
		top:'0%',
		
		transform:[
			{
				translateX: -250
			},
			{
				translateY: -920
			},
		]
	},
	bullsEyeText:{
		width:1500,
		marginLeft:-750,
		position:'absolute',
		zIndex:1,
		fontWeight:'900',
		
		color:'#000',
		shadowColor: '#fff',
	    shadowOffset: { width: 0, height: 0 },
	    shadowOpacity: 1,
	    shadowRadius: 10,
		textAlign:'center',
	},
	redCircle: {
		borderRadius:500,
		backgroundColor:'#dd2121',
		alignItems:'center',
		justifyContent:'center'
	},
	whiteCircle: {
		borderRadius:500,
		backgroundColor:'#fff',
		alignItems:'center',
		justifyContent:'center'
	}
})

export default BullsEye