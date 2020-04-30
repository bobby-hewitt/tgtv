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
  AppController 
} from './Containers';





// socket.emit('host-joined', 'search')

const App = () => {
  const [ backgroundColor, setBackgroundColor] = useState('#173f5f')
  const [ backgroundPosition, setBackgroundPosition] = useState('right')
  const [ backgroundSpin, setBackgroundSpin] = useState(0)
  const [ activeGame, setActiveGame] = useState(false)
  return (
    <Provider
      value={{
        // socket,
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
        <AppController />
    </Provider>
        
      
    
  );
};

const styles = StyleSheet.create({

});

export default App;
