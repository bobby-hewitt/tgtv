import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Image,
  Text,
} from 'react-native';
import gs from '../../Styles'

const RoomCode = ({room, scale, guruImage, dominantColor, recessiveColor}) =>  {
  return (
      
        <View style={styles.innerContainer}>
      <Animated.View style={[styles.container]}>   
      <React.Fragment>
        <Text style={[gs.subtitle, {color:dominantColor || "#ffffff"}]}>On your phone, go to</Text>
        <Text style={[gs.title, gs.bold, gs.spaceBelow]}>Trending.Guru</Text>
        
        <Text style={[gs.subtitle, gs.spaceAbove, {color:dominantColor || "#ffffff"}]}>Enter room code:</Text>
        <Text style={[gs.title,  gs.bold]}>{room}</Text>
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
  }
});

export default RoomCode;
