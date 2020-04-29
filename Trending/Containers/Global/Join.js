import React, {useContext, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
} from 'react-native';
import gs from '../../Styles'
import Context from '../../Context/search'
import globalContext from '../../Context/global'
import { Players, RoomCode } from '../../Components/Global'

const Join = ({guruImage}) =>  {
  
  const { players, config, room , gameState } = useContext(Context)
  const { backgroundColor} = useContext(globalContext)
  const scale = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (room !== '----' && gameState === 'join'){
       Animated.timing(scale, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,    
      }).start()
    } else if (gameState === 'instructions'){
       Animated.timing(scale, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,    
      }).start()
    }
  }, [room, gameState])
  return (
    <React.Fragment>
     
      <Players players={players} {...config} scale={scale} backgroundColor={backgroundColor}/> 
      <RoomCode guruImage={guruImage} room={room}  scale={scale}/> 
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  
});

export default Join
;
