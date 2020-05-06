import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import gs from '../../Styles'
import {
  Scale,
  Timer
} from '../../Components/Global'
const Headshots = ({players, onHeadshotsTimeout}) =>  {

 
  return (
    <View style={[gs.row, styles.playersContainer]}>
    <Timer onComplete={onHeadshotsTimeout} duration={45}/>
        {players && players.map((item, i) => {
          return(
            <View key={i} style={[styles.playerContainer]}>
              
              
               
                  
                 
                  <Scale scaleTo={item.headshot ? 1 : 0} fillContainer>
                  <View style={[styles.imageContainer, {transform:[{rotate:i % 2 === 0 ? -0.05 : 0.05}]}]}>
                  <Image style={{width:300, height:300, }}source={{uri:item.headshot}} />
                  </View>
                  </Scale>
                
                  
                
              
              
              <Text style={[gs.bodycopy, gs.bold, {textAlign:'center'}]}>{item.name}</Text>
            </View>
          )
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  playersContainer:{
    flex:1, 
    flexWrap:'wrap', 
    height:'100%', 
    
    alignItems:'center',
    justifyContent:'center',
  },
  playerContainer: {
    maxHeight:'40%',
    
    alignItems:'center',
    justifyContent:'center',
    minWidth:500,
    marginVertical:40,
  },
  imageContainer:{
    borderWidth:10,
    borderColor:'#000',
    backgroundColor:'#fff',
    width:300,
    height:300, 
    borderRadius:10,
    
    marginBottom:20,

  },

});

export default Headshots;
