import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Animated,
  Text,
  Dimensions,
  TVEventHandler,
  FlatList,
} from 'react-native';
import {
  CTA, 
  Background, 
  Screen
} from '../Components'
import { startSpeech } from '../Helpers/TTS.js'
import globalContext from '../Context/global'

const actions = [
  {
    "label": "Webheads",
    backgroundColor: '#4285F4',
    value: 'search'
  },
  {
    "label": "Giffty",
    backgroundColor: '#04011f',
    value: 'movie'
  },

  {
    "label": "Spot it DJ",
    backgroundColor: '#1DB954',
    value:'song'

  },
  
]





const LandingPage = () =>  {
  
  const globalState= useContext(globalContext)
  const [activeIndex, setActiveIndex] = useState(0) 
  const marginTop = useRef(new Animated.Value(0)).current
  const marginRight = useRef(new Animated.Value(0)).current
  const marginLeft = useRef(new Animated.Value(0)).current

  const onCTAFocus = (action, params) => {

    setActiveIndex(params.index)
    globalState.setBackgroundColor(params.color)
  }

  const onCTAPress = (value) => {
    globalState.setActiveGame(value)
  } 

  useEffect(() => {
    if (globalState.activeGame){
      Animated.parallel([
       Animated.timing(marginRight, {
        toValue: 3500,
         
        duration: 500,    
      }),
      Animated.timing(marginLeft, {
        toValue: -1250,
        duration: 500,    
      })

    ]).start()
    } else {
      Animated.parallel([
       Animated.timing(marginRight, {
        toValue: 0,
         
        duration: 500,    
      }),
      Animated.timing(marginLeft, {
        toValue: 0,
         
        duration: 500,    
      })

    ]).start()
    }
  }, [globalState.activeGame])
  
  

  useEffect(() => {
    Animated.timing(marginTop, {
      toValue: Dimensions.get('window').height * activeIndex - (Dimensions.get('window').height * 2) ,

      duration: 250,    
    }).start();
  }, [activeIndex]);

  
 
  return (
    
        <View style={styles.row}>
          <Animated.View style={[styles.actionsContainer, {transform: [{translateX: marginLeft}]}]}>
            {actions.map((item, i) => {
              return(
                <CTA 
                  color={globalState.backgroundColor}
                  {...item} 
                  onPress={onCTAPress}
                  onFocus={onCTAFocus}    
                  onFocusParams={{
                    color:item.backgroundColor,
                    index: i
                  }}
                  index={i} 
                  key={i}/>
              )
            })}
          </Animated.View>
          <Animated.View style={[styles.rightContainer, {transform: [{translateX: marginRight}]}]}>
          <Animated.View style={[{flexDirection:'column',marginTop: marginTop}]}>
           <View style={styles.previewContainer}>
            <Screen color={globalState.backgroundColor}/> 
           </View>
            <View style={styles.previewContainer}>
            <Screen color={globalState.backgroundColor}/> 
           </View>
            <View style={styles.previewContainer}>
            <Screen color={globalState.backgroundColor}/> 
           </View>
          </Animated.View>
          </Animated.View>
        </View> 
    
  );

  
};







const styles = StyleSheet.create({
  container: {
    
  },
  previewContainer:{

    height:Dimensions.get('window').height,
  },
  row:{
    flexDirection:'row',
   
  },
  rightContainer:{
    flex:1,
    paddingTop:220,
    alignItems:'flex-end',
    
    height:Dimensions.get('window').height,
  },
  actionsContainer:{
    flex:0.5,
    height:Dimensions.get('window').height * 0.9,
    justifyContent:'center',
  }
});

export default LandingPage;
