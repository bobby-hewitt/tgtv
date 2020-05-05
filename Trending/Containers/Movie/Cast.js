import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import gs from '../../Styles'
import { Scale, Timer} from '../../Components/Global'
const Cast = ({onCastTimeout}) =>  {

 
  return (
    <Scale scaleTo={1} fillContainer>
      <Timer onComplete={onCastTimeout} duration={5}/>

      <View style={[gs.row, {flex:1}]}>
        <View style={[gs.centeredContainer, {flex:1}]}>
          <Text style={[gs.subtitle, gs.bold]}>Cast the lead role and then give their character a name</Text>
          
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

export default Cast;
