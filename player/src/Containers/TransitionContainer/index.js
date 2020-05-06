import React from 'react'
import './style.scss'

const TransitionContainer =(props) => {
	return(

		<div className="transitionContainer">
			{props.children }
		</div>
	)
} 

export default TransitionContainer