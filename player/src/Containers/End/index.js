import React, { useState, useContext } from 'react'
import { TextInput, Button, Header } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'

const PlayAgain = (props) => {
	const state = useContext(globalContext)
	
	const onPlayAgain = () => {
		state.toHost('restart', {})
	}	
	return (
		<div className="PlayAgainContainer">
			<Header label="That's the end" backgroundColor={state.backgroundColor } />
			<Button label="Play again" onClick={onPlayAgain} />
		</div>
	)
    
}

export default PlayAgain