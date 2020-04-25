import React, { useContext } from 'react'
import globalContext from 'Contexts/global'
import './style.scss'

const Button = ({label, onClick, isDisabled, transparent, noMargin, inline}) => {
	const globalState = useContext(globalContext)
	return(
		<div 
			onClick={onClick}
			style={{backgroundColor:globalState.backgroundColor}}
			className={`button ${globalState.loading && 'loading'} ${noMargin && 'noMargin'} ${inline && 'inline'} ${isDisabled && 'disabled'} ${transparent && 'transparent'}`}
		>
		<p>{label}</p>
		</div>
	)
}

export default Button