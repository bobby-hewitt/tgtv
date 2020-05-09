import openSocket from 'socket.io-client'
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { Provider } from "./Context/global";
import { 
  SplashScreenController 
} from './Containers';





// socket.emit('host-joined', 'search')

const App = () => {
  const [ backgroundColor, setBackgroundColor] = useState('#173f5f')
  const [ backgroundPosition, setBackgroundPosition] = useState('right')
  const [ backgroundSpin, setBackgroundSpin] = useState(0)
  const [ activeGame, setActiveGame] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0) 

  return (
    <Provider
      value={{
        // socket,
        activeIndex,
        setActiveIndex,
        backgroundColor,
        setBackgroundColor,
        backgroundPosition,
        backgroundSpin, 
        setBackgroundSpin,
        setBackgroundPosition,
        activeGame, 
        setActiveGame

      }}
      
    >     
        <SplashScreenController />
    </Provider>
        
      
    
  );
};

const styles = StyleSheet.create({

});

export default App;
