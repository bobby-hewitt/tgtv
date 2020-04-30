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
import { Players, RoomCode, Scale} from '../../Components/Global'

const Join = ({guruImage, colors, standout, dominantColor, recessiveColor}) =>  {
  
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
      
      <View style={{    
    flex:0.42,
    
  }}>
      <Scale  fillContainer  scaleTo={(room !== '----' && gameState === 'join') ? 1 : 0 }>
      <Players colors={colors} players={players} {...config} backgroundColor={backgroundColor}/> 
      </Scale>
      </View>

      
      <Scale fillContainer center scaleTo={(room !== '----' && gameState === 'join') ? 1 : 0 }>
      <RoomCode dominantColor={dominantColor} recessiveColor={recessiveColor}guruImage={guruImage} room={room} /> 
      </Scale>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  
});

export default Join
;
