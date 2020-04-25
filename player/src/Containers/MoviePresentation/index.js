import React, { useState, useContext } from 'react'
import { TextInput, Button, Header } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'

const Join = (props) => {
	const state = useContext(globalContext)

	const sendKey = (key) => {
		state.toHost('submit-presentation-key',{key})
		// state.startGame()
	}

	const finishPresentation = () => {
		state.toHost('finish-presentation')
	}


	return (
		<div className="moviePresentationContainer">
			<Header label="Time to pitch your movie" backgroundColor={state.backgroundColor } />
			{state.presentation.title && 
				<div className="presentationButtonContainer">
					<Button noMargin label={`Show title (${state.presentation.title})`} onClick={() => sendKey({key: 'title', index:false})}/>
				</div>
			
			}
			{state.presentation.cast && state.presentation.cast.name &&
				<div className="presentationButtonContainer">
					<Button noMargin label={`Show Star (${state.presentation.cast.name})`} onClick={() => sendKey({key: 'cast', index:'star'})}/>
				</div>
			}
			{state.presentation.cast && state.presentation.cast.charName &&
				<div className="presentationButtonContainer">
					<Button noMargin label={`Show character (${state.presentation.cast.charName})`} onClick={() => sendKey({key: 'cast', index:'charName'})}/>
				</div>
			}
			<div className="storyboardPresentationOuterContainer">
			<p className="storyboardPresentationTitle">Show storyboard:</p>
			<div className="storyboardPresentationInnerContainer">
			{state.presentation.storyboard && state.presentation.storyboard.map((item, i) => {
				return(
					<Button inline label={`${i+1}/${state.presentation.storyboard.length}`} onClick={() => sendKey({key: 'storyboard', index:i})}/>
				)
			})}
			</div>
			</div>
			<Button  label="Done presenting" onClick={() => finishPresentation()}/>
		</div>
	)
    
}

export default Join