import React, { Component } from 'react'
import { View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import AppController from './AppController'
export default class SplashScreenController extends Component {

	constructor(props){
		super(props)
		this.state = {
			didLoad: false
		}
	}
	componentDidMount(){
		
		this.setState({didLoad: true})
		setTimeout(() => {
			SplashScreen.hide();
		},500)
		
	}
	render(){

		if (this.state.didLoad){
			return (
				<AppController />
			)
		} 	
		else {
			return <View />
		}
		
	}
}