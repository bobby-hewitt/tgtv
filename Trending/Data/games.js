const actions = [
{
    "label": "Webheads",
    // backgroundColor: '#1DB954',
    backgroundColor: '#040125',
    // backgroundColor: '#040125',

    // backgroundColor: '#04011f',
    guruColor: 'green',
    value: 'search',
    backgroundImage: require('../assets/images/home/searchBackground.png'),
    armRotateX: 0,
    armRotateZ: 0,
    description: "Think you're tuned in to the world? Prove it in a game of wit and deception",
    players:'2-6'
  },
  {
    "label": "Track attack",
    // backgroundColor: '#4285F4',
    // backgroundColor: '#04011f',
    
    // backgroundColor: '#04011f',
    backgroundColor:'#2e3047',
    // backgroundColor: '#040125',

    guruColor: 'blue',
    value:'song',
    backgroundImage: require('../assets/images/home/songBackground.png'),
 
     armRotateX: 1,
    armRotateZ: 0,
    description: 'Music knowledge and lightning speed. Can you guess the track?',
    players:'1-6'

  },
  {
    "label": "Shoestring studios",
    
    backgroundColor: '#040125',

    guruColor: 'red',
    value: 'movie',
    backgroundImage: require('../assets/images/home/movieBackground.png'),
    armRotateZ: 0,
    armRotateX: 0,
    description: "You're the Writer, Director, Actor and Critic. But Who will get the awards?",
    players:'3-6'
  },
  


  
]

export default actions