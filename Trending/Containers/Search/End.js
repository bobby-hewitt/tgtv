import React, { useRef, useEffect, useState } from 'react'
import {
	View,
	Image,
	StyleSheet,
	Animated,
	Dimensions,
	Text,
	Easing,
} from 'react-native'
import { Scale, AnimatedText } from '../../Components/Global'
import SearchOption from '../../Components/Search/Option'
import gs from '../../Styles'
let timeout;

const End = ({questions, colors}) => {
	const [ best, setBest ] = useState(getBest())
	const [ viewIndex, setViewIndex ] = useState(0)
	function getBest(){
		let best= []
		for (var i =0 ; i < questions.length; i++){
			let voteCount = [0,0,0,0,0,0,0,0,0]
			for (var j = 0 ; j < questions[i].votes.length; j++){

				voteCount[questions[i].votes[j].index] += 1
			}
			console.log('got votes,', voteCount)
			let bestFromQuestion = getBestFromQuestion(voteCount, questions[i].responses)
			
			if (bestFromQuestion) {
				bestFromQuestion.q = questions[i].q
				best.push(bestFromQuestion)
			}

		}
		
		
		console.log('got best', best)
		return best
	}

	useEffect(() => {
		return () => {
			clearTimeout(timeout)
		}
	},[])


	function getBestFromQuestion(votes, responses){
		for (var i = 0; i < responses.length; i++){
			if (responses[i].isTrue || responses[i].ourLie) {
				votes[i] = 0
			}
			let index = votes.indexOf(Math.max(...votes));
			if (votes[index] > 0 && responses[index].player){
			 	return responses[index]
			 } else {
			 	return false
			 }
		}
	}
	return(
		<View style={[styles.container]}>
			<Text style={[gs.bodycopy, gs.bold, styles.bestAnswersHeader]}>Best answers</Text>
			{best && best.map((item, i) => {
				if (i === viewIndex){
					return(
						<View key={i} style={{width:1000, height:540, paddingBottom: Dimensions.get('window').height / 20, flexDirection:'column-reverse', }}>
						<Scale  duration={800}scaleTo={1}  center animationComplete={() => {
							timeout = setTimeout(() => {
								let newIndex = viewIndex < best.length-1 ? viewIndex + 1 : 0
								setViewIndex(newIndex)
							},4000)
							
						}}>

							<Text style={[gs.subtitle, gs.bold, {fontWeight:'800',color: "#fff"}]}>{item.q}</Text>
							
							
							<Scale key={i} duration={800}scaleTo={1} center>
							<AnimatedText text={item.player.name} colors={colors} style={[gs.subtitle, gs.bold, {fontWeight:'800',color: "#fff"}]} />
							</Scale>

							<SearchOption color={colors ? colors[i % colors.length] : false}animationComplete={() => {}}backgroundColor={0}  {...item} i={i} />
							
						</Scale>
						</View>
					)
				} else return <View key={i} />
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		// paddingHorizontal:1920,
		marginTop:-140,
		width:1920,
		
		height:540,
		position:'absolute',
		justifyContent:'center',
		bottom:100,
		alignItems:'flex-end',
		left:0,
		zIndex:1000,
		right:0,
		// backgroundColor:'red',
		flexDirection:'row',
	},
	bestAnswersHeader:{
		opacity:0.5,
		position:'absolute',
		transform:[
			{rotate:'0deg'}
		],

		left:Dimensions.get('window').width / 20,
		bottom:Dimensions.get('window').height / 20,
	}
})

export default End