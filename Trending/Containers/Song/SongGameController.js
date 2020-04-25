
import openSocket from 'socket.io-client'
import React, {useEffect, useRef, useState, useContext} from 'react';
import useSocket from 'use-socket.io-client';
import {startSpeech } from '../../Helpers/TTS'
import {GLOBAL_playerJoined } from '../../Helpers/global'
import {playSound, clearRemoteSound } from '../../Helpers/Sound'
import {
  StyleSheet,
  View,
  Animated,
  Text,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Provider } from "../../Context/search";
import { Join, Instructions, SubmitSuggestions, Scores, } from '../../Containers/Global'
import { Players, RoomCode } from '../../Components/Global'

import globalContext from '../../Context/global'
import Round from './Round'

const config = {
  maxPlayers: 6,
  minPlayers: 1,
  maxSuggestions:3,
  maxTracks:5,
}




const SongGameController = (props) =>  {
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
  const [ trackIndex, setTrackIndex] = useState(-1)
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
      socket.on('restart', restart)
      return () => {
          socket.removeListener('host-room-generated', hostRoomGenerated)
          socket.removeListener('player-joined', playerJoined)
          socket.removeListener('start-game', startGame)
          socket.removeListener('submit-suggestion', submittedSuggestion)
          socket.removeListener('submit-answer', submittedAnswer)
          socket.removeListener('restart', restart)
        
      }
  },[
    players,
    gameState,
    update,
    questions,
    round,
    questions[round] ? questions[round].tracks[trackIndex] ? questions[round].tracks[trackIndex].votes.length : false : false,
    trackIndex,
    questions.length,
    players.length
  ])

  useEffect(() => {
    return () => {
      clearRemoteSound()
    }
  },[])
  
  function restart(){
    
    setRound(0)
    setGameState('submitSuggestions')
    setQuestions([])
    let newPlayers = Object.assign([], players)
    for(var i =0; i < newPlayers.length; i++){
      newPlayers[i].score = 0
    }
    setPlayers(newPlayers)
    socket.emit('choose-category')
  }

  function startGame(){
    globalState.setBackgroundPosition('center')
    props.stopBackgroundMusic()
    setGameState('instructions')
    
  }

  function playerJoined(data){
    data.score = 0;
    data.roundScore = 0;

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
      data.playerNumber = newPlayers.length-1
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
    startSpeech('introduction-song', {}, () => {
      setGameState('submitSuggestions')
      socket.emit('choose-category')
      
    })
    
  }

  function submittedSuggestion(data){
    data.tracks = data.tracks.slice(0,config.maxTracks )
    const newQuestions = Object.assign([], questions)
    newQuestions.push(data)
    setQuestions(newQuestions)
    if (newQuestions.length >= config.maxSuggestions){
      socket.emit('set-room-waiting')
       startSpeech('songs-suggestions-complete', {}, () => {
         
        setGameState('round')
      })
      
      
    }
  }


  function sendResponses(responses){
    const time = (new Date).getTime()
    for (var i = 0; i < responses.length; i++){
      responses[i].time = time
    }
      toRoom({
        action: 'song-options',
        options:responses
      })
  }

  function findMissingPlayer(res){
    for (var i = 0; i < players.length; i++){
      let player = res.find(r => r.player.name === players[i].name)
      if (!player){
        return players[i]
      }
    }
  }

  function submittedAnswer(data){

      let newQuestions = Object.assign([], questions)
      newQuestions[round].tracks[trackIndex].votes.push(data)    
      
      setQuestions(newQuestions)
      setUpdate(update+1)
  }

  function nextTrack(){
    console.log('NEXT TRACK', trackIndex, questions[round].tracks.length-1)
    if (trackIndex < questions[round].tracks.length-1){
       setTrackIndex(trackIndex + 1)
     } else {

      updateScores()
      setTrackIndex(-1)
      clearRemoteSound()
      setGameState('scores')
     }
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
    let newPlayers = Object.assign([], players)
    console.log('updating scores')
    for (var i =0 ; i < questions[round].tracks.length; i++){

      let track = questions[round].tracks[i]
      
      let correctIndex = track.responses.findIndex(r => r.isTrue)
      for (var j = 0; j < track.votes.length; j++){
        const vote = track.votes[j]
        
        if (vote.index === correctIndex){
          let playerIndex = newPlayers.findIndex(p => vote.player.name === p.name)
          newPlayers[playerIndex].roundScore += (100 - Math.floor(vote.time / 100))
        }
      }
    }
    setPlayers(newPlayers)
  }

  


  function endOfGame(){
    setGameState('end')
    toRoom({
      action:'on-end'
    })
  }

  function mergeRoundScore(){
    let newPlayers = Object.assign([], players)
    for (var i = 0; i < players.length; i++) {
      newPlayers[i].score += newPlayers[i].roundScore
      newPlayers[i].roundScore = 0;
    }
    setPlayers(newPlayers)
    setGameState('scores-updated')
  }

  function scoresComplete(){
    setRound(round +1)
    setGameState("round")
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
        {(gameState === 'join' || gameState === 'instructions') &&
          <Join />
        }
    
        {gameState === 'instructions' &&
          <Instructions onComplete={onInstructionsComplete} />
        }
        {gameState === 'submitSuggestions' &&
          <SubmitSuggestions questions={questions.length} limit={config.maxSuggestions}/>
        }
        {gameState === 'round' &&
          <Round round={round} toRoom={toRoom} config={config} gameState={gameState}nextTrack={nextTrack} players={players}sendResponses={sendResponses} question={questions[round]} trackIndex={trackIndex}/>
        }
        {(gameState === 'scores' || gameState === 'scores-updated' || gameState === 'end') &&
          <Scores 
            game="song"
            isEnd={round === questions.length-1}
            endOfGame={endOfGame}
            gameState={gameState}
            hasFinished={gameState==='end'}
            backgroundColor={globalState.backgroundColor}
            scoresComplete={scoresComplete}
            mergeRoundScore={mergeRoundScore}
            players={players}
          />
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

export default SongGameController;
