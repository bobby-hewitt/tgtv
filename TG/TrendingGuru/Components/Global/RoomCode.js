import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
} from 'react-native';
import gs from '../../Styles'

const RoomCode = ({room, scale}) =>  {
  return (
      <Animated.View style={[styles.container, {transform: [{scale}]}]}> 
        <View style={styles.innerContainer}>
        
        <Text style={[gs.title, gs.bold, gs.spaceBelow]}>Trending.Guru</Text>
        <Text style={[gs.subtitle, gs.spaceAbove]}>Room code:</Text>
        <Text style={[gs.title, gs.bold]}>{room}</Text>
        </View>
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:Dimensions.get('window').width - (Dimensions.get('window').width /10),
    alignItems:'center',
    justifyContent:'center'
  },
  innerContainer: {
    flex:1,
    paddingLeft:Dimensions.get('window').width /20,
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
  }
});

export default RoomCode;
