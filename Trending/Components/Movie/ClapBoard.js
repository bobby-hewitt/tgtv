import React, {useRef, useEffect} from 'react'
import { 
  View,
  StyleSheet,
  Text,
  Image,
  Animated
} from 'react-native'
import gs from '../../Styles'


const stars = [true, true, true, true, true]
const Option = ({review, rating, index, votes}) => {
  
  return(
    <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
        </View>

        <View style={styles.upperContainer}>
          <View style={styles.upperInnerContainer}>
            <View style={styles.whiteAngle}>
            </View>
            <View style={styles.whiteAngle}>
            </View>
            <View style={styles.whiteAngle}>
            </View>
            <View style={styles.whiteAngle}>
            </View>
          </View>
        </View>
        <View style={styles.lowerContainer}>
        <View style={styles.lowerStripeContainer}>
            <View style={[styles.whiteAngle, styles.whiteAngleReverse]}>
            </View>
            <View style={[styles.whiteAngle, styles.whiteAngleReverse]}>
            </View>
            <View style={[styles.whiteAngle, styles.whiteAngleReverse]}>
            </View>
            <View style={[styles.whiteAngle, styles.whiteAngleReverse]}>
            </View>
          </View>
        </View>    
    </View>
  )
  
}

const styles = StyleSheet.create({
  outerContainer:{

    transform:[
      {translateX:-1700},
      {translateY:200},
      {scale:1}
    ],
    width:'100%',
    
    
    position:'absolute',
    top:-100,
    left:0,
    bottom:0,

    right:0,
  },
  innerContainer:{
    

  },
  upperContainer:{
    marginTop:200,
    width:0,
    height:0,
    position:'relative',
    
     transform:[
      // {rotate:'-10deg'},
      {scale:1},
      // {translateX:1700},
      {translateY:-150}
    ],
   
  },
  upperInnerContainer:{
    borderWidth:5,
    borderColor:'#fff',
    overflow:'hidden',
    flexDirection:'row',
    width:1700,
    height:150,
    backgroundColor:'#101010',
    borderWidth:5,
    borderColor:'#fff',
    borderBottomWidth:2,
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    transform:[
      {rotateZ:'-3deg'},
      {translateX:1700},
      {translateY:0}
    ],
  },
  lowerContainer:{
    borderWidth:5,
    borderColor:'#fff',
    borderTopWidth:2,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
     width:1700,
    height:600,
    backgroundColor:'#101010',
    transform:[
      
      {translateX:1700},
      {translateY:-0}
    ],
  },
  lowerStripeContainer:{
    height:150,
    width:'100%',
    flexDirection:'row'
  },
  whiteAngle:{
    flex:1,
    width:200,
    height:150,
    backgroundColor:'#fff',
    marginRight:150,
    marginLeft:50,
    transform:[
      {skewX: -100},
      {scale:1}
    ]
  },
  whiteAngleReverse:{
    transform:[
      {skewX: 100},
      {scale:1}
    ]
  }
})

export default Option