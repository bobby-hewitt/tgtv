import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import gs from '../../Styles'

const pageHeight= Dimensions.get('window').width  -  (Dimensions.get('window').width /10)

const Overview = ({name, title, cast, storyboard, score}) =>  {
  
  
  return (
    
    <View style={[styles.container]}>
        <Text style={[gs.subtitle, gs.bold, {textAlign:'center', width:'100%'}]}>{title}</Text>
        <Text style={[gs.bodycopy, gs.bold, {fontWeight:'normal', fontSize:40, marginTop:12, textAlign:'center', width:'100%'} ]}>Directed by <Text style={{fontWeight: '900'}}>{name}</Text>, Starring <Text style={{fontWeight: '900'}}>{cast.name}</Text> as {cast.charName}</Text>
        <Text style={[gs.bodycopy, gs.bold, {fontWeight:'900', fontSize:40, marginTop:40, textAlign:'center', width:'100%'} ]}>Average rating: {score}</Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    
    alignItems:'flex-start',
    overflow:'hidden',
    padding:20,
    
    height: pageHeight * 0.5,
    
  },
  
});

export default Overview;
