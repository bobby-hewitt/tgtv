
import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Image,
} from 'react-native';
import globalContext from '../../Context/global'

const triangles = [true,true,true,true,true,true,true,true,true]

// const useRotate = () => {
    // const rotation = useRef(new Animated.Value(0)).current 
    

    // const rotate = () => {
    //   Animated.loop(
    //    Animated.timing(rotation, {
    //     toValue: 360,
    //     duration: 5000000 ,
    //     easing: Easing.linear,
    //   })).start(() => rotate())
    // }
   

const Background = (props) =>  {
  const globalState = useContext(globalContext)
  const rotationValue = useRef(new Animated.Value(0)).current 
  const backgroundColorPosition= useRef(new Animated.Value(0)).current 
  const offset = useRef(new Animated.Value(0)).current 

  useEffect(() => {
    const newOffset = 
      props.backgroundPosition === 'center' ? 0 : 
      props.backgroundPosition === 'left' ? -320 : 
      320
      Animated.timing(offset, {
        toValue: newOffset,
        duration: 500,    
      }).start()
  },[props.backgroundPosition])

  useEffect(() => {
    if (props.backgroundPosition === 'center'){
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 1000 ,
        useNativeDriver:true,
        easing: props.easing ? props.easing : Easing.easeInOut,
      }).start(() => rotationValue.setValue(0))
    }
  },[globalState.backgroundSpin ])

  useEffect(() => {
    backgroundColorPosition.stopAnimation()


      Animated.timing(backgroundColorPosition, {
        toValue: globalState.activeIndex ? globalState.activeIndex * -1080 : 0,
        // toValue: 0,
        duration: 300 ,
        useNativeDriver:true,
        
      }).start()
  }, [globalState.activeIndex])

  
 const rotation = rotationValue.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-40deg', '40deg']
  })
 console.log(props.games)
  // useEffect(() => {
  //   console.log(props.activeGame)
  //   // if (props.activeGame){  
  //   //   overlayOpacity.stopAnimation()   
  //   //   Animated.timing(overlayOpacity, {
  //   //     toValue: 0.3,
  //   //     duration: 500,
  //   //   }).start()        
  //   // } else {
  //   //     overlayOpacity.stopAnimation()
  //   //     Animated.timing(overlayOpacity, {
  //   //       toValue: 0,
  //   //       duration: 500,
  //   //     }).start()      
      
  //   // }
  // },[props.activeGame])
  // style={[styles.outerContainer, {left: offset, right : offset, height:'100%' }]}
  return (
    <React.Fragment>
    
    <Animated.View style={[styles.outerContainer, {left: offset, right : offset, height:'100%' }]}>
      <Animated.View style={[styles.backgroundColorContainer, {transform:[{translateY: backgroundColorPosition}]}]}>
        {props.games && props.games.map((game, i) => {
          return(
          <View key={i} style={[styles.backgroundColor, {backgroundColor: game.backgroundColor}]} />
          )
        })}
      </Animated.View>
      <Animated.View style={[styles.container, {transform: [{rotate: rotation}]}]}>  
         {triangles.map((item, i) => {
            return (
              <View style={[styles.triangle, {transform: [{rotate: `${i * 40}deg`}, {translateY: -750}]}]}key={i} />
            )
         })}
      </Animated.View>
    {/*<Animated.View style={[styles.overlay, {}]} />*/}
    </Animated.View>  
    {/*<Image source={require('../../assets/images/shoestring.jpg')} style={styles.image}/>*/}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  outerContainer:{
    flex:1,
    position:'absolute',
    top:0,
    bottom:'-50%',
  },
  backgroundColorContainer:{
    
    position:"absolute",
    top:0,
    left:-320,
    backgroundColor:'blue',
  
    width:120,
    height:1080,
  },
  backgroundColor:{
    height:1080,
    
    width:2500,
    backgroundColor:'green'
  },

  overlay:{
    flex:1,
    position:'absolute',
    
    height:'100%',
    backgroundColor:'#000',
    top:0,
    left:-320,
    bottom:0,
    right:-320,
    opacity:0.2,
  },
  container: {
    flex:1,
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
    flexDirection:'row'
  },
  image:{
    width:1920,
    height:1080
  },
  triangle:{
    position:'absolute',
    top: Dimensions.get('window').height/2 - 750,
    left: Dimensions.get('window').width/2 -280 ,
    borderLeftWidth: 280,
    borderLeftColor: 'transparent',
    borderRightWidth: 280,
    borderRightColor: 'transparent',
    borderTopWidth: 1500,
    borderTopColor: '#ffffff15',   
    width:0,
    height:0,
  }
});


export default Background