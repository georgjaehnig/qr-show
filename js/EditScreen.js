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

  isNew = false;

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
      this.isNew = this.props.navigation.state.params.isNew; 
      this.parent = this.props.navigation.state.params.parent;
    }
  };

  validate = () => {
    if (this.state.description == '') {
      this.showError('Description must not be empty.');
      return false;
    }
    return true;
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
          if (this.isNew) {
            codeSettings.codes.push(code);
            // Set index to created code.
            codeSettings.currentCodeIndex = codeSettings.codes.length - 1;
          }
          // else: Replace.
          else {
            codeSettings.codes[codeSettings.currentCodeIndex] = code;
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
