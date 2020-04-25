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
    <View>
    <View style={[styles.starsContainer]}>
      {stars.map((item, i) => {
        if (i < rating) return  <Image style={styles.star} key={i} source={require('../../assets/icons/starSelected.png')} />
          return  <Image style={styles.star} key={i} source={require('../../assets/icons/star.png')} />
        
      })}
      </View>
    <View style={[styles.option , {borderColor:'#333',  transform: [{rotate: index % 2 === 0 ? -0.05 : 0.05}]}]}>
      
      <Text style={[gs.bodycopy, gs.bold, {color:"#101010", textAlign:'center', fontSize:28}]}>{review || 'No comment'}</Text>
      
    </View>
    <Text style={{width:50, fontWeight:'bold', color:'#fff'}}>{votes !== 0 ? `+${votes}` : ''}</Text>
    </View>
  )
  
}

const styles = StyleSheet.create({
  starsContainer:{
    flexDirection:'row',
    
  },
  star:{
    width:50,
    height:50,
    margin:4,
  },
  option: {
    shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 20,
    marginHorizontal:24,
    marginVertical:30,
    backgroundColor:'#fff',
    borderRadius:20,
    borderWidth:10,
    padding:24,
    maxWidth:500,
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'center'
  }
})

export default Option