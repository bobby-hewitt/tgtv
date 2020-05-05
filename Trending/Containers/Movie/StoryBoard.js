import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import gs from '../../Styles'
import {Scale, Timer} from '../../Components/Global'

const StoryBoard = ({onStoryboardTimeout}) =>  {

 
  return (
    <Scale scaleTo={1} fillContainer>
      <Timer onComplete={onStoryboardTimeout} duration={10}/>
      <View style={[gs.row, {flex:1}]}>
        <View style={[gs.centeredContainer, {flex:1}]}>
          <Text style={[gs.subtitle, gs.bold]}>Time to storyboard your movie.</Text>
          
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
});

export default StoryBoard;
