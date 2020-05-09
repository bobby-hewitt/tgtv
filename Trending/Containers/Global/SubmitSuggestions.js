import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import gs from '../../Styles'
import {Scale, AnimatedText} from '../../Components/Global'
const SubmitSuggestions = ({questions, limit, colors, darkTheme}) =>  {

 
  return (
    <Scale scaleTo={1} fillContainer>
      <View style={[gs.row, {flex:1}]}>
        <View style={[gs.centeredContainer, {flex:1}]}>
          <AnimatedText style={[gs.title, gs.bold, {color:darkTheme ? '#000' : '#fff', fontWeight: '800'}]} text="Webheads"isAnimated colors={colors} />
          <Text style={[gs.subtitle, gs.bold, {color:darkTheme ? '#000' : '#fff',marginTop:0, marginBottom:120}]}>Submit your suggestions</Text>
          <View style={[gs.row] } >
          <AnimatedText style={[gs.title, gs.bold, {color:darkTheme ? '#000' : '#fff', fontWeight: '800'}]} text={`${questions} / ${limit}`} colors={colors} />
          
          
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
});

export default SubmitSuggestions;
