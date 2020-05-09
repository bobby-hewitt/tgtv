
import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Animated,
  Text,
  Dimensions,
  TVEventHandler,
  FlatList,
  TVMenuControl,
  BackHandler,
} from 'react-native';
import {
  CTA, 
  Background, 
} from '../Components'
import Lint from '../Helpers/Linting'
import SearchGameController from './Search/SearchGameController'
import SongSocket from './Song/SongSocket'
import MovieGameController from './Movie/MovieGameController'
import LandingPage from './LandingPage'
import globalContext from '../Context/global'
import games from '../Data/games'

import { playBackgroundMusic, stopRemoteSound, stopBackgroundMusic, loadSounds } from '../Helpers/Sound'
Lint()



 TVMenuControl.enableTVMenuKey()

const AppController = () =>  {

  
  const globalState= useContext(globalContext)
  useEffect(() => {

    loadSounds().then(() => {
       // playBackgroundMusic()

    })

    
    return () => {
       stopBackgroundMusic()
       stopRemoteSound()
    }
  },[])

  useEffect(() => {
    if (globalState.activeGame){
      
    } else {  
      stopRemoteSound()
      playBackgroundMusic()
    }
  },[globalState.activeGame])

  useEffect(() => {

    if (!globalState.activeGame){

       TVMenuControl.disableTVMenuKey()
    } else {
       TVMenuControl.enableTVMenuKey()
    }
    BackHandler.addEventListener('hardwareBackPress', handleBack)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack)
    }
  },[globalState])

  function handleBack(){
    
      if (globalState.activeGame){
        globalState.setActiveGame(false)
        globalState.setBackgroundPosition('right')
        TVMenuControl.disableTVMenuKey()
        return true
      } else {
        console.log('HERE')
        return false
      }
    
  }


  return (
    <View style={[styles.container]}> 
    <Background games={games}color={globalState.backgroundColor} backgroundPosition={globalState.backgroundPosition}activeGame={globalState.activeGame}/>
     <SafeAreaView style={{position:'relative'}}>
        <LandingPage />
        {globalState.activeGame === 'search' &&
          <SearchGameController stopBackgroundMusic={stopBackgroundMusic}/>
        }
        {globalState.activeGame === 'song' &&
          <SongSocket stopBackgroundMusic={stopBackgroundMusic}/>
        }
        {globalState.activeGame === 'movie' &&
          <MovieGameController stopBackgroundMusic={stopBackgroundMusic}/>
        }
      </SafeAreaView>
    </View>
  );
};







const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  
});

export default AppController;
