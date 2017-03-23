'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
  AsyncStorage,
  Button,
  Dimensions,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import QRCode from 'react-native-qrcode';
 
class MainScreen extends Component {

  static navigationOptions = {
    title: 'QR Show',
  };

  // Default codes.
  codes = [
    {
      label: 'QR Show on Github',
      value: 'https://github.com/georgjaehnig/qr-show'
    },
  ];

  state = {
    isLoading: true,
    currentCodeValue: this.codes[0].value,
  };

  pickerValueChange = function(currentCodeValue, currentCodeIndex) {
    AsyncStorage.setItem('currentCodeIndex', JSON.stringify(currentCodeIndex));
    return this.setState({currentCodeValue: currentCodeValue});
  }

  componentWillMount() {
    AsyncStorage.getItem('codes').then((data) => {
      if (data !== null) {
        this.codes = JSON.parse(data);
      }
      // Save defaults.
      else {
        AsyncStorage.setItem('codes', JSON.stringify(this.codes));
      }
      this.setState({
        isLoading: false
      });
    });

    AsyncStorage.getItem('currentCodeIndex').then((data) => {
      if (data !== null) {
        var currentCodeIndex = JSON.parse(data);
        if (!this.codes) {
          return;
        }
        if (currentCodeIndex > this.codes.length - 1) {
          return;
        }
         this.setState({currentCodeValue: this.codes[currentCodeIndex].value});
      }
    })
  }

  render() {

    if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>;
    }
    
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



module.exports = MainScreen;
