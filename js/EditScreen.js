'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
  Alert,
  AsyncStorage,
  Keyboard,
  StyleSheet,
} from 'react-native';

class EditScreen extends Component {

  currentCodeIndex = null;

  showError = function(message) {
    Alert.alert(
      'Error',
      message,
      [
        {text: 'OK'},
      ],
    );
  };

  componentWillMount() {
    // Set params.
    if (this.props.navigation.state.params) {
      this.state = this.props.navigation.state.params.fields;
      this.currentCodeIndex = this.props.navigation.state.params.currentCodeIndex; 
    }
  };

  submit = () => {
    const { navigate } = this.props.navigation;

    Keyboard.dismiss();
    if (this.validate()) {
      // Get current codes.
      AsyncStorage.getItem('codeSettings').then((data) => {
        if (data !== null) {
          var codeSettings = JSON.parse(data);
          // Create and add new code.
          var code = this.createCode();
          // If new: Append. 
          if (this.currentCodeIndex === null) {
            codeSettings.codes.push(code);
            // Set index to created code.
            codeSettings.currentCodeIndex = codeSettings.codes.length - 1;
          }
          // else: Replace.
          else {
            codeSettings.codes[this.currentCodeIndex] = code;
          }
          // Save and go back to main then.
          AsyncStorage.setItem('codeSettings', JSON.stringify(codeSettings)).then((data) => {
            navigate('Main');
          });
        }
      });
    }
  };

  componentDidMount() {
    this.refs.DescriptionInput.focus();
  };
}

module.exports = EditScreen;
