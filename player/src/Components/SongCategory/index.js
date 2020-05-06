import React, { useContext, useEffect, useState } from 'react'
import globalContext from 'Contexts/global'
import {navigate} from 'hookrouter';
import './style.scss'


const Playlist = (props) => {
	const state = useContext(globalContext)
	const [isAnimatedIn, setIsAnimatedIn] = useState(props.delay === 0 ? true : false)

	useEffect(() => {
		const timeout = setTimeout(( ) => {
			setIsAnimatedIn(true)
		}, props.delay || 0)
		return () => {
			clearTimeout(timeout)
		}
	},[])



	return (
		<div className={`CategoryOuterContainer ${isAnimatedIn && 'isAnimatedIn'}`} style={{background: props.color, borderColor: state.backgroundColor}}onClick={() => {
			if (props.onClick){
				console.log('ONCLICKIN')
				props.onClick()
			} else {
				props.setIsLoading(true)
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