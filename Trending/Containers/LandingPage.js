import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Animated,
  Text,
  Dimensions,
  Easing,
  TVEventHandler,
  Image,
  FlatList,
} from 'react-native';
import {
  CTA, 
  Background, 
  Screen,
  Scale
} from '../Components'
import { startSpeech } from '../Helpers/TTS.js'
import globalContext from '../Context/global'
import gs from '../Styles'
import actions from '../Data/games'





const LandingPage = () =>  {
  
  const globalState= useContext(globalContext)
  const [activeIndex, setActiveIndex] = useState(0) 
  const marginTop = useRef(new Animated.Value(0)).current
  const rotateXValue = useRef(new Animated.Value(0)).current
   const rotateZValue = useRef(new Animated.Value(0)).current
  const marginRight = useRef(new Animated.Value(0)).current
  const marginLeft = useRef(new Animated.Value(0)).current

  const onCTAFocus = (action, params) => {

    setActiveIndex(params.index)
    globalState.setBackgroundColor(params.color)
  }

  const onCTAPress = (value) => {
    globalState.setBackgroundSpin(globalState.backgroundSpin + 1)
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
    Animated.sequence([
      Animated.timing(marginTop, {
        toValue: -activeIndex * 550 ,
        useNativeDriver:true,
        
        duration: 400,    
      }),
      Animated.timing(rotateXValue, {
        toValue: actions[activeIndex].armRotateX ,
        useNativeDriver:true,
        easing: Easing.bounce,
        duration: 1000,    
      }),
      // Animated.timing(rotateZValue, {
      //   toValue: actions[activeIndex].armRotateZ ,
      //   useNativeDriver:true,
      //   easing: Easing.elastic(-1),
      //   duration: 400,    
      // }),

    ]).start();
  }, [activeIndex]);

  const rotateX = rotateXValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })
  const rotateZ = rotateZValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })
 
  return (
    
        <View style={styles.row}>
          <Animated.View style={[styles.actionsContainer, {transform: [{translateX: marginLeft}]}]}>
            <View style={{width:'100%', alignItems:'center'}}>
            
            </View>
            
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
          
           <View style={styles.previewContainer}>
            <Screen color={globalState.backgroundColor}>
            <View style={{width:979, height:550, overflow:'hidden'}}>
              <Animated.View  style={[styles.screenInnerContainer, {transform:[{translateY: marginTop}]}]}>
                {actions.map((item, i) => {
                return(
                  <View key={i} >
                    <Image source={item.backgroundImage} style={styles.backgroundImage} />
                  </View>
                )
              })}
              </Animated.View>
              <View style={styles.overlay} />
              </View>
              <Animated.Image source={require('../assets/images/home/arm.png')} style={[styles.armImage, {transform: [{rotateX},{rotateZ: rotateZ}]}]} />
            <Image source={require('../assets/images/home/guru.png')} style={styles.guruImage} />
            <View style={styles.magnifyingGlass} >
            <Scale fillContainer duration={actions[activeIndex].value === 'search' ? 600 : 100} scaleFrom={0.5} scaleTo={actions[activeIndex].value === 'search' ? 1 : 0}>
              <Image source={require('../assets/images/home/magnifyingGlass3.png')} />
            </Scale>
           

            </View>
            </Screen> 
           </View>
           <View style={styles.overview}>
          <Text style={[gs.bodycopy, {textAlign:'left'}]}>{actions[activeIndex].description} <Text style={[gs.bodycopy, gs.bold, {textAlign:'left'}]}>{actions[activeIndex].players} players</Text></Text>
          
           </View>
          
          </Animated.View>

        </View> 
    
  );

  
};







const styles = StyleSheet.create({
  screenInnerContainer:{
    width:3000,
    height:550,
    flexDirection:'column',
    


  },
  overview:{
    // backgroundColor:"red",

    marginLeft:100,
    flex:1,
    alignItems:'flex-start',
    justifyContent:'flex-end',
    
    bottom:Dimensions.get('window').height/7,
  },
 
  armImage:{
    position:'absolute',
    bottom:80,
    left:600,
    zIndex:100,
  },
   guruImage:{
    position:'absolute',
    bottom:0,
    left:0,
    zIndex:200,
  },
   magnifyingGlass:{
    position:'absolute',
    bottom:305,
    left:335,
    zIndex:500,
  }, 
  backgroundImage:{

    width:979,
    height:550,
  },
  container: {
    
  },
  previewContainer:{

    // height:Dimensions.get('window').height,
  },
  row:{
    flexDirection:'row',
   
  },
  logo:{
    marginLeft:-60,
    width:600,
    height:170,
    marginBottom:40,
    marginTop:-40,

  },
  rightContainer:{
    flex:1,
    paddingTop:220,
    alignItems:'flex-end',
    
    height:Dimensions.get('window').height,
  },
  overlay:{
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
    backgroundColor:'rgba(0,0,0,0.35)'
  },
  actionsContainer:{
    // backgroundColor:'red',
    // position:'absolute',
    // bottom:Dimensions.get('window').height * 0.1,
    // left:0,
    flexDirection:'column',
    height:Dimensions.get('window').height * 0.9,
    justifyContent:'center',
  }
});

export default LandingPage;
