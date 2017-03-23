'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
  Alert,
  AsyncStorage,
  Button,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

class PhoneScreen extends Component {

  static navigationOptions = {
    title: 'Phone Number',
  };

  showError = function(message) {
    Alert.alert(
      'Error',
      message,
      [
        {text: 'OK'},
      ],
    );
  };

  validateNumber = (number) => {
    var re = /^[0-9+]+$/;
    return re.test(number);
  };

  validate = () => {
    if (this.state.description == '') {
      this.showError('Description must not be empty.');
      return false;
    }
    if (!this.validateNumber(this.state.number)) {
      this.showError('Number must only contain 0-9 and +.');
      return false;
    }
    return true;
  };

  createCode = () => {
    var code = {
      label: this.state.description,
      value: 'tel:' + this.state.number,
    };
    return code;
  };

  state = {
    description: '',
    number: '',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
          ref='DescriptionInput'
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Description, e.g.: My home number"
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
          onSubmitEditing={() => this.refs.NumberInput.focus() }
        />
        <TextInput
          ref='NumberInput'
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Phone number, e.g. +123456789"
          autoCorrect={false}
          keyboardType="phone-pad"
          onChangeText={(number) => this.setState({number})}
          value={this.state.number}
        />
        <Button
          title="Save"
          onPress={() => { 
            if (this.validate()) {
              // Get current codes.
              AsyncStorage.getItem('codes').then((data) => {
                if (data !== null) {
                  var codes = JSON.parse(data);
                  // Create and add new code.
                  var code = this.createCode();
                  codes.push(code);
                  // Save and go back to main then.
                  AsyncStorage.setItem('codes', JSON.stringify(codes)).then((data) => {
                    navigate('Main');
                  });
                }
              });
            }
          }}
        />
      </View>
    );
  }
}

module.exports = PhoneScreen;
