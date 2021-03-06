import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Image,
  Text,
} from 'react-native';
import AnimatedText from './AnimatedText'
import gs from '../../Styles'

const GameHeader = ({game, colors}) => {
  return(
    <View style={styles.gameHeaderContainer}>
      {game === 'song' && 
        <Image style={styles.image}source={require('../../assets/images/record.png')} />
      }
      
  
    </View>
  )
}

const RoomCode = ({room, scale, game, guruImage, darkTheme, dominantColor, recessiveColor, colors}) =>  {


  
  return (
      
        <View style={styles.innerContainer}>
      <Animated.View style={[styles.container]}> 
      <GameHeader colors={colors} game={game}/>  
      <React.Fragment>
        <Text style={[gs.subtitle, {color:darkTheme ? '#000' : "#fff"}]}>On your phone, go to</Text>
        <AnimatedText text="Trending.Guru" delay={2000} colors={colors} isAnimated style={[gs.title, gs.bold, gs.spaceBelow, {fontWeight:'800',color:darkTheme ? '#000' : "#fff"}]}/>
        
        <Text style={[gs.subtitle, gs.spaceAbove, {color:darkTheme ? '#000' : "#fff"}]}>Enter room code:</Text>
        <AnimatedText text={room} colors={colors} style={[gs.title, gs.bold, gs.spaceBelow, {fontWeight:'800',color:darkTheme ? '#000' : "#fff"}]}/>
        </React.Fragment>
      </Animated.View>
        </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,

    // width:Dimensions.get('window').width - (Dimensions.get('window').width /10),
    alignItems:'center',
    justifyContent:'center'
  },
  fullGuru:{
    shadowColor: '#fff',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    width:140,
    height:174,
  },

  innerContainer: {
    flex:1,
    paddingLeft:Dimensions.get('window').width /20 + 30,
    alignItems:'center',
    justifyContent:'center' 
  },
  link:{
    color:'#fff',
    fontSize:80,
  },
  roomCode:{
    fontSize:200,
    color:'#ffffff',
    fontWeight:'bold'
  },
  gameHeaderContainer:{
      shadowColor: '#fff',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius:50,
      width:'100%',
      alignItems:'center',
      justifyContent:'center'
    },
    image:{
      // marginBottom:-100,
      width:250,
      height:250
    }
});

export default RoomCode;
