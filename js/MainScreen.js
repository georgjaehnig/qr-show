'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
  Alert,
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
      value: 'https://github.com/georgjaehnig/qr-show',
      type:  'URL',
      fields: {
        description: 'QR Show on Github',
        url: 'https://github.com/georgjaehnig/qr-show',
      }
    },
  ];

  state = {
    isLoading: true,
    currentCodeIndex: 0,
  };

  // Custom:

  saveCodeSettings = () => {
    var codeSettings = {
      codes: this.codes,
      currentCodeIndex: this.state.currentCodeIndex,
    }
    AsyncStorage.setItem('codeSettings', JSON.stringify(codeSettings));
  };

  deleteCode = () => {
    if (this.codes.length < 2) {
      Alert.alert(
        'Error',
        'At least 1 code has to remain always.',
        [
          {
            text: 'OK', 
            onPress: () => { },
          },
        ],
      );
      return;
    }
    Alert.alert(
      'Warning',
      'Delete ' + this.codes[this.state.currentCodeIndex].fields.description + '?',
      [
        {
          text: 'Cancel', 
          onPress: () => { },
          style: 'cancel'
        },
        {
          text: 'OK', 
          onPress: () => {
            this.codes.splice(this.state.currentCodeIndex, 1);
            // Limit index to array length.  
            this.state.currentCodeIndex = Math.min(this.state.currentCodeIndex, this.codes.length - 1);
            this.saveCodeSettings();
            return this.forceUpdate();
          },
        },
      ],
    );
  }

  // Overrides:

  constructor(props) {
    super(props);
    //console.log('constructor');
    AsyncStorage.getItem('codeSettings').then((data) => {
      if (data !== null) {
        var codeSettings = JSON.parse(data);
        this.codes = codeSettings.codes;
        this.state.currentCodeIndex = codeSettings.currentCodeIndex;
      }
      // Save defaults.
      else {
        this.saveCodeSettings();
      }
      this.setState({ isLoading: false });
    });
  }

  render() {

    console.log("index: " + this.state.currentCodeIndex);

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
          selectedValue={this.state.currentCodeIndex}
          onValueChange={(currentCodeIndex) => {
            this.setState({ currentCodeIndex });
          }}
        >

          {this.codes.map((code, index) => <Picker.Item key={index} label={code.type + ': ' +code.fields.description} value={index} />)}

        </Picker>
        <View style={styles.codeOperations}>
          <Button
            style={styles.codeOperation}
            title="Edit"
            onPress={() => { 
              navigate(
                this.codes[this.state.currentCodeIndex].type,
                {
                  fields: this.codes[this.state.currentCodeIndex].fields,
                  currentCodeIndex: this.state.currentCodeIndex,
                  parent: this,
                }
              ) 
            }}
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
  componentDidUpdate() {
    this.saveCodeSettings();
  }
}

module.exports = MainScreen;
