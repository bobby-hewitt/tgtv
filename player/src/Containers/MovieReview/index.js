import React, { useContext, useState} from 'react'
import './style.scss'


import { TextInput, Button, Header } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'

const stars = [true,true,true,true,true]

const ChooseTitle = (props) => {
	const state = useContext(globalContext)
	const [ copy, setCopy] = useState('')
	const [ starRating, setStarRating] = useState(0)

	const onSubmit = (item) => {
		state.setWaiting()
		state.toHost('submit-review', {
			review: copy,
			rating: starRating,
			votes: 0,
		})
	}	


	return (
		<div className="joinContainer">
			<Header label="Review the movie" backgroundColor={state.backgroundColor } />
			<div className="starsContainer">
				{stars.map((item, i) => {
					if (i <= starRating){
						return(
							<div className="selectedStarContainer" onClick={() => setStarRating(i)}>
								<img className="star" src={require('assets/icons/starSelected.svg')}/>
							</div>
						)
					} else {
						return(
							<div className="starContainer" onClick={() => setStarRating(i)}>
								<img className="star" src={require('assets/icons/star.svg')}/>
							</div>
						)
					}
				})}
			</div>
			<TextInput value={copy} placeholder={""} onChange={(e) => setCopy(e.target.value)}/>
			<Button label="Send review"  onClick={() => onSubmit()}/>
		</div>
	)
    
}

export default ChooseTitle
