import React, { useState, useContext } from 'react'
import { TextInput, Button, Header, AnimateIn } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'
import suggestions from 'Data/searchSuggestions'

const Join = (props) => {
	const state = useContext(globalContext)
	const [ suggestion, setSuggestion] = useState('')

	const onSubmit = () => {
		state.USERsubmitSearchSuggestion(
			suggestion.toLowerCase().trim()
		)
		setSuggestion('') 
	}	

	const generateIdea = () => {
		let index = Math.floor(Math.random() * suggestions.length)
		setSuggestion(suggestions[index])
	}
	return (
		<div className="joinContainer">	
			<Header label="Start some search terms" backgroundColor={state.backgroundColor}/>
			<AnimateIn>
				<div className="row">
				<TextInput value={suggestion} placeholder={"Start a search term"} onChange={(e) => setSuggestion(e.target.value)}/>
				<Button square icon={require('assets/icons/help.svg')} label="Give me ideas" onClick={generateIdea} transparent/>
				</div>
				<Button label="Submit" isDisabled={suggestion.length < 3} onClick={onSubmit} />
			</AnimateIn>
		</div>
	)
    
}

export default Join