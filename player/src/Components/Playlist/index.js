import React, { useContext, useState } from 'react'
import globalContext from 'Contexts/global'
import {navigate} from 'hookrouter';
import './style.scss'


const Playlist = (props) => {
	const state = useContext(globalContext)
	console.log(props)
	return (
		<div className={`PlaylistOuterContainer `}>
			<div onClick={() => {
				
				state.USERsubmitSongSuggestion({
					id:props.id,
					index: props.index,
					image: props.images[0].url,
					name: props.name
				})
				// navigate('/waiting')
			}} className={`PlaylistContainer ${props.selected && 'selected'}`} style={{backgroundImage: `url(${props.images[0].url})`}}>
			{props.selected && 
				<div className="overlay" />
			}
			</div>

		</div>
	)
    
}

export default Playlist