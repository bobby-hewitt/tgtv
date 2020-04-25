import React, { useState, useContext } from 'react'
import { TextInput, Button, Scrollable, Header } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'



const Star = ({headshot, name, onToggle, onNameChange, isInCast, index}) => {

	return(
		<div className={`ballotItemOuter ${isInCast && 'isInCast'}`}>
		<div className="castBallotItem" onClick={() => onToggle(index) }>
			<div className="headshotContainer">
				<img src={headshot} />
			</div>
			<p>{name}</p>
		</div>
		{isInCast &&
			<React.Fragment>
			<p className="starringAs">Starring as</p>
			<TextInput onChange={(e) => onNameChange(index, e.target.value)} />
			</React.Fragment>
		}
		</div>
	)
}
const ChooseTitle = (props) => {
	const state = useContext(globalContext)
	const [ starIndex, setStarIndex ] = useState(false)
	const [ charName, setCharName ] = useState('')

	const onSubmitVote = (item) => {
		state.setWaiting()
		// let submission = []
		// for (var i = 0; i < state.ballot.length; i++){
		// 	if (state.ballot[i].isInCast){
		// 		let obj = {
		// 			name: state.ballot[i].name,
		// 			charName: state.ballot[i].charName,
		// 		}
		// 		submission.push(obj)
		// 	}
		// }
		state.toHost('submit-cast', {cast: {

					name: state.ballot[starIndex].name,
					charName: charName,
				
		}})
	}	


	const onToggleStar = (index) => {
		setStarIndex(index)
		// const newBallot = Object.assign([], state.ballot)
		// state.ballot[index].isInCast = !state.ballot[index].isInCast
		// state.setBallot(newBallot)
	}

	const onNameChange = (name) => {
		setCharName(name)
		// const newBallot = Object.assign([], state.ballot)
		// state.ballot[index].charName = name
		// state.setBallot(newBallot)
	}
	if (!starIndex && starIndex !== 0){
		return (
			<div>
			<div className="starsContainer">
			<Header label="Choose your star" backgroundColor={state.backgroundColor } />
				<Scrollable>
				{state.ballot && state.ballot.map((item, i) => {
					return(
						<Star key={i} {...item} onToggle={onToggleStar} onNameChange={onNameChange} index={i}/>
					)
				})}
				</Scrollable>
			</div>

			
			</div>
		)
	} else {
		return(
			<div>
			<Header label={`Name ${state.ballot[starIndex].name}'s character`} backgroundColor={state.backgroundColor } />
			<TextInput onChange={(e) => onNameChange(e.target.value)} />
			<Button label="Submit" onClick={onSubmitVote} />
			</div>
		)
	}
    
}

export default ChooseTitle