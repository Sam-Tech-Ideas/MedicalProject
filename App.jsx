import {View, Text} from 'react-native';
import React from 'react';
import {Provider, useSelector} from 'react-redux';
import {store} from './src/redux/store';
import Nav from './Nav';

const App = () => {
  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
};

export default App;
