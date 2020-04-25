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
  const [ backgroundColor, setBackgroundColor] = useState('#5a7ec0')
  const [ backgroundPosition, setBackgroundPosition] = useState('right')
  const [ activeGame, setActiveGame] = useState(false)
  return (
    <Provider
      value={{
        // socket,
        backgroundColor,
        setBackgroundColor,
        backgroundPosition,
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
