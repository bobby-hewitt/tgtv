import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import gs from '../../Styles'
import Scale from '../../Components/Global/Scale'
const SubmitSongSuggestions = ({questions, maxSuggestions, limit}) =>  {
    const questionsPlaceholder = createArr()
    function createArr(){
      let arr = []
      for(var i = 0; i < maxSuggestions; i++){
        arr.push(true)
      }
      return arr
    }
 
  return (
    <Scale scaleTo={1} fillContainer>
      <View style={[gs.row, {flex:1}]}>
        <View style={[gs.centeredContainer, {flex:1}]}>
          <Text style={[gs.subtitle, gs.bold]}>Choose some playlists</Text>
          <View style={[gs.row, {marginTop:60}] } >
            {questionsPlaceholder && questionsPlaceholder.map((item, i) => {
              return(
              <View key={i} style={[styles.submission, styles.placeholder]}>
                {questions[i] &&
                  <Scale fillContainer scaleTo={1}>
                  <Image  source={{uri:questions[i].image}} style={[styles.submission, styles.image]}/>
                  </Scale>
                }
              </View>
              )
              
              
              
            })}
          </View>
        </View>
      </View>
    </Scale>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:Dimensions.get('window').width - (Dimensions.get('window').width /10),
    alignItems:'center',
    justifyContent:'center'
  },
  placeholder:{
    margin:20,
    width:300,
    height:300,
    borderWidth:5,
    borderStyle:'dashed',
    borderColor:'#fff',
    borderRadius:20,
    overflow:'hidden',
    padding:0,
  },
  image:{
    borderRadius:20,
    margin:-15,
     width:300,
     height:300,
  },

});

export default SubmitSongSuggestions;
