import React, { useState, useContext } from 'react'
import { TextInput, Button, Header, AnimateIn } from 'Components'
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
				<AnimateIn>
				<Button label="Everyone's in" onClick={startGame} />
				</AnimateIn>
			}
			
		</div>
	)
    
}

export default Join