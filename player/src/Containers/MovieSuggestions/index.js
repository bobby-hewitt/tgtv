import React, { useState, useContext } from 'react'
import { TextInput, Button, Header  } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'
import suggestions from 'Data/searchSuggestions'



const MovieSuggestions = (props) => {
	const state = useContext(globalContext)
	const [ input1, setInput1] = useState('')
	const [ input2, setInput2] = useState('')
	const [ input3, setInput3] = useState('')
	const [ templateIndex, setTemplateIndex] = useState(0)


	const templates = [
		[
			{type: 'editable', onChange:(e) => setInput1(e.target.value), value:input1},
			{type: 'fixed', value: 'and the'},
			// {type: 'editable', onChange:(e) => setInput2(e.target.value), value:input2},
		],
		[
			{type: 'fixed', value: 'What to expect'},
			{type: 'editable', onChange:(e) => setInput2(e.target.value), value:input2},
		],
		[
			{type: 'fixed', value: 'Hold your'},
			{type: 'editable', onChange:(e) => setInput2(e.target.value), value:input2},
		],
		[
			{type: 'fixed', value: 'Hold your'},
			{type: 'editable', onChange:(e) => setInput2(e.target.value), value:input2},
		],
	]
	const onSubmit = () => {
		const response = templates[templateIndex]
		let str = ''
		for (var i = 0; i < response.length; i++){
			str += response[i].value
			str += ' '
		}

		console.log(str)

		setInput1('')
		setInput2('')
		setInput3('')

		setTemplateIndex(Math.floor(Math.random()* templates.length))
		state.toHost('submit-suggestion', {suggestion:str})

			// suggestion.toLowerCase().trim()
		
		
	}	


	return (
		<div className="MovieSuggestionsContainer">		
			<Header label="Create some titles" backgroundColor={state.backgroundColor } />
			{
				templates[templateIndex] &&templates[templateIndex].map((item, i) => {
					if (item.type === 'editable'){
						return <TextInput centered key={i} value={item.value} onChange={item.onChange}/>
					} else {
						return <p className="suggestionSentence"key={i}>{item.value}</p>
					}
					
				}) 
			}
			
			
			<Button label="Submit"  onClick={onSubmit} />
		</div>
	)
    
}

export default MovieSuggestions