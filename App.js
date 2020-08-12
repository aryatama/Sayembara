import 'react-native-gesture-handler';
import React from 'react'
import Router from './src/Router'
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

