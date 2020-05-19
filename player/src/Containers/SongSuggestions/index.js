import React, { useContext, useState, useEffect } from 'react'
import globalContext from 'Contexts/global'

import './style.scss'

import { Playlist, TextInput, Scrollable, Header, SongCategory, AnimateIn } from 'Components'
const colors = ["#f6d55c", '#ed553b',"#3caea3"]
const Home = (props) => {
	const state = useContext(globalContext)
	const [ search , setSearch ] = useState('')
	const [ isLoading , setIsLoading ] = useState(false)

	useEffect(() => {
		if (!state.songCategories){
			console.log("EMITTING")
			state.getSongCategories()
		}
		return () => {
			return
		}
	},[])

	useEffect(() => {
		if (state.popup && state.popup.subtitle === "We couldn't find any playlists here"){
			setIsLoading(false)
		}
	},[state.popup])

	useEffect(() => {
		if (state.playlists.length){
			setIsLoading(false)
		}
	}, [state.playlists])

	function getPlaylists(e){
		if (e) e.persist()
		setIsLoading(true)
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
		<AnimateIn>
		<div className="playlistSearchContainer">
				<TextInput isSong value={search} noMarginBottom  placeholder="Search for a playlist" onChange={(e) => getPlaylists(e)}/>
			</div>
			<div className="playlistsInnerContainer">
				{!state.playlists && !isLoading && 
					<Scrollable>
						{state.songCategories && state.songCategories.map((item, i) => {
							
							
							const color = colors[i % colors.length]	
							return(
								<SongCategory delay={i < 8 ? i * 50 : i * 8} setIsLoading={setIsLoading}{...item} index={i} key={i}/>
							)
							
						})}
					</Scrollable>
				}
				{state.playlists && state.songCategories && !isLoading && 
					<Scrollable>
					<SongCategory delay={0} color={'#fff'} {...state.songCategories[0]} name="Back to categories" onClick={() => {
						setIsLoading(false)
						setSearch('')
						state.setPlaylists(false)
					}}/>

					{state.playlists.length > 0 && state.playlists.map((item, i) => {
							
							 return(
								<Playlist {...item} index={i } key={i}/>
							)
						
					})}
					</Scrollable>
				}
				{isLoading &&
					<div className="songSuggestionLoadingContainer">
						<SongCategory delay={0} color={'#fff'}{...state.songCategories[0]} name="Back to categories" onClick={() => {
							state.setPlaylists(false)
							setIsLoading(false)
							setSearch('')
						}}/>
						<Playlist placeholder/>
						<Playlist placeholder/>
						<Playlist placeholder/>
						<Playlist placeholder/>
						<Playlist placeholder/>
						<Playlist placeholder/>
						
					</div>
				}
			</div>
			</AnimateIn>
		</div>

	)
    
}

export default Home