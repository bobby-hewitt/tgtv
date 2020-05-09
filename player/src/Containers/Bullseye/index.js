import React, {useContext} from 'react'
import './style.scss'
import {Header } from 'Components'
import globalContext from 'Contexts/global'

const Bullseye = () => {
	const state = useContext(globalContext)
	return(
		<div className="bullseyeContainer">
		<Header label="Bullseye!" backgroundColor={state.backgroundColor } />
		<p>You got a bullseye!</p>
		<p>No need to vote. </p>
		</div>
	)
}

export default Bullseye