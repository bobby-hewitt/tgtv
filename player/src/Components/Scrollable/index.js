import React from 'react'
import './style.scss'

const Scrollable = (props) => {
	return(
	<div className="scrollable">
		{props.children}
		<div className="padding" />
	</div>
	)
}



export default Scrollable