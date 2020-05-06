import React, { useState, useContext } from 'react'
import { TextInput, Button, Header, AnimateIn } from 'Components'
import globalContext from 'Contexts/global'
import './style.scss'

const Join = (props) => {
	const me = window.localStorage.tgme ? JSON.parse(window.localStorage.tgme) : {name: 'Bobby', room: 'ABCD'}
	const state = useContext(globalContext)
	const [ name, setName] = useState(me.name)
	const [ room, setRoom ] = useState(me.room)


	const dismissNotification = () => {
		state.setPopup(false)
	}

	// const onJoin = () => {
	// 	state.setPopup({
	// 		title: 'Uh oh',
	// 	    subtitle: 'Could not use playlist',
	// 	    actions: [
	// 	      {
	// 	        label: 'Ok',
	// 	        action: dismissNotification,
	// 	      },
	// 	      {
	// 	        label: 'Ok',
	// 	        action: dismissNotification,
	// 	      }
	// 	    ]
	// 	})
	// }
	
	const onJoin = () => {
		state.joinRoom({
			name: name.slice(0,12),
			room
		})
		  
	}	
	return (
		<div className="joinContainer">
			<Header label="Join game" backgroundColor={state.backgroundColor } />
			<AnimateIn>
			<TextInput value={name} placeholder={"Name"} onChange={(e) => setName(e.target.value)}/>
			<TextInput value={room} placeholder={"Room"} onChange={(e) => setRoom(e.target.value.toUpperCase())}/>
			<Button label="Play" onClick={onJoin} />
			</AnimateIn>
		</div>
	)
    
}

export default Join