import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import gs from '../../Styles'

const Headshots = ({players}) =>  {

 
  return (
    <View style={[gs.row, gs.centeredContainer, {flex:1, flexWrap:'wrap'}]}>
        {players && players.map((item, i) => {
          return(
            <View key={i} style={[styles.playerContainer]}>
              <View style={[styles.imageContainer, {backgroundColor: item.headshot ? '#fff' : 'transparent'}]}>
                {item.headshot && 
                  <Image style={{width:300, height:300}}source={{uri:item.headshot}} />
                }
              </View>
              <Text style={[gs.bodycopy, gs.bold]}>{item.name}</Text>
            </View>
          )
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    minWidth:500,
    marginVertical:40,
  },
  imageContainer:{
    width:300,
    height:300, 
    borderRadius:200,
    marginBottom:20,
  }
});

export default Headshots;
