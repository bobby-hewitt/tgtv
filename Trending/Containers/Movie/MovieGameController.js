
import openSocket from 'socket.io-client'
import React, {useEffect, useRef, useState, useContext} from 'react';
import useSocket from 'use-socket.io-client';
import {startSpeech } from '../../Helpers/TTS'
import {GLOBAL_playerJoined } from '../../Helpers/global'
import {playSound } from '../../Helpers/Sound'

import {
  StyleSheet,
  View,
  Animated,
  Text,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import { Provider } from "../../Context/search";
import { Join, Instructions, Scores } from '../../Containers/Global'
import SubmitSuggestions from './SubmitSuggestions'
import StoryBoard from './StoryBoard'
import Cast from './Cast'
import ChooseTitle from './ChooseTitle'
import CreateTitles from './CreateTitles'

import { Players, RoomCode, Screen, RoomCodeIndicator } from '../../Components/Global'
import { ClapBoard } from '../../Components/Movie'
import Headshots from './Headshots'
import Presentation from './Presentation'
import Reviews from './Reviews'
import globalContext from '../../Context/global'


const config = {
  maxPlayers: 6,
  minPlayers: 1,
  maxSuggestions:3,
}

const storyboardLimit =3




const Movie = (props) =>  {
  // const { socket } = useContext(globalContext)
  const [socket] = useSocket('http://192.168.0.2:9000',{
    autoConnect: false, forceNode: true
  })
  
  
  const globalState = useContext(globalContext)
  
  const [ update, setUpdate] = useState(0)
  const [ room, setRoom ] = useState('----')
  const [ players, setPlayers ] = useState([])
  const [ gameState, setGameState] = useState('join')
  const [ questions, setQuestions] = useState([])
  const [ round, setRound] = useState(0)
  const [ presentationIndex, setPresentationIndex] = useState(-1)
  const [ presentationKey, setPresentationKey] = useState(false)
  useEffect(() => {
    socket.connect()
    console.log('HOST JOINING')
    socket.emit('host-joined', 'search')
    return () => {
      console.log('HOST LEAVING')
      socket.disconnect()
    }
  },[])
 
  useEffect(() => {
      socket.on('host-room-generated', hostRoomGenerated)
      socket.on('player-joined', playerJoined)
      socket.on('start-game', startGame)
      socket.on('submit-suggestion', submittedSuggestion)
      socket.on('submit-answer', submittedAnswer)
      socket.on('submit-vote', submitTitle)
      socket.on('restart', restart)
      socket.on('submit-headshot', submitHeadShot)
      socket.on('submit-storyboard', submitStoryBoard)
      socket.on('submit-cast', submitCast)
      socket.on('submit-presentation-key', submitPresentationKey)
      socket.on('finish-presentation', finishPresentation)
      socket.on('submit-review', submitReview)
      socket.on('submit-review-vote', submitReviewVote)
      return () => {
          socket.removeListener('host-room-generated', hostRoomGenerated)
          socket.removeListener('player-joined', playerJoined)
          socket.removeListener('start-game', startGame)
          socket.removeListener('submit-suggestion', submittedSuggestion)
          socket.removeListener('submit-answer', submittedAnswer)
          socket.removeListener('submit-vote', submitTitle)
          socket.removeListener('restart', restart)
          socket.removeListener('submit-headshot', submitHeadShot)   
          socket.removeListener('submit-storyboard', submitStoryBoard)   
          socket.removeListener('submit-cast', submitCast)
          socket.removeListener('submit-presentation-key', submitPresentationKey)
          socket.removeListener('finish-presentation', finishPresentation)
          socket.removeListener('submit-review', submitReview)
          socket.removeListener('submit-review-vote', submitReviewVote)
      }
  },[
    players,
    gameState,
    update,
    presentationIndex,
    questions,
    round,
    questions.length,
    players.length
  ])

  function submitReviewVote(data){
    if (gameState === 'show-reviews'){
      let newPlayers = Object.assign([], players)
      newPlayers[presentationIndex].reviews[data.index].votes += 1;
      setPlayers(newPlayers)
    }
    
  }

  function submitReview(data){
    let newPlayers = Object.assign([], players)
    console.log('GOT REVIE', newPlayers, presentationIndex, newPlayers[presentationIndex])
    newPlayers[presentationIndex].reviews.push(data)
    setPlayers(newPlayers)

    if (newPlayers[presentationIndex].reviews.length >= players.length-1){
      showReviews(newPlayers)
    }
  }

  function showReviews(newPlayers){
    setGameState('show-reviews')
  }

  function sendReviewVote(){
    toRoom({
      action:'vote-on-review', 
      reviews: players[presentationIndex].reviews
    })
    startSpeech('movie-review-vote', {name: ''} , () => {
      nextPresentation()
    })
    // startSpeech()

  }

  function finishPresentation(){
    //Clapping 
    setGameState('intermission')
    startSpeech('movie-review', {}, ()=>{
      toRoom({
        action: 'send-movie-review',
        player: players[presentationIndex].name
      })
    })
  }

  function submitTitle(data){
    let newPlayers = Object.assign([], players)
    for (var i = 0; i < newPlayers.length; i++){
      if (newPlayers[i].name === data.player.name){
        newPlayers[i].title = data.title
      }
    }
    setPlayers(newPlayers)
    let isComplete = checkSubmissions('title', 0)
    
    if (isComplete){
      setGameState('intermission')
      toRoom({action:'set-waiting'})
      startSpeech('movie-storyboard', {}, () => {
        setGameState('storyboard')
        toRoom({action:'send-story-board'})
      })
      
    }
  }

  function checkSubmissions(key, length){
    let count = 0
    for(var i = 0; i < players.length; i++){
      if (players[i][key] && players[i][key].length >= length){
        count += 1
      }
    }
    if (count === players.length){
      return true
    } else {
      return false
    }
  }

  function checkCastSubmissions(key, length){
    let count = 0
    for(var i = 0; i < players.length; i++){
      if (players[i].cast ){
        count += 1
      }
    }
    if (count === players.length){
      return true
    } else {
      return false
    }
  }

  function submitPresentationKey(data) {
    setPresentationKey(data.key)
    
  }

  function submitCast(data){
    let newPlayers = Object.assign([], players)
    for (var i = 0; i < newPlayers.length; i++){
      if (newPlayers[i].name === data.player.name){

        newPlayers[i].cast = data.cast
      }
    }
    setPlayers(newPlayers)
    let isComplete = checkCastSubmissions()
    console.log('cast is complete', isComplete)
    if (isComplete){
      
      setGameState('intermission')
      toRoom({action:'set-waiting'})
      startSpeech('movie-presentation', {}, ()=> {
         nextPresentation()
      })
    }
  }

  function onCastTimeout(){
    setGameState('intermission')
    toRoom({action:'set-waiting'})
    startSpeech('movie-presentation', {}, ()=> {
       nextPresentation()
    })
  }

  function onHeadshotsTimeout(){
    toRoom({action:'set-waiting'})
    startSpeech('movie-create-titles', {}, ()=> {
      setGameState('createTitles')
      toRoom({action:'submit-movie-suggestions'})
    })
  }

  function onStoryboardTimeout(){
    setGameState('intermission')
    toRoom({action:'set-waiting'})
    startSpeech('movie-cast', {},  ()=> {
      setGameState('cast')
      toRoom({action:'send-stars', players})
    })
      
  }

  function nextPresentation(){
    toRoom({action:'set-waiting'})
    setPresentationKey(false)
    
    if (presentationIndex < players.length -1){
      let nextIndex = presentationIndex + 1
      let key = 
        nextIndex === 0 ? 
          'movie-presentation-player-first' :
        nextIndex === players.length -1 ? 
          'movie-presentation-player-last' :
          'movie-presentation-player' 

      startSpeech(key, {name: players[nextIndex].name}, () => {
        setPresentationIndex(nextIndex)
        setGameState('presentation')
        let player = players[nextIndex]
        toPlayer({
          action:'send-presentation',
          player: player.id,
          cast: player.cast,
          title:player.title,
          storyboard:player.storyboard
        })
      })
    } else {
      setGameState('end')
    }
  }

  function sendPlayerPresentation(){

  }

  function submitHeadShot(data){
    let newPlayers = Object.assign([], players)
    for (var i = 0; i < newPlayers.length; i++){
      if (newPlayers[i].name === data.player.name){
        newPlayers[i].headshot = data.headshot
        console.log(newPlayers)
      }
    }

    setPlayers(newPlayers)
    let isComplete = checkSubmissions('headshot', 0)
    if (isComplete){
      toRoom({action:'set-waiting'})
      startSpeech('movie-create-titles', {}, ()=> {
        setGameState('createTitles')
        toRoom({action:'submit-movie-suggestions'})
      })
      
    }
  }

  function submitStoryBoard(data){
    let newPlayers = Object.assign([], players)
    for (var i = 0; i < newPlayers.length; i++){
      if (newPlayers[i].name === data.player.name){
        newPlayers[i].storyboard.push(data.image)
        if (newPlayers[i].storyboard.length >= storyboardLimit){
          toPlayer({action: 'set-waiting', player: data.player.id})
        }
      }
    }
    setPlayers(newPlayers)
    let isComplete = checkSubmissions('storyboard', storyboardLimit)
    console.log('is complete', isComplete, )
    if (isComplete){
      setGameState('intermission')
      toRoom({action:'set-waiting'})
      startSpeech('movie-cast', {},  ()=> {
        setGameState('cast')
        toRoom({action:'send-stars', players})
      })
      
    }
  }
  
  function restart(){
    
    setRound(0)
    setGameState('submitSuggestions')
    setQuestions([])
    let newPlayers = Object.assign([], players)
    for(var i =0; i < newPlayers.length; i++){
      newPlayers[i].score = 0
    }
    setPlayers(newPlayers)
    socket.emit('choose-playlists')
  }

  function startGame(){
    globalState.setBackgroundPosition('center')
    props.stopBackgroundMusic()

    setGameState('intermission')
    toRoom({action:'set-waiting'})
    startSpeech('movie-headshots', {}, ()=> {
      onInstructionsComplete()
    })
    
  }

  function playerJoined(data){
    data.score = 0;
    data.title = ''
    data.storyboard = [];
    data.stars= []
    data.reviews=[]

    function checkNameMatch(){
        var nameIndex = 1
        for (var i = 0; i < players.length; i++){
          if(players[i].name === data.name){
            if (nameIndex === 1){
              nameIndex += 1
              data.name = data.name +' ' +  nameIndex
            } else {
              nameIndex += 1
              data.name = data.name.substring(0, data.name.length - 1);
              data.name = data.name +nameIndex 
            }
            
          }
        }
        if (nameIndex > 1){
          return nameIndex 
        }
        return false
    }


    if (players.length < config.maxPlayers && gameState === 'join'){
      checkNameMatch()
      const newPlayers = Object.assign([], players)
      newPlayers.push(data)
      playSound('thud')
      if (newPlayers.length >= config.minPlayers){
        data.allowStartGame = true
      }
      setPlayers(newPlayers)
      data.backgroundColor = globalState.backgroundColor
      socket.emit('success-joining', data)
    } else if(gameState !== 'join'){
      let isExistingPlayer = players.findIndex(p => p.name === data.name)
      
      if (isExistingPlayer > -1){
        rejoin(isExistingPlayer, data)
      } else {
        socket.emit('room-full', data)
      }
    } else{
      socket.emit('room-full', data)
    }
  }


  function rejoin(index, data){
    console.log('rejoining')
    
    // socket.emit('success-rejoining', data)
  }



  function hostRoomGenerated(data){
    setRoom(data.short)
  }
  function onInstructionsComplete(){
    // console.log('INSTRUCTIONS COMPLETE')
    // startSpeech('introduction-song', {}, () => {
      // setGameState('submitSuggestions')
      toRoom({action: 'send-head-shot'})
      setGameState('headshots')
    
  }

  function submittedSuggestion(data){
    
    const newQuestions = Object.assign([], questions)
    newQuestions.push(data)
    setQuestions(newQuestions)
    
    if (newQuestions.length >= players.length * 3){
      setGameState('intermission')
      toRoom({action:'set-waiting'})
      startSpeech('movie-choose-title', {}, ()=> {
        socket.emit('send-movie-questions', {
          players, 
          questions: newQuestions
        })
      })
      
    }
  }

  function findMissingPlayer(res){
    for (var i = 0; i < players.length; i++){
      let player = res.find(r => r.player.name === players[i].name)
      if (!player){
        return players[i]
      }
    }
  }


  function sendResponses(responses){
  
  }

  function submittedAnswer(data){
    console.log('GOT VOTE',data)
      // let newQuestions = Object.assign([], questions)
      // newQuestions[round].tracks[trackIndex].votes.push(data)    
      
      // setQuestions(newQuestions)
      // setUpdate(update+1)
  }

  

  function answerTimeout(){
    
  }

  function toPlayer(data){
    socket.emit('host-to-player', data)
  }

  function toRoom(data){
    socket.emit('host-to-room', data)
  }

  

  

  function updateScores(){
    // let newPlayers = Object.assign([], players)
    // console.log('updating scores')
    // for (var i =0 ; i < questions[round].tracks.length; i++){

    //   let track = questions[round].tracks[i]
      
    //   let correctIndex = track.responses.findIndex(r => r.isTrue)
    //   for (var j = 0; j < track.votes.length; j++){
    //     const vote = track.votes[j]
        
    //     if (vote.index === correctIndex){
    //       let playerIndex = newPlayers.findIndex(p => vote.player.name === p.name)
    //       newPlayers[playerIndex].roundScore += (100 - Math.floor(vote.time / 100))
    //     }
    //   }
    // }
    // setPlayers(newPlayers)
  }

  


  function endOfGame(){
    setGameState('end')
    toRoom({
      action:'on-end'
    })
  }

  function mergeRoundScore(){
    // let newPlayers = Object.assign([], players)
    // for (var i = 0; i < players.length; i++) {
    //   newPlayers[i].score += newPlayers[i].roundScore
    //   newPlayers[i].roundScore = 0;
    // }
    // setPlayers(newPlayers)
    // setGameState('scores-updated')
  }

  function scoresComplete(){
    // setRound(round +1)
    // setGameState("round")
  }







  return (
    <Provider
      value={{
        room,
        players,
        setPlayers,
        gameState,
        setGameState,
        toPlayer,
        toRoom,
        config,
      }}
    >     
      <View style={[styles.container]}> 
        {gameState !== 'join' &&
          <RoomCodeIndicator roomCode={room}/>
        } 
        {(gameState === 'join' || gameState === 'instructions') &&
          <Join colors={["#ebbb4a", '#f7ee8b', '#d1d2d4']}/>
        }
        {gameState === 'instructions' &&
          <Instructions onComplete={onInstructionsComplete} />
        }
        
        {gameState === 'presentation' &&
            <Presentation players={players} presentationIndex={presentationIndex} presentationKey={presentationKey} backgroundColor={globalState.backgroundColor}/>
        }
        {gameState === 'show-reviews' &&
            <Reviews sendReviewVote={sendReviewVote} players={players} presentationIndex={presentationIndex} backgroundColor={globalState.backgroundColor}/>
        }
        {gameState === 'headshots' &&
            <Headshots players={players} onHeadshotsTimeout={onHeadshotsTimeout}/>
        }
        {gameState === 'submitSuggestions' &&
          <SubmitSuggestions questions={questions.length} limit={players.length * 3}/>
        }
        {gameState === 'chooseTitle' &&
          <ChooseTitle />
        }
        {gameState === 'createTitles' &&
         <CreateTitles />
        }
        {gameState === 'storyboard' &&
          <StoryBoard onStoryboardTimeout={onStoryboardTimeout} questions={questions.length} limit={players.length * 3}/>
        }
        {gameState === 'cast' &&
          <Cast onCastTimeout={onCastTimeout}/>
        }
        
       
      </View>
    </Provider>
  );
};







const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    position:'absolute',
    top: Dimensions.get('window').height/20,
    height: Dimensions.get('window').height - (Dimensions.get('window').height/10),
    left: Dimensions.get('window').width/20,
    right: Dimensions.get('window').width/20
  },
});

export default Movie;
