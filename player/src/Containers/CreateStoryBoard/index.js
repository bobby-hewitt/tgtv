import React, { useState, useContext } from 'react'
import { Drawing, Header } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'

const CreateHeadShot = (props) => {
	const state = useContext(globalContext)
	const [storyIndex, setStoryIndex] = useState(0)
	const onSubmit = (data) => {
		if (storyIndex < 2){
			setStoryIndex(storyIndex+1)
			state.toHost('submit-storyboard', {image: data})
		} else {
			state.toHost('submit-storyboard', {image: data})
			state.setWaiting()
		}
		
	}	
	return (
		<div className="HeadShotContainer">
			<Header label={`Draw your story. ${storyIndex +1}/3`} backgroundColor={state.backgroundColor}/>
			<Drawing onSubmit={onSubmit}/>
		</div>
	)
    
}

export default CreateHeadShot