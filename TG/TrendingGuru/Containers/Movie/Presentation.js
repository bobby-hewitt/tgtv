import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import { Screen, Scale } from '../../Components/Global'
import gs from '../../Styles'

const Presentation = ({players, backgroundColor, presentationIndex, presentationKey}) =>  {
  const player = players[presentationIndex]
  const cast = players.find(p => player && player.cast.name === p.name)
  return (
    
    <View style={[gs.row, gs.centeredContainer, styles.container]}>
        <Scale scaleTo={1.25}>
          <Screen color={backgroundColor}>
            {(presentationKey.key === 'storyboard') && 
              <Scale scaleTo={1}>
               <Image style={{width:500, height:500}}source={{uri:player.storyboard[presentationKey.index]}} />
              </Scale>
            }
            {(presentationKey.key === 'title') && 
              <Scale scaleTo={1}>
                <Text style={[gs.subtitle, gs.bold, {color:'#000'}]}>{player.title}</Text>
              </Scale>
            }
            {(cast && presentationKey.key === 'cast' && presentationKey.index === 'charName') && 
              <Scale scaleTo={1}>
                <Text style={[gs.bodycopy, gs.bold, {color:'#000', textAlign:'center'}]}>Title character:</Text>
                <Text style={[gs.subtitle, gs.bold, {color:'#000', textAlign:'center'}]}>{player.cast.charName}</Text>
              </Scale>
            }
            {(cast && presentationKey.key === 'cast' && presentationKey.index === 'star') && 
              <Scale center scaleTo={1}>
                <Text style={[gs.subtitle, gs.bold, {color:'#000', textAlign:'center'}]}>Starring</Text>
                <Image style={{width:250, height:250, margin:'auto'}}source={{uri:cast.headshot}} />
                <Text style={[gs.subtitle, gs.bold, {color:'#000'}]}>{cast.name}</Text>
              </Scale>
            }
          </Screen>
        </Scale>

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    minWidth:500,
    marginVertical:40
  },
  imageContainer:{
    width:300,
    height:300, 
    borderRadius:200,
    marginBottom:20,
  }
});

export default Presentation;
