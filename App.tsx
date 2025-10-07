import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import {AppNavigators} from './src/navigators';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigators />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
