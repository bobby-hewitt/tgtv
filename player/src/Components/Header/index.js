import React from 'react'
import './style.scss'

const Header = ({backgroundColor, label}) => {
	return(
		<div className="appNameContainer" style={{backgroundColor}}>
	      <p className="me">{label}</p>
	    </div>
     )
}

export default Header