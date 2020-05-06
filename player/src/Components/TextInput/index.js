import React, { useContext} from 'react'
import globalContext from 'Contexts/global'
import './style.scss'

const TextInput = ({value, placeholder, isSong, onChange, noMarginBottom, centered}) => {
	const globalState = useContext(globalContext)
	

	return(
		<input 
			value={value} 
			onChange={onChange}
			placeholder={placeholder}
			className={`textInput ${noMarginBottom && 'noMarginBottom'} ${isSong && 'isSong'} ${centered && 'centered'} ${globalState.loading && 'loading'}`}
		/>
	)
}

export default TextInput