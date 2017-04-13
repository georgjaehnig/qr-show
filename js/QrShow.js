'use strict';

import React, { Component } from 'react'

import {
  StackNavigator,
} from 'react-navigation';

import { Provider } from 'react-redux'; 

import MainScreen     from './MainScreen.js';
import PhoneScreen    from './PhoneScreen.js';
import TextScreen     from './TextScreen.js';
import ContactScreen  from './ContactScreen.js';
import WifiScreen     from './WifiScreen.js';
import URLScreen      from './URLScreen.js';
import LocationScreen from './LocationScreen.js';

import { createStore, combineReducers } from 'redux';

import codeSettings from './codes.js';

const reducers = combineReducers({codeSettings});

const store = createStore(reducers);

const QrShow = StackNavigator({
  Main:    {screen: MainScreen},
  Phone:   {screen: PhoneScreen},
  Text:    {screen: TextScreen},
  Contact: {screen: ContactScreen},
  Wifi:    {screen: WifiScreen},
  URL:     {screen: URLScreen},
  Location: {screen: LocationScreen},
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
