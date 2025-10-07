import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {AppNavigators} from './src/navigators';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <NavigationContainer>
        <AppNavigators />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
