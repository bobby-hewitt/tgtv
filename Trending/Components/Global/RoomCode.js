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

const RoomCode = ({room, scale, guruImage}) =>  {
  return (
      
        <View style={styles.innerContainer}>
      <Animated.View style={[styles.container, {transform: [{scale}]}]}>   
      <React.Fragment>
        <Text style={[gs.subtitle]}>On your phone, go to</Text>
        <Text style={[gs.subtitle, gs.bold, gs.spaceBelow]}>Trending.Guru</Text>
        <Image source={guruImage ? guruImage : require('../../assets/images/fullGuru.png')} style={styles.fullGuru}/>
        <Text style={[gs.subtitle, gs.spaceAbove]}>Enter room code:</Text>
        <Text style={[gs.subtitle,  gs.bold]}>{room}</Text>
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
