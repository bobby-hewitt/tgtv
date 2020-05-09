import React, { useContext} from 'react'
import globalContext from 'Contexts/global'
import './style.scss'

const TextInput = ({value, placeholder, hiddenLimit, limit, isSong, onChange, noMarginBottom, centered}) => {
	const globalState = useContext(globalContext)
	
	function onInputChange(e){
		if (limit){
			e.target.value = e.target.value.slice(0,limit)
		}
		onChange(e)
	}

	return(
		<div className={`textInputOuterContainer ${limit && !hiddenLimit && 'withLimit'}`}>
		
		<input 
			value={value} 
			onChange={onInputChange}
			placeholder={placeholder}
			className={`textInput ${noMarginBottom && 'noMarginBottom'} ${isSong && 'isSong'} ${centered && 'centered'} ${globalState.loading && 'loading'}`}
		/>
		{limit && !hiddenLimit &&
			<div className="charLimitContainer">
				<p>{limit -value.length > 0 ? limit -value.length  : 0}</p>
				
			</div>
		}
		</div>
	)
}

export default TextInput