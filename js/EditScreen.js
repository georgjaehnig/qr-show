'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
  Alert,
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
    this.setState(this.props.navigation.state.params.fields);
  }

  validate = () => {
    if (!this.state.description) {
      this.showError('Description must not be empty.');
      return false;
    }
    return true;
  };
  
  submit = () => {

    Keyboard.dismiss();

    const { navigate } = this.props.navigation;

    if (!this.validate()) {
      return;
    }

    var code = this.createCode();
    if (this.props.navigation.state.params.isNew) {
      this.props.dispatch({type: 'addCode', code: code});
    } 
    else {
      this.props.dispatch({type: 'updateCurrentCode', code: code});
    }
    this.props.navigation.goBack();
  };

  componentDidMount() {
    this.refs.DescriptionInput.focus();
  };
}

module.exports = EditScreen;
