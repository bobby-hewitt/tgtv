import React, { useState, useEffect } from "react";
import { Provider } from "./Contexts/global";
import {useRoutes, navigate} from 'hookrouter';
import { Join, NotFound, WaitingStart, Waiting, CreateHeadShot, MovieReview, ReviewVote, MoviePresentation, CreateStoryBoard, SearchSuggestions, ChooseStar, MovieSuggestions, ChooseTitle, TextAnswerInput, Vote, End, SongSuggestions, SongOptions, Drawing} from 'Containers'
import { Background, Notification } from 'Components'
import openSocket from 'socket.io-client'
import './App.scss'

const routes = {
    '/': () => <Join />,
    '/movie-suggestions': () => <MovieSuggestions />,
    '/movie-presentation': () => <MoviePresentation />,
    '/movie-review': () => <MovieReview />,
    '/movie-title': () => <ChooseTitle />,
    '/movie-star': () => <ChooseStar />,
    '/movie-head-shot': () => <CreateHeadShot />,
    '/movie-story-board': () => <CreateStoryBoard />,
    '/waiting-start': () => <WaitingStart />,
    '/waiting': () => <Waiting />,
    '/search-suggestions': () => <SearchSuggestions />,
    '/text-answer-input': () => <TextAnswerInput />,
    '/vote': () => <Vote />,
    '/review-vote': () => <ReviewVote />,
    '/end': () => <End />,
    '/song-suggestions': () => <SongSuggestions />,
    '/song-options': () => <SongOptions />,
    '/drawing': ()=> <Drawing />,
};

const socket = openSocket('http://192.168.0.2:9000')
console.warn('NEW SOCKET')
const App = props => {

  
  const routeResult = useRoutes(routes);
  const [ backgroundColor, setBackgroundColor ] = useState('#040125')
  const [loading, setLoading] = useState(false)
  const [ room, setRoom ] = useState(false)
  const [ ballot, setBallot ] = useState(false)
  const [ me, setMe ] = useState(false)
  const [readyToStartGame, setReadyToStartGame] = useState(false);
  const [ playlists, setPlaylists ]= useState(false)
  const [ songCategories, setSongCategories ]= useState(false)
  const [ presentation, setPresentation ]= useState(false)
  const [ popup, setPopup ]= useState(false)

  useEffect(() => {
    if (window.location.pathname.length > 1){
      navigate('/')
    }
  },[])
  useEffect(() => {
    socket.on('error-joining', errorJoining)
    socket.on('success-joining', successJoining)
    socket.on('host-disconnected', hostDisconnected)
    socket.on('min-players-reached', minPlayersReached)
    socket.on('start-game', setWaiting)
    socket.on('set-waiting', setWaiting)
    socket.on('submit-suggestions', submitSuggestions)
    socket.on('send-answer-input', setAnswerInput)
    socket.on('set-vote', setVote)
    socket.on('success-rejoining', rejoin)
    socket.on('on-end', onEnd)
    socket.on('choose-playlist', choosePlaylist)
    socket.on('choose-category', chooseCategory)
    socket.on('playlist-suggestion-failed', playlistSuggestionFailed)
    socket.on('song-options', songOptions)
    socket.on('send-story-board', sendStoryBoard)
    socket.on('send-head-shot', sendHeadShot)
    socket.on('submit-movie-suggestions', submitMovieSuggestions)
    socket.on('movie-questions', movieQuestions)
    socket.on('send-stars', sendStars)
    socket.on('send-presentation', sendPresentation)
    socket.on('send-movie-review', sendMovieReview)
    socket.on('vote-on-review', voteOnReview)
    return  () => {
      socket.removeListener('error-joining', errorJoining)
      socket.removeListener('success-joining', successJoining)
      socket.removeListener('host-disconnected', hostDisconnected)
      socket.removeListener('min-players-reached', minPlayersReached)
      socket.removeListener('start-game', setWaiting)
      socket.removeListener('set-waiting', setWaiting)
      socket.removeListener('submit-suggestions', submitSuggestions)
      socket.removeListener('send-answer-input', setAnswerInput)
      socket.removeListener('set-vote', setVote)
      socket.removeListener('success-rejoining', rejoin)
      socket.removeListener('on-end', onEnd)
      socket.removeListener('choose-playlist', choosePlaylist)
      socket.removeListener('choose-category', chooseCategory)
      socket.removeListener('playlist-suggestion-failed', playlistSuggestionFailed)
      socket.removeListener('song-options', songOptions)
      socket.removeListener('send-story-board', sendStoryBoard)
      socket.removeListener('send-head-shot', sendHeadShot)
      socket.removeListener('submit-movie-suggestions', submitMovieSuggestions)
      socket.removeListener('movie-questions', movieQuestions)
      socket.removeListener('send-stars', sendStars)
      socket.removeListener('send-presentation', sendPresentation)
      socket.removeListener('send-movie-review', sendMovieReview)
      socket.removeListener('vote-on-review', voteOnReview)
    }
  })

  function chooseCategory(data){
    console.log('choosing category', data)
    setSongCategories(data)
    navigate('/song-suggestions')
  }

  function voteOnReview(data){
    setBallot(data.reviews)
    navigate('/review-vote')

  }

  function sendMovieReview(data){
    if (data.player === me.name){
      setWaiting()
    } else {
      navigate('/movie-review')
      
    }
  }

  function sendPresentation(data){
    setPresentation(data)
    navigate('/movie-presentation')
  }

  function sendStars(data){
    
    setBallot(data.players)
    navigate('/movie-star')
  }

  function movieQuestions(data){
    console.log('GOT MOVIE QUESTIONS', data)
    setBallot(data)
    navigate('movie-title')
  }

  function submitMovieSuggestions(){
      navigate('movie-suggestions')
  }

  function sendStoryBoard(){
    navigate('/movie-story-board')
  }
  function sendHeadShot(){
    navigate('/movie-head-shot')
  }

  function submitDrawing(data){
    toHost('submit-drawing', {image: data})
  }

  function songOptions(data){
    console.log('got options', data)
    setBallot(data.options)
    navigate('/song-options')
  }

  function onEnd(){
    setBallot(false)
    setReadyToStartGame(false)
    setPresentation(false)
    setPopup(false)

    setPlaylists(false)
    setSongCategories(false)
    navigate('/end')
  }

  function choosePlaylist(data){
    console.log('choosing')
    setPlaylists(data)
    if (window.location.pathname !== '/song-suggestions'){
      navigate('/song-suggestions')
    }
  }

  function getPlaylists(data){
    console.log('getting playlists', data)
    socket.emit('choose-playlists', data)
  }

  function playlistSuggestionFailed(index){
    setPopup({
     title: 'Oh no!',
       subtitle: "We can't get the music from that playlist. You'll have to try another one",
       actions: [
         {
           label: 'Ok',
           action: () => removeFailedPlaylist(index),
         }
       ]
   })
  }

  function removeFailedPlaylist(index){
    let newPlaylists = Object.assign([], playlists)
    newPlaylists.splice(index, 1)
    setPlaylists(newPlaylists)
    setPopup(false)
  }

  function hostDisconnected(){
    console.log('host-disconnected')
    setPlaylists(false)
    setReadyToStartGame(false)
    setMe(false)
    setLoading(false)
    navigate('/')
  }

  function joinRoom(data){
    setLoading(true)
    data.id = socket.id
    socket.emit('player-joined', data)
  }

  function successJoining(data){
    setLoading(false)
    console.log('success joining', data)
    setBackgroundColor(data.backgroundColor)
    setMe(data)
    setReadyToStartGame(data.allowStartGame)
    window.localStorage.tgme = JSON.stringify(data)
    navigate('/waiting-start')
  }


  function rejoin(data){
    
    if (data.rejoinData){
      setBallot(data.rejoinData)
      delete data.rejoinData
    } 
    setMe(data)
    setLoading(false)
    window.localStorage.tgme = JSON.stringify(data)
    navigate('/' + data.rejoinAt)

  }

  function setVote(data){
    setBallot(data.options)
    navigate('/vote')
  }

  function errorJoining(data){
    setLoading(false)
    setPopup({
     title: 'Oh no!',
       subtitle: "That room doesn't exist",
       actions: [
         {
           label: 'Ok',
           action: () => setPopup(false),
         }
       ]
   })
  }

  function minPlayersReached(){
    setReadyToStartGame(true)
  }

  function setWaiting(){
    navigate('/waiting')
  }

  function setAnswerInput(){
    navigate('/text-answer-input') 
  }


  function startGame(){
    //user funcion
    navigate('/waiting')
    socket.emit('start-game', {room: me.roomid})
  }

  function submitSuggestions(){
    if (me.game && me.game === 'search'){
      navigate('/search-suggestions')
    } else if (me.game === 'giffty') {

    }
  }

  function toHost(action,data){
    console.log('submitting', data, me.roomid)
    socket.emit('player-to-host', {
      action,
      room:me.roomid,
      player:me,
      ...data
    })
  }
  function toRoom(action,data){
    socket.emit('player-to-room', {
      action,
      room:me.roomid,
      player: me.id,
      ...data
    })
  }

  function USERsubmitSearchSuggestion(data){
    socket.emit('submitting-search-suggestion', {
      room: me.roomid,
      player: me,
      suggestion: data.trim()
    })
  }

  function USERsubmitSongSuggestion(data){
    console.log('data', data.index)
     let newPlaylists = Object.assign([], playlists)
     newPlaylists[data.index].selected = true
     setPlaylists(newPlaylists)
    socket.emit('submitting-song-suggestion', {
      room: me.roomid,
      player: me,
      ...data,
    })
  }

  
  return (
     <Provider
        value={{
          popup,
          setPopup,
          setWaiting,
          joinRoom,
          submitDrawing,
          getPlaylists,
          presentation,
          loading,
          setLoading,
          playlists,
          setPlaylists,
          songCategories,
          setBallot,
          readyToStartGame,
          startGame,
          toHost,
          toRoom,
          me,
          backgroundColor,
          USERsubmitSearchSuggestion,
          USERsubmitSongSuggestion,
          ballot,
        }}
      >
      <Background backgroundColor={backgroundColor}/>
      <div className="appContentContainer">
      
      { routeResult || <NotFound />}
      </div>
      <Notification {...popup} backgroundColor={backgroundColor}/>
    </Provider>
  );
};

export default App;

