
import React, {useRef, useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
} from 'react-native';

import gs from '../../Styles'

import {ScoresPlayer, Scale } from '../../Components/Global'

const positions = {
	"1": [
		{
			xTo: 0,
			yTo: 0,
			scaleTo:1.5,
		}
	],
	"2": [
		{
			xTo: 0,
			yTo: -200,
			scaleTo:1.5,
		},
		{
			xTo: 0,
			yTo: 200,
			scaleTo: 1,
		}
	],
	"3": [
		{
			xTo: 0,
			yTo: -200,
			scaleTo:1.5,
		},
		{
			xTo: -300,
			yTo: 160,
			scaleTo: 1.1,
		},
		{
			xTo: 300,
			yTo: 210,
			scaleTo: 0.9,
		}
	],
	"4": [
		{
			xTo: -420,
			yTo: -200,
			scaleTo:1.5,
		},
		{
			xTo: 420,
			yTo: -200,
			scaleTo:1.2,
		},
		{
			xTo: -250,
			yTo: 210,
			scaleTo: 1.05,
		},
		{
			xTo: 250,
			yTo: 250,
			scaleTo: 0.9,
		}
	],
	"5": [
		{
			xTo: -360,
			yTo: -200,
			scaleTo:1.5,
		},
		{
			xTo: 360,
			yTo: -200,
			scaleTo:1.2,
		},
		{
			xTo: -510,
			yTo: 230,
			scaleTo: 1.05,
		},
		{
			xTo: 10,
			yTo: 230,
			scaleTo: 0.9,
		},
		{
			xTo: 460,
			yTo: 230,
			scaleTo: 0.8,
		}
	],
	"6": [
		{
			xTo: -0,
			yTo: -270,
			scaleTo:1.31,
		},
		{
			xTo: -230,
			yTo: 30,
			scaleTo:1,
		},
		{
			xTo: 260,
			yTo: 50,
			scaleTo:0.85,
		},
		{
			xTo: -380,
			yTo: 300,
			scaleTo: 0.71,
		},
		{
			xTo: 0,
			yTo: 300,
			scaleTo: 0.71,
		},
		{
			xTo: 380,
			yTo: 300,
			scaleTo: 0.7,
		}

	],


}


const Scores = ({players, mergeRoundScore, game, isEnd, scoresComplete, backgroundColor, endOfGame, hasFinished, gameState}) =>  {
	const [orderedPlayers, setOrderedPlayers] = useState(sortPlayers(true)) 
	const [scale, setScale] = useState(1)
	

	function sortPlayers(isFirstPass){
		
		let newPlayers = Object.assign([], players)

		newPlayers = newPlayers.sort((a,b) => b.score - a.score)
		if (isFirstPass){
			return newPlayers
		} else {
			setOrderedPlayers(newPlayers)
		}
	}

	useEffect(() => {
		sortPlayers()
	}, [
	players[0].score,
	players[1] ? players[1].score : false,
	players[2] ? players[2].score : false,
	players[3] ? players[3].score : false,
	players[4] ? players[4].score : false,
	players[5] ? players[5].score : false
	])

	useEffect(() => {
		let timeout2;
		const timeout = setTimeout(( ) => {
			mergeRoundScore()
			timeout2 = setTimeout(() => {
				if (isEnd){
					endOfGame()
				} else {
					setScale(0)
				}
			},3000)
		}, 3000)
		return () => {
			clearTimeout(timeout)
			clearTimeout(timeout2)
		}
	}, [])





	
  return (
  	<Scale duration={500} scaleTo={scale} fillContainer animationComplete={ (i) => {
  		if (i === 0) scoresComplete()
  	}}>
      <View style={{flex:1, justifyContent:'center'}}> 
       		{players.map((player, i) => {
       				let index = orderedPlayers.findIndex(op => player.name === op.name)
       				let position = (hasFinished && index === 0) ? positions["2"][0] : positions[players.length][index]
	       			return(
	       				<Scale key={i} duration={500} scaleTo={(!hasFinished || (hasFinished && index === 0)) ? 1 : 0}>
	       					<ScoresPlayer game={game} gameState={gameState} backgroundColor={backgroundColor} player={player}  {...position} position={index + 1}/>
	       				</Scale>
	       			)
       			
       		})}
      </View>
      </Scale>
  );
};

const styles = StyleSheet.create({
  
});

export default Scores;
