import React, { Component } from 'react'
import SongGameController from './SongGameController'
import io from 'socket.io-client'

export default class Socket extends Component {

	constructor(props){
		super(props)
		this.socket= io('http://192.168.0.2:9000')
	}

	componentWillUnmount(){
		console.log('disconnectinf')
		this.socket.disconnect()
	}

	render(){
		return(
			<SongGameController stopBackgroundMusic={this.props.stopBackgroundMusic}socket={this.socket} />
		)
	}
}