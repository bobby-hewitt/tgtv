import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
	//type
  title:{
    fontSize:160,
    color:'#ffffff',
  },   
  titleSmall:{
  	fontSize:120,
    color:'#ffffff',
  },
  subtitle:{
    color:'#fff',
    fontSize:80,
  },
  bodycopy: {
  	color:'#fff',
    fontSize:52,
  },
  bold:{
  	fontWeight:'bold'
  },
  //spacing
  spaceBelow:{
  	marginBottom:40
  },
  spaceAbove:{
  	marginTop:40
  },
  spaceLeft:{
  	marginLeft:40
  },
  spaceRight:{
  	marginRight:40
  },
  shadowWhite:{
  	shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 80,
    
  },
  //containers
  centeredContainer:{
  	flex:1,
  	alignItems:'center',
  	justifyContent:'center'
  },
  row: {
  	flexDirection:'row',
  },
  column:{
  	flexDirection:'column'
  }

});

export default styles