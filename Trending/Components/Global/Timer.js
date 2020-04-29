import React, { useEffect, useState } from 'react'
import { 
	View,
	Animated,
	StyleSheet,
	Text
} from 'react-native'

const Timer = ({duration, onComplete}) => {
	const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
      if (timeLeft <= 1){
      	clearTimeout(intervalId);
      	onComplete()
      }
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearTimeout(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);
	return (
		<View style={styles.outerContainer}>
			<Text style={styles.text}>{timeLeft}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	outerContainer:{
		shadowColor: '#000',
	    shadowOffset: { width: 0, height: 0 },
	    shadowOpacity: 0.4,
	    shadowRadius: 20,
	    borderWidth:10,
	    borderColor:'#000',

		width:100,
		height:100,
		borderRadius:100,
		backgroundColor:'#fff',
		position:'absolute',
		top:0,
		left:0, 
		alignItems:'center',
		justifyContent:'center'
	},
	text:{
		color:"#101010",
		fontWeight:'bold',
		fontSize:50,
		textAlign:'center',
	}
})

export default Timer