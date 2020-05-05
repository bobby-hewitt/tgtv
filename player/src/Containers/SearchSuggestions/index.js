import React, { useState, useContext } from 'react'
import { TextInput, Button, Header } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'
import suggestions from 'Data/searchSuggestions'

const Join = (props) => {
	const state = useContext(globalContext)
	const [ suggestion, setSuggestion] = useState('Test')

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
			<TextInput value={suggestion} placeholder={"Start a search term"} onChange={(e) => setSuggestion(e.target.value)}/>
			<Button label="Give me ideas" onClick={generateIdea} transparent/>
			<Button label="Submit" isDisabled={suggestion.length < 3} onClick={onSubmit} />
		</div>
	)
    
}

export default Join