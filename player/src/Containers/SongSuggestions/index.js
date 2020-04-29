import React, { useContext, useState, useEffect } from 'react'
import globalContext from 'Contexts/global'

import './style.scss'

import { Playlist, TextInput, Scrollable, Header, SongCategory } from 'Components'

const Home = (props) => {
	const state = useContext(globalContext)
	const [ search , setSearch ] = useState('')

	useEffect(() => {
		if (!state.songCategories){
			console.log("EMITTING")
			state.getSongCategories()
		}
		return () => {
			return
		}
	},[])

	function getPlaylists(e){
		if (e) e.persist()
		state.setPlaylists([])
		setSearch(e.target.value)
		clearTimeout(window.loadTimeout)
		window.loadTimeout= setTimeout(() => {
			
			state.getPlaylists({search:e.target.value})
		},500)
		
	}

	
	return (
		<div className="playlistsContainer">
		<Header label="Choose a playlist" backgroundColor={state.backgroundColor } />
		<div className="playlistSearchContainer">
				<TextInput value={search} noMarginBottom  placeholder="Search for a playlist" onChange={(e) => getPlaylists(e)}/>
			</div>
			<div className="playlistsInnerContainer">
				{!state.playlists && 
					<Scrollable>
						{state.songCategories && state.songCategories.map((item, i) => {
							return(
								<SongCategory {...item} index={i} key={i}/>
							)
						})}
					</Scrollable>
				}
				{state.playlists && state.songCategories &&
					<Scrollable>
					<SongCategory {...state.songCategories[0]} name="Back to categories" onClick={() => state.setPlaylists(false)}/>
					{state.playlists.length > 0 && state.playlists.map((item, i) => {
						return(
							<Playlist {...item} index={i } key={i}/>
						)
					})}
					</Scrollable>
				}
			</div>
		</div>
	)
    
}

export default Home