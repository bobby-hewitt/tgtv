import React, { useContext } from 'react'
import globalContext from 'Contexts/global'
import './style.scss'

const Button = ({label, icon, onClick, square,  isDisabled, transparent, noMargin, inline}) => {
	const globalState = useContext(globalContext)
	return(
		<div 
			onClick={onClick}
			style={{backgroundColor:globalState.backgroundColor}}
			className={`button ${globalState.loading && 'loading'} ${noMargin && 'noMargin'} ${square && 'square'} ${inline && 'inline'} ${isDisabled && 'disabled'} ${transparent && 'transparent'}`}
		>
		{!icon && 
			<p>{label}</p>
		}
		{icon && 
			<img src={icon} />
		}
		</div>
	)
}

export default Button