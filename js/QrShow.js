'use strict';

import {
  StackNavigator,
} from 'react-navigation';

import MainScreen     from './MainScreen.js';
import PhoneScreen    from './PhoneScreen.js';
import TextScreen     from './TextScreen.js';
import ContactScreen  from './ContactScreen.js';
import WifiScreen     from './WifiScreen.js';
import URLScreen      from './URLScreen.js';
import LocationScreen from './LocationScreen.js';

const QrShow = StackNavigator({
  Main:    {screen: MainScreen},
  Phone:   {screen: PhoneScreen},
  Text:    {screen: TextScreen},
  Contact: {screen: ContactScreen},
  Wifi:    {screen: WifiScreen},
  URL:     {screen: URLScreen},
  Location: {screen: LocationScreen},
}); 

module.exports = QrShow;
