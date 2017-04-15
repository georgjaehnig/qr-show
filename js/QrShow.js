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
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);

const store = createStoreWithMiddleware(reducer);
const load = storage.createLoader(engine);

load(store)
	.then((newState) => {
		// TODO: Find a way to call (again)
		// scrollToCurrentCode from MainScreen,
		// in order to get it scrolled to the loaded codes from the storage.
		// Or: Let the scrolling happen during render().
		// Actually, this should already happen since render already renders
		// the codes from the storage. So it's weird that while it on the one hand
		// correctly renders the Picker items after load(), it apparently cannot scroll 
		// to correct code within the ScrollView.
		// 
		// Something like:
		// MainScreen.props.scrollToCurrentCode();
		console.log('loaded');
	})
	.catch(() => console.log('Failed to load previous state'));

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
