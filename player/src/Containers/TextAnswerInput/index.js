import React, { useState, useContext } from 'react'
import { TextInput, Button, Header, AnimateIn } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'

const TextAnswerInput = (props) => {
	const state = useContext(globalContext)
	const [ answer, setAnswer] = useState('')

	const onSubmitAnswer = () => {
		state.setWaiting()
		state.toHost('submit-answer', {answer: answer.toLowerCase()})

	}	
	return (
		<div className="joinContainer">
		<Header label="What's your lie?" backgroundColor={state.backgroundColor}/>
			<AnimateIn>
			<TextInput value={answer} placeholder={"Your answer"} onChange={(e) => setAnswer(e.target.value)}/>
			<Button label="Submit"  onClick={onSubmitAnswer} />
			</AnimateIn>
		</div>
	)
    
}

export default TextAnswerInput