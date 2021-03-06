import React, { useState, useContext } from 'react'
import { TextInput, Button, Header, AnimateIn } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'

const TextAnswerInput = (props) => {
	const state = useContext(globalContext)
	

	const onSubmitVote = (index) => {
		state.setWaiting()
		state.toHost('submit-vote', {index})

	}	
	return (
		<div className="joinContainer">
			<Header label="Which one is right?" backgroundColor={state.backgroundColor}/>
			<AnimateIn>
			{state.ballot && state.ballot.map((item, i) => {
				let isAlso = item.also && item.also.find( a => {
					console.log('also search', a.player.name, state.me.name)
					 return a.player.name === state.me.name
				})
				if ((!item.player ||  (item.player.name !== state.me.name && !isAlso))){
					return(
						<div key={i} className="ballotItem" onClick={() => onSubmitVote(i)}>
							<p>{item.answer}</p>
						</div>
					)
				} else return <div key={i} /> 
			})}
			</AnimateIn>
		</div>
	)
    
}

export default TextAnswerInput