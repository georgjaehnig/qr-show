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
    currentCodeIndex: 0,
  };

  saveCodeSettings = () => {
    var codeSettings = {
      codes: this.codes,
      currentCodeIndex: this.state.currentCodeIndex,
    }
    AsyncStorage.setItem('codeSettings', JSON.stringify(codeSettings));
  };

  pickerValueChange = function(currentCodeValue, currentCodeIndex) {
		this.state.currentCodeIndex = currentCodeIndex;
    this.saveCodeSettings();
    return this.setState(
      {
        currentCodeIndex: currentCodeIndex,
      }
    );
  }

  componentWillMount() {
    AsyncStorage.getItem('codeSettings').then((data) => {
      if (data !== null) {
        var codeSettings = JSON.parse(data);
        this.codes = codeSettings.codes;
        this.state.currentCodeIndex = codeSettings.currentCodeIndex;
        console.log('LOG');
        console.log(this.state.currentCodeIndex);
      }
      // Save defaults.
      else {
        this.saveCodeSettings();
      }
      this.setState({
        isLoading: false
      });
    });
  }

  deleteCode = () => {
    this.codes.splice(this.state.currentCodeIndex, 1);
		// Limit index to array length.  
    this.state.currentCodeIndex = Math.min(this.state.currentCodeIndex, this.codes.length - 1);
    this.saveCodeSettings();
    return this.setState(
      {
        currentCodeIndex: this.state.currentCodeIndex,
      }
    );
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
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
          selectedValue={this.codes[this.state.currentCodeIndex].value}
          onValueChange={(value, itemPosition) => this.pickerValueChange(value, itemPosition)}
        >

          {this.codes.map((code, index) => <Picker.Item key={index} label={code.label} value={code.value} />)}

        </Picker>
        <View style={styles.codeOperations}>
          <Button
            style={styles.codeOperation}
            title="Open"
            onPress={() => navigate('Add') }
          />
          <Button
            style={styles.codeOperation}
            title="Edit"
            onPress={() => navigate('Add') }
          />
          <Button
            style={styles.codeOperation}
            title="Delete"
            onPress={() => this.deleteCode() }
          />
        </View>
        <View style={styles.qrcode}>
          <QRCode
            value={this.codes[this.state.currentCodeIndex].value}
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
