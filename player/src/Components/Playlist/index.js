import React, { useContext, useState, useEffect } from 'react'
import globalContext from 'Contexts/global'
import {navigate} from 'hookrouter';
import './style.scss'


const Playlist = (props) => {
	const state = useContext(globalContext)
	const [ src, setSrc ] = useState(false)
const imageLoader = new Image();
	useEffect(() => {
		if (props.images && props.images[0] && props.images[0].url){
			
			
		    imageLoader.src = props.images[0].url
		    imageLoader.onload = () => {

		     setSrc(props.images[0].url)
		     console.log('loading', src)
		    };
		}
	}, [
		props.images,
		src
	])
	return (
		<div className={`PlaylistOuterContainer `}>
			<div onClick={() => {
				if (!props.placeholder){
					state.USERsubmitSongSuggestion({
						id:props.id,
						index: props.index,
						image: props.images[0].url,
						name: props.name
					})
				}
				// navigate('/waiting')
			}} >
				<div className={`PlaylistContainer ${props.selected && 'selected'} ${'placeholder'}`} >
					{!props.placeholder && src &&
						
						<div className={`playlistImage`} style={{backgroundImage:  `url(${src})`}}>
						{props.selected && 
							<div className="overlay" />
						}
						</div>
						
					}
				</div>
			</div>

		</div>
	)
    
}

export default Playlist