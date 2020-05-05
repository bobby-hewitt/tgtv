import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import gs from '../../Styles'
import Scale from '../../Components/Global/Scale'
const SubmitSuggestions = ({questions, limit}) =>  {

 
  return (
    <Scale scaleTo={1} fillContainer>
      <View style={[gs.row, {flex:1}]}>
        <View style={[gs.centeredContainer, {flex:1}]}>
          <Text style={[gs.subtitle, gs.bold]}>Submit your suggestions</Text>
          <View style={[gs.row] } >
          <Text style={[gs.title, gs.bold]}>{questions}</Text>
          <Text style={[gs.title, gs.bold, gs.spacingLeft, gs.spacingRight]}>/</Text>
          <Text style={[gs.title, gs.bold]}>{limit}</Text>
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
