import React, { useState, useContext } from 'react'
import { navigate } from 'hookrouter'
import { TextInput, Button, Scrollable, Header, AnimateIn } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'
import suggestions from 'Data/searchSuggestions'
const Join = (props) => {
	const state = useContext(globalContext)

	const onSubmit = (i) => {
		state.toHost('submit-answer', {
			index: i,
			time: ((new Date()).getTime()) - state.ballot[i].time
		})
		navigate('/waiting')
	}	

	return (
		<div>
		<Header label="Which one?" backgroundColor={state.backgroundColor } />
		<AnimateIn>
		<Scrollable>
		
		<div className="songOptionsContainer">
			{state.ballot && state.ballot.map((item, i) => {
				return(
					<div key={i} className="ballotItemSong" onClick={() => onSubmit(i)}>
						<p>{item.name}</p>
						<p>{item.artist}</p>
					</div>
				)
			})}
		</div>

		</Scrollable>
		</AnimateIn>
		</div>
	)
    
}

export default Join