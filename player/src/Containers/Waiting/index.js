import React, { useState, useContext } from 'react'
import { TextInput, Button, Header } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'

const Join = (props) => {
	const state = useContext(globalContext)

	const startGame = () => {
		state.startGame()
	}
	return (
		<div className="joinContainer">
			<Header label={"Just a sec"} backgroundColor={state.backgroundColor } />
			
		</div>
	)
    
}

export default Join