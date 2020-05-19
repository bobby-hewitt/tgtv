import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import { Scale } from '../Global'
import gs from '../../Styles'

const Score = ({name, title, cast, storyboard, color, backgroundColor, score}) =>  {
  
  
  return (
    
      <View style={[styles.container]}>
          <Text style={[gs.bodycopy, gs.bold, {color:color ? color : '#fff'}]}>+ {score}</Text>    
      </View>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex:300,
    transform:[
      {translateX:200},
      {translateY:-350},
    ],
    position:'absolute',
    bottom:-300,
    right:0,
    flex:1,
    minWidth:200,
    height:60,
    borderRadius:30,
    // minHeight:200,
  },
  
});

export default Score;
