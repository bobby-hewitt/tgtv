import React, { useState, useContext } from 'react'
import { Drawing, Header } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'

const CreateHeadShot = (props) => {
	const state = useContext(globalContext)
	
	const onSubmit = (data) => {
		state.setWaiting()
		state.toHost('submit-headshot', {headshot: data})
	}	
	return (
		<div className="HeadShotContainer">
			<Header label="Create your headshot" backgroundColor={state.backgroundColor}/>
			<Drawing onSubmit={onSubmit}/>
		</div>
	)
    
}

export default CreateHeadShot