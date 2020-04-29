import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

const Screen = (props) =>  {
  return (
    <View style={[styles.container, {transform: [{rotate: 0.03}]}]}>
      {props.children}
      <View style={[styles.rightOutline, {backgroundColor: props.color}]} />
      <View style={[styles.leftOutline, {backgroundColor: props.color}]} />
      <View style={[styles.topOutline, {backgroundColor: props.color}]} />
      <View style={[styles.bottomOutline, {backgroundColor: props.color, zIndex:210}]} />
      <View style={[styles.rightJaunt, { borderColor: props.color }]} />
      <View style={[styles.leftJaunt, { borderColor: props.color  }]} />
      <View style={[styles.topJaunt, { borderColor: props.color }]} />
      <View style={[{ borderColor: props.color, zIndex:210 }, styles.bottomJaunt]} />

    </View>   
  );
};

const styles = StyleSheet.create({
 container:{
  width:979,
  height:550,
  backgroundColor:'white',
  alignItems:'center',
  justifyContent:'center',
  shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 70,
 
 },
 bottomOutline:{
  height:20,
  width:979,
  position:'absolute',
  backgroundColor:'#040125',
  bottom:0,
  left:0,
  right:0,

 },
 topOutline:{
  height:20,
  width:979,
  position:'absolute',
  backgroundColor:'#040125',
  top:0,
  left:0,
  right:0,
 },
 leftOutline:{
  height:550,
  width:20,
  position:'absolute',
  backgroundColor:'#040125',
  top:0,
  left:0,
  bottom:0,
 },
 rightOutline:{
   height:550,
   width:20,
   position:'absolute',
   backgroundColor:'#040125',
  top:0,
  bottom:0,
  right:0,

 },
 bottomJaunt:{
  borderRightWidth:979,
  borderTopWidth:10,
  // borderColor:'#040125',
  borderTopColor:'transparent',
  position:'absolute',
  bottom:20,
  right:0,
  
 },
 topJaunt:{
  position:'absolute',
  top:20,
  left:0,
  width:0,
  height:0,
  borderLeftWidth:979,
  borderBottomWidth:10,
  // borderColor:'#040125',
  borderBottomColor:'transparent',
 },
 leftJaunt:{
  borderRightWidth:15,
  borderBottomWidth:550,
  // borderColor:'#040125',
  borderRightColor:'transparent',
  position:'absolute',
  top:0,
  left:20,
  width:20,
  height:550,
 },
 rightJaunt:{
  borderBottomWidth:550,
  borderRightWidth:15,
  // borderColor:'#040125',
  borderBottomColor:'transparent',
  position:'absolute',
  bottom:0,
  right:20,
  

 }

});

export default Screen;
