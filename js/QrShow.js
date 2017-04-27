'use strict';

import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux'; 
import * as storage from 'redux-storage';

import codeSettings from './codes.js';
const reducers = combineReducers({codeSettings});
const reducer = storage.reducer(reducers);

import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('qrshow');
const middleware = storage.createMiddleware(engine, [ 'setLoading' ]);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);

const store = createStoreWithMiddleware(reducer);
const load = storage.createLoader(engine);

load(store);

import MainScreen     from './MainScreen.js';
import PhoneScreen    from './PhoneScreen.js';
import TextScreen     from './TextScreen.js';
import ContactScreen  from './ContactScreen.js';
import WifiScreen     from './WifiScreen.js';
import URLScreen      from './URLScreen.js';
import LocationScreen from './LocationScreen.js';

const QrShow = StackNavigator({
  Main:     {screen: MainScreen},
  Contact:  {screen: ContactScreen},
  Location: {screen: LocationScreen},
  Phone:    {screen: PhoneScreen},
  Text:     {screen: TextScreen},
  Wifi:     {screen: WifiScreen},
  URL:      {screen: URLScreen},
}); 

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <QrShow/>
      </Provider>
    );
  }
}

module.exports = App;
