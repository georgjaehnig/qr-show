'use strict';

import {
  StackNavigator,
} from 'react-navigation';

import MainScreen  from './MainScreen.js';
import PhoneScreen from './PhoneScreen.js';
import AddScreen   from './AddScreen.js';
import TextScreen  from './TextScreen.js';

const QrShow = StackNavigator({
  Main:  {screen: MainScreen},
  Add:   {screen: AddScreen},
  Phone: {screen: PhoneScreen},
  Text:  {screen: TextScreen},
}); 

module.exports = QrShow;
