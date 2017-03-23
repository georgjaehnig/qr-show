'use strict';
 
import {
  AppRegistry,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import MainScreen from './js/MainScreen.js';
import PhoneScreen from './js/PhoneScreen.js';
import AddScreen from './js/AddScreen.js';

const QrShow = StackNavigator({
  Main: {screen: MainScreen},
  Add: {screen: AddScreen},
  Phone: {screen: PhoneScreen},
}); 

AppRegistry.registerComponent('QrShow', () => QrShow);

module.exports = QrShow;
