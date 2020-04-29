import React, { useContext, useState } from 'react'
import globalContext from 'Contexts/global'
import {navigate} from 'hookrouter';
import './style.scss'


const Playlist = (props) => {
	const state = useContext(globalContext)
	



	return (
		<div className={`CategoryOuterContainer `} onClick={() => {
			if (props.onClick){
				props.onClick()
			} else {
				state.getPlaylists({category: props.id})
			}
				
				// navigate('/waiting')
			}}>
			<div  className={`PlaylistContainer ${props.selected && 'selected'}`} style={{backgroundImage: `url(${props.icons[0].url})`}}>
			
			{props.selected && 
				<div className="overlay" />
			}
			</div>
			<p className="categoryName" style={{color: state.backgroundColor}}>{props.name}</p>
		</div>
	)
    
}

export default Playlist