import React, { useState, useContext } from 'react'
import { TextInput, Button, Header } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'

const ChooseTitle = (props) => {
	const state = useContext(globalContext)
	

	const onSubmitVote = (item) => {
		state.setWaiting()
		state.toHost('submit-vote', {title: item})

	}	
	return (
		<div className="joinContainer">
			<Header label="Choose your titles" backgroundColor={state.backgroundColor } />
			{state.ballot && state.ballot.map((item, i) => {
				return(
					<div key={i} className="ballotItem" onClick={() => onSubmitVote(item.suggestion)}>
						<p>{item.suggestion}</p>
					</div>
				)
			})}
		</div>
	)
    
}

export default ChooseTitle