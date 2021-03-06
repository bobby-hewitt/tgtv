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
  SafeAreaView,
} from 'react-native';
import { Provider } from "../../Context/search";
import { Join, Instructions, SubmitSuggestions, Scores } from '../../Containers/Global'
import { Players, RoomCode, RoomCodeIndicator, Confetti } from '../../Components/Global'
import Round from './Round'
import End from './End'
import globalContext from '../../Context/global'
import fallbackLies from '../../Data/fallbackLies'


const config = {
  maxPlayers: 6,
  minPlayers: 2,
  maxSuggestions:3,
}




const SearchGameController = (props) =>  {
  // const { socket } = useContext(globalContext)
  const [socket] = useSocket('http://192.168.0.2:9000',{
    autoConnect: false, forceNode: true
  })
  
  
  const globalState = useContext(globalContext)
  

  const [ room, setRoom ] = useState('----')
  const [ players, setPlayers ] = useState([])
  const [ gameState, setGameState] = useState('join')
  const [ questions, setQuestions] = useState([])
  const [ round, setRound] = useState(0)
  const [ timer, setTimer ] = useState(false)
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
      socket.on('submit-vote', submitVote)
      socket.on('restart', restart)
      return () => {
          socket.removeListener('host-room-generated', hostRoomGenerated)
          socket.removeListener('player-joined', playerJoined)
          socket.removeListener('start-game', startGame)
          socket.removeListener('submit-suggestion', submittedSuggestion)
          socket.removeListener('submit-answer', submittedAnswer)
          socket.removeListener('submit-vote', submitVote)
          socket.removeListener('restart', restart)
        
      }
  },[
    players,
    gameState,
    questions,
    round,
    questions.length,
    players.length
  ])
  
  function restart(){
    
    setRound(0)
    setGameState('submitSuggestions')
    setQuestions([])
    let newPlayers = Object.assign([], players)
    for(var i =0; i < newPlayers.length; i++){
      newPlayers[i].score = 0
    }
    setPlayers(newPlayers)
    socket.emit('submit-suggestions')
  }

  function startGame(){
    globalState.setBackgroundPosition('center')
    props.stopBackgroundMusic()
    setGameState('instructions')
    // setGameState('scores')
  }

  function playerJoined(data){
    data.score = 0;
    data.roundScore = 0;
    data.goodLieScore = 0;
    data.ourLieScore = 0;
    data.goodGuessScore = 0;
    data.rightAnswerScore = 0;

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
    let p = players[index]
    if (gameState === 'submitSuggestions'){
      data.rejoinAt = 'search-suggestions'
    } else if (gameState === 'round' || gameState === 'answers' || gameState=== 'votes'){
      if (questions[round].responses.length < players.length ){
        
        let response = findPlayerResponse(p)
        if (response) data.rejoinAt = 'waiting'
        else data.rejoinAt = 'text-answer-input'
      } else if (questions[round].votes.length < players.length){
        console.log('REJOINING AT COTES')
        let hasVoted = questions[round].votes.find(v => v.player.name === data.name)
        if (hasVoted) data.rejoinAt = 'waiting'
        else data.rejoinAt = 'vote'
      }
    } else if (gameState === 'end'){
      data.rejoinAt = 'end'
    } else {
      data.rejoinAt = 'waiting'
    }
    data.action = 'success-rejoining'
    data.rejoinData = data.rejoinAt === 'vote' ? questions[round].responses : false
    data.player = data.id
    socket.emit('success-rejoining', data)
  }

  function hostRoomGenerated(data){
    setRoom(data.short)
  }

  function onInstructionsComplete(){
    startSpeech('introduction', {}, () => {
      setGameState('submitSuggestions')
      socket.emit('submit-suggestions')
    })
    
  }

  function submittedSuggestion(data){
    console.log('DATA',data)
    let newQuestions = Object.assign([], questions)
    for (var i = 0; i < newQuestions.length; i++){
      if (newQuestions[i].q === data.q) return
    }

    newQuestions.push(data)
    setQuestions(newQuestions)
    if (newQuestions.length >= config.maxSuggestions){
      socket.emit('set-room-waiting')
      setGameState('round') 


      startSpeech('search-first-round', {}, () => {
        startSpeech('question', {question: questions[round].q, name: questions[round].player.name}, () => {
          sendAnswerInput()
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

  function random(comp){
    return comp > Math.random()
  }

  function checkAnswerMatch(data){
    let newQuestions = Object.assign([], questions)
    let foundMatch = false
    for (var i = 0; i < newQuestions[round].responses.length ; i++){
      if ( data.answer === newQuestions[round].responses[i].answer && newQuestions[round].responses.length < players.length){
        foundMatch = true
        newQuestions[round].responses[i].also.push(data)
        newQuestions = addOurLie(newQuestions, data.player.name)
      }
    }
    if (!foundMatch && newQuestions[round].responses.length < players.length){
       newQuestions[round].responses.push(data) 
    }
    return newQuestions
  }

  function submittedAnswer(data){
    data.answer = data.answer.trim()
    data.answer = data.answer.toLowerCase()
    data.also = []
    let newQuestions = checkAnswerMatch(data)
    if (newQuestions[round].responses.length === players.length){
      setGameState('round')
      setTimer(false)
      addCorrectAnswer(newQuestions)
    } else {
      setQuestions(newQuestions)
    }
  }

  function submitVote(data){
    let newQuestions = Object.assign([], questions)
    if (newQuestions[round].votes.length < players.length){
      newQuestions[round].votes.push(data)
      setQuestions(newQuestions)
    } else {
      setTimer(false)
      setGameState('round')
    }
  }

  function voteTimeout(){
    toRoom({
      action: 'set-waiting'
    })
    setGameState('round')
    setTimer(false)
    let newQuestions = Object.assign([], questions)
    while(newQuestions[round].votes.length < players.length){
      newQuestions[round].votes.push(false)
    }
    
    setQuestions(newQuestions)
  }

  function addOurLie(newQuestions, name){
    const answer = questions[round].a[newQuestions[round].responses.length + 1] ? 
      questions[round].a[newQuestions[round].responses.length].replace('uk', '').trim():
      fallbackLies[Math.floor(Math.random() * fallbackLies.length -1)]
     newQuestions[round].responses.push({
        answer: answer,
        votes: [],
        also:[],
        ourLie: true,
        falseName: name
      })
      return newQuestions 
  }

  function answerTimeout(){
    toRoom({
      action: 'set-waiting'
    })
    setGameState('round')
    setTimer(false)
    let newQuestions = Object.assign([], questions)
    while(newQuestions[round].responses.length < players.length){
      newQuestions = addOurLie(newQuestions, 'Bot')
    }
    addCorrectAnswer(newQuestions)
  }

  function shuffleResposnesAndSendVote(newQuestions){
        // newQuestions[round].responses = shuffle(newQuestions[round].responses)
        // for (var i = 0 ; i<newQuestions[round].responses.length; i++) {
        //   newQuestions[round].responses[i].index = i
        // }
        // console.log('responses', newQuestions[round])
        // setQuestions(newQuestions) 
        newQuestions[round].responses = shuffle(newQuestions[round].responses)
        for (var i = 0 ; i<newQuestions[round].responses.length; i++) {
          newQuestions[round].responses[i].index = i
        }
        setQuestions(newQuestions) 
        startSpeech('answers-in', {}, () => {
          console.log('SETTING VOTES')
           setGameState('votes')
            
        })
    
  }

  function sendVote(){
    
    startSpeech('cast-vote', {}, () => {
      setTimer('votes')
      toRoom({
        action: 'set-vote',
        options: questions[round].responses
      })
    })
  }



  function addCorrectAnswer(newQuestions){
    let foundMatch = false 
    let answer = questions[round].a[0]
    answer = answer.replace('uk', '').trim()

    for( var i = 0 ; i < newQuestions[round].responses.length; i++){
      if (newQuestions[round].responses[i].answer === answer){
        foundMatch = true

        newQuestions[round].responses[i].isTrue = true
        newQuestions = addOurLie(newQuestions, 'Bot')
      }
    }
    if (!foundMatch){
      newQuestions[round].responses.push({
      answer: answer,
      votes:[],
      isTrue: true
      })
    }
    
    shuffleResposnesAndSendVote(newQuestions)



   
    
    
  }




function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

  function sendAnswerInput(){
    setTimer('answers')
    setGameState('answers')
    socket.emit('send-answer-input')
  }




  function toPlayer(data){
    socket.emit('host-to-player', data)
  }

  function toRoom(data){
    socket.emit('host-to-room', data)
  }

  function calculateWhatIsNext(){
      console.log('NEXT ROUND', round)
      updateScores()
      if (round === questions.length-1 || round % 2 === 1){ 
        let key = round === questions.length-1 ? 'final-scores' : 'score-time'
        startSpeech(key, {}, () => {
          setGameState('scores')
        })  
        
      } else {
        startSpeech('search-next-round', {}, () => {
          nextRound()
        })
      }  
  }

  function nextRound(){
    const nextRoundIndex = round +1
        setRound(nextRoundIndex)
        startSpeech('question', {question: questions[nextRoundIndex].q, name: questions[nextRoundIndex].player.name}, () => {
          
          sendAnswerInput()
        })
  }

  function findPlayerResponse(player){
    let responses = questions[round].responses
    let response = responses.find(r => r.player && r.player.name === player.name)
    if (!response){
      for (var k =0; k < responses.length; k++){
        if (responses[k].also && responses[k].also.length){
          let isAlso = responses[k].also.find(r => r.player && r.player.name === player.name)
          if (isAlso){
            response = isAlso
          }
        }
      }
    }
    return response
  }

  function updateScores(){
    const multiplier = round < 2 ? 1 : round < 4 ? 2 : 3
    let newPlayers = Object.assign([], players)
    let responses = questions[round].responses
    let votes = questions[round].votes
    let correct = responses.find(r => r.isTrue)

    for (var i = 0; i < newPlayers.length; i++){
      const player = newPlayers[i]
      let vote = votes.find(r => r.player && r.player.name === player.name)
      let response = findPlayerResponse(player)
      if (response){
        for (var j = 0; j < votes.length; j++){
          if (votes[j].index === response.index){
            newPlayers[i].goodLieScore += (100 * multiplier)
          }
        }
        if (response.isTrue){
          newPlayers[i].rightAnswerScore += (500 * multiplier)
        }
      }
      if (vote){

        if (questions[round].responses[vote.index].ourLie ){
          newPlayers[i].ourLieScore += (-10 * multiplier) 
        }
        if (vote.index === correct.index){
          newPlayers[i].goodGuessScore += (200 * multiplier)
        }
      }
    }
    // for (var i = 0; i < responses.length; i++){
    //   if (responses[i].ourLie){

    //   }
    // }
    
    setPlayers(newPlayers)
  }

  function mergeRoundScore(){
    let newPlayers = Object.assign([], players)
    for (var i = 0; i < players.length; i++) {
      players[i].score += players[i].goodLieScore
      players[i].score += players[i].goodGuessScore
      players[i].score += players[i].rightAnswerScore
      players[i].score += players[i].ourLieScore
      players[i].goodLieScore = 0;
      players[i].ourLieScore = 0;
      players[i].goodGuessScore = 0;
      players[i].rightAnswerScore = 0;
    }
    
    setGameState('scores-updated')
    setPlayers(newPlayers)
  }

  function onRevealComplete(){
    calculateWhatIsNext()
  }

  function scoresComplete(){
    if (round === questions.length-1){
      console.log('END OF GAME')
    } else {
      setGameState('round')
      nextRound()
    }
  }

  function endOfGame(winner){
    startSpeech('end-of-game', {winner}, () => {
      setGameState('end')
      toRoom({
        action:'on-end'
      })
    })
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
          <Join game="search" playerColors={['#4b8cf5', '#ea4335','#fbbc05','#4b8cf5','#34a853','#ea4335']} textColors={['#4b8cf5', '#ea4335','#fbbc05','#4b8cf5','#34a853','#ea4335']}/>
        }
        {gameState === 'instructions' &&
          <Instructions onComplete={onInstructionsComplete} />
        }
        {gameState === 'submitSuggestions' &&
          <SubmitSuggestions colors={['#4b8cf5', '#ea4335','#fbbc05','#4b8cf5','#34a853','#ea4335']}questions={questions.length} limit={config.maxSuggestions} />
        }
        {(gameState === 'scores' || gameState === 'scores-updated' || gameState === 'end') &&
          <Scores 
            game="search"
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
        {(gameState === 'round' || gameState === 'votes' || gameState === 'answers') &&
           <Round
            colors={['#4b8cf5', '#ea4335','#fbbc05','#4b8cf5','#34a853','#ea4335']}
            questions={questions}
            round={round}
            timer={timer}
            gameState={gameState}
            onRevealComplete={onRevealComplete}
            answerTimeout={answerTimeout}
            voteTimeout={voteTimeout}
            question={questions[round]} 
            players={players} 
            backgroundColor={globalState.backgroundColor} 
            sendAnswerInput={sendAnswerInput}
            sendVote={sendVote}
          />
        }
      </View>
      {gameState=== 'end' &&
        <Confetti />
      }
      {gameState=== 'end' &&
        <End 
          colors={['#4b8cf5', '#ea4335','#fbbc05','#4b8cf5','#34a853','#ea4335']}
          questions={questions}/>
      }
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
