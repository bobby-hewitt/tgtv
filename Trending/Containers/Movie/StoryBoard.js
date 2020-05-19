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
    <View>
    <Timer onComplete={onStoryboardTimeout} duration={90}/>
    <Scale scaleTo={1} fillContainer>
      
      <View style={[gs.row, {flex:1}]}>
        <View style={[gs.centeredContainer, {flex:1}]}>
          <Text style={[gs.subtitle, gs.bold]}>Time to storyboard your movie.</Text>
          
          </View>
        </View>
      
    </Scale>
    </View>
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
