'use strict';
 
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
 
import {
  AppRegistry,
  AsyncStorage,
  Button,
  Dimensions,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import styles from './js/styles.js';
import PhoneScreen from './js/PhoneScreen.js';
import AddScreen from './js/AddScreen.js';

class MainScreen extends Component {

  static navigationOptions = {
    title: 'QR Show',
  };

  codes = [
    {
      label: 'Wifi QR poster',
      value: 'https://georgjaehnig.github.io/wifi-qr-poster/'
    },
    {
      label: 'FFit',
      value: 'https://www.findfind.it/'
    },
  ];

  state = {
    currentCodeValue: null,
  };
 
  constructor(props) {
    super(props);

    // TODO: Unfortunately, getItem takes a while,
    // so first this need to be set.
    // And this create an ugly effect, because first,
    // this code is show, and half a second later the actual current one.
    this.state.currentCodeValue = this.codes[0].value;

    AsyncStorage.getItem('currentCodeIndex').then((data) => {
      if (data !== null) {
        var currentCodeIndex = JSON.parse(data);
        this.setState({currentCodeValue: this.codes[currentCodeIndex].value});
      }
    })

  }

  pickerValueChange = function(currentCodeValue, currentCodeIndex) {
    AsyncStorage.setItem('currentCodeIndex', JSON.stringify(currentCodeIndex));
    return this.setState({currentCodeValue: currentCodeValue});
  }

  render() {

    const { navigate } = this.props.navigation;

    // Get Dimensions for current window.
    var {height, width} = Dimensions.get('window');

    // Get the lower value.
    var qrCodeSize = Math.min(height,width);

    // Add some margin.
    qrCodeSize = qrCodeSize - 40;

    return (
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={this.state.currentCodeValue}
          onValueChange={(value, itemPosition) => this.pickerValueChange(value, itemPosition)}
        >

          {this.codes.map((code, index) => <Picker.Item key={index} label={code.label} value={code.value} />)}

        </Picker>
        <View style={styles.qrcode}>
          <QRCode
            value={this.state.currentCodeValue}
            size={qrCodeSize} />
        </View>
        <Button
          title="Add new"
          onPress={() => navigate('Add') }
        />
      </View>
    );
  };
}

const QrShow = StackNavigator({
  Main: {screen: MainScreen},
  Add: {screen: AddScreen},
  Phone: {screen: PhoneScreen},
}); 

 
AppRegistry.registerComponent('QrShow', () => QrShow);
 
module.exports = QrShow;
