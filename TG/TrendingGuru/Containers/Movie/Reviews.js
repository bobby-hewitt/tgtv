import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import { Screen, Scale } from '../../Components/Global'
import { Overview, Review } from '../../Components/Movie'
import gs from '../../Styles'

const Reviews = ({players, backgroundColor, sendReviewVote, presentationIndex, votes}) =>  {
  const player = players[presentationIndex]
  const [ counter, setCounter ] = useState(-1)


  useEffect(() => {
    const intervalId = setTimeout(() => {
      setCounter(counter + 1);
        if (!counter >= player.reviews.length){
          clearTimeout(intervalId);
          return sendReviewVote()
        }
      }, 1000);
      return () => clearTimeout(intervalId);
  }, [counter]);




  const getAverageScore = () =>{
    let total = 0
    for (var i = 0; i < player.reviews.length; i++){
      total += player.reviews[i].rating 
    }
    return Math.round((total / player.reviews.length ) * 10) / 10
  }

  const score = getAverageScore()
  return (
    
    <View style={[gs.row, gs.centeredContainer, styles.container]}>
        
          <Overview {...player} score={score}/>
        
        <View style={styles.reviewsContainer}>
        {player.reviews.map((item, i) => {
          return(
            <Scale key={i} scaleTo={counter >= i ? 1 : 0} >
            <View style={gs.row}>
            <Review  index={i} {...item}/>
            
            </View>
            </Scale>
          )
        })}
        </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {

    flex:1,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    marginVertical:40
  },
  reviewsContainer:{
    flex:1, 
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  },
  imageContainer:{
    width:300,
    height:300, 
    borderRadius:200,
    marginBottom:20,
  }
});

export default Reviews;
