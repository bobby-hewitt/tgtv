import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import gs from '../../Styles'

const Instructions = ({onComplete}) =>  {

  useEffect(() => {
    onComplete()
    return () => {

    }
  }, [])
  return (
      <View>
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

export default Instructions;
