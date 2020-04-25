import React, { useState, useContext } from 'react'
import { TextInput, Button, Scrollable, Header } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'

const TextAnswerInput = (props) => {
	const state = useContext(globalContext)
	

	const onSubmitVote = (index) => {
		
		if (!state.ballot[index].isLiked){
			state.ballot[index].isLiked = true
			state.setBallot(state.ballot)
			state.toHost('submit-review-vote', {index})
		} 

	}	
	
	return (
		<div className="joinContainer">
		<Header label="Like some reviews" backgroundColor={state.backgroundColor } />
			<Scrollable>
			{state.ballot && state.ballot.map((item, i) => {
				const isMine = item.player && item.player.name === state.me.name
				if (!isMine ){
					return(
						<div className="ballotItemOuter">
							<div key={i} className={`ballotItem ${item.isLiked && 'isLiked '}`} onClick={() => onSubmitVote(i)}>
								<p>{item.review && item.review.length > 0 ? item.review : 'No comment'}</p>
								{item.isLiked &&
									<img src={require('assets/icons/heartSelected.svg')} />
								}
								{!item.isLiked &&
									<img src={require('assets/icons/heart.svg')} />
								}
							</div>
						</div>
					)
				} else {
					return <div key={i}/>
				}
			})}
			</Scrollable>
		</div>
	)
    
}

export default TextAnswerInput