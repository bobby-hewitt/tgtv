import openSocket from 'socket.io-client'
import React, {useEffect, useRef, useState, useContext} from 'react';
import useSocket from 'use-socket.io-client';
import {startSpeech } from '../../Helpers/TTS'
import {GLOBAL_playerJoined } from '../../Helpers/global'
import {
  StyleSheet,
  View,
  Animated,
  Text,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Provider } from "../../Context/search";
import { Join, Instructions, SubmitSuggestions } from '../../Containers/Global'
import { Players, RoomCode } from '../../Components/Global'
import globalContext from '../../Context/global'

import {
  
} from '../../Components'

const config = {
  maxPlayers: 6,
  minPlayers: 2,
  maxSuggestions:3,
}




const SearchGameController = () =>  {
  // const { socket } = useContext(globalContext)
  const [socket] = useSocket('http://192.168.0.2:9000',{
    autoConnect: false, forceNode: true
  })
  
  
  const globalState = useContext(globalContext)

  const [ room, setRoom ] = useState('----')
  const [ players, setPlayers ] = useState([])
  const [ gameState, setGameState] = useState('join')
  const [ questions, setQuestions] = useState([])
  useEffect(() => {
    socket.connect()
    console.log('joining')
    socket.emit('host-joined', 'search')
    return () => {
      socket.disconnect()
    }
  },[])
 
  useEffect(() => {
    if (socket){
      socket.on('host-room-generated', hostRoomGenerated)
      socket.on('player-joined', playerJoined)
      socket.on('start-game', startGame)
      socket.on('submit-suggestion', submittedSuggestion)
    }
      return () => {
          socket.removeListener('host-room-generated', hostRoomGenerated)
          socket.removeListener('player-joined', playerJoined)
          socket.removeListener('start-game', startGame)
          socket.removeListener('submit-suggestion', submittedSuggestion)
        
      }
  },[
    players,
    gameState,
    questions,
    questions.length,
    players.length
  ])
  
  function startGame(){
    setGameState('instructions')
  }

  function playerJoined(data){
    GLOBAL_playerJoined({
      playerData: data,
      socket,
      config,
      players,
      setPlayers
    })
  }

  function hostRoomGenerated(data){
    setRoom(data.short)
  }

  function onInstructionsComplete(){
    setGameState('submitSuggestions')
    socket.emit('submit-suggestions')
  }

  function submittedSuggestion(data){
    let newQuestions = Object.assign([], questions)
    newQuestions.push(data)
    setQuestions(newQuestions)
    if (newQuestions.length >= config.maxSuggestions){
      socket.emit('set-room-waiting')
    }
  }


  return (
    <Provider
      value={{
        room,
        players,
        setPlayers,
        gameState,
        setGameState,
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

export default SearchGameController;
