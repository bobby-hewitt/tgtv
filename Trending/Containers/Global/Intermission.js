import React, { Component } from 'react'
import { 
	View,
	StyleSheet,
	Text
} from 'react-native'
import gs from '../../Styles'

const Intermission = ({label, voice}) => {
	return (
		<View style={[gs.centeredContainer, {flex:1}]}>
			<Text style={[gs.title, gs.bold]}>{label}</Text>
		</View>
	)
}

export default Intermission 