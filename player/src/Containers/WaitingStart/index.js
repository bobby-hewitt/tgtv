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
			<Header label={state.readyToStartGame ? 'Ready when you are' : "Waiting for more players"} backgroundColor={state.backgroundColor } />
			{state.readyToStartGame &&
				<Button label="Everyone's in" onClick={startGame} />
			}
			{!state.readyToStartGame && 
				<p>Waiting for more players</p>
			}
		</div>
	)
    
}

export default Join