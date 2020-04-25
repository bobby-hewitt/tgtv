import React, { useState } from "react";
import { Provider } from "./context";
import initialState from './initialState'
import Routes from './routes'
const ProviderComponent = props => {  
  // const [egState, setEgState] = useState(initialState.players);
 
  return (
     <Provider
        value={{
          egState,
          setEgState
        }}
      >
       <Routes />
    </Provider>
  );
};

export default ProviderComponent;