'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
  Alert,
  AsyncStorage,
  Button,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

class PhoneScreen extends Component {

  state = {
    description: '',
    number: '',
  };

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
          codeSettings.codes.push(code);
          // Set index to created code.
          codeSettings.currentCodeIndex = codeSettings.codes.length - 1;
          console.log(codeSettings);
          // Save and go back to main then.
          AsyncStorage.setItem('codeSettings', JSON.stringify(codeSettings)).then((data) => {
            navigate('Main');
          });
        }
      });
    }
  };

  render() {
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
          onSubmitEditing={() => this.submit() }
        />
        <Button
          title="Save"
          onPress={() => this.submit()}
        />
      </View>
    );
  };

  componentDidMount() {
    this.refs.DescriptionInput.focus();
  };
}

module.exports = PhoneScreen;
