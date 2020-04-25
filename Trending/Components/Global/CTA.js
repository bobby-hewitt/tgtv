import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

const CTA = (props) =>  {
  const [ hasFocus, setHasFocus] = useState(props.index===0)
  const onFocus = () => {
    setHasFocus(true)
    if (props.onFocus){
      props.onFocus(props.onFocusAction, props.onFocusParams)
    }
  }
  return (
<TouchableHighlight
          style={[styles.outerContainer, {backgroundColor: props.color}]}
            hasTVPreferredFocus={props.index === 0}
            onFocus={() => onFocus()}
            onPress={() => {props.onPress(props.value)}}
            onBlur={() => setHasFocus(false)}>
    
      
        <View style={[styles.container, {opacity: hasFocus ? 1 : 0.5}]}>  
          <View style={[styles.underline, {backgroundColor:'33' }]}>
        </View>
        <View style={[styles.underlineController]} >
          <Text style={styles.text}>{props.label}</Text>      
        </View>    
      </View>
      
  
  </TouchableHighlight>
  
  );
};

const styles = StyleSheet.create({
 outerContainer:{
  overflow:'hidden',
    height:120,
    width:554,
    marginVertical:28,
     borderRadius:60,

 },
 underlineController:{
    overflow:'hidden',
    height:120,
    marginTop:-10,
    paddingTop:10,
    marginLeft:-10,
    paddingLeft:10,
    width:574,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:14,
    borderRadius:1000,
    backgroundColor:'white'
 },
 underline:{
  height:60,
  position:'absolute',
  bottom:0,
  left:0,
  right:0,
  
  backgroundColor:'#000000ff'
 },
  container: {
    height:120,
    width:554,
    borderRadius:60,
    
    backgroundColor:'white'
  },
  text:{
    color:'#101010',
    fontSize:65,
    
    fontWeight:'bold',
  }
});

export default CTA;
