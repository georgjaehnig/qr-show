'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

class PhoneScreen extends Component {

  static navigationOptions = {
    title: 'Phone Number',
  };

  save = function(currentCodeValue, currentCodeIndex) {
    AsyncStorage.setItem('currentCodeIndex', JSON.stringify(currentCodeIndex));
    return this.setState({currentCodeValue: currentCodeValue});
  }

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
              navigate('Main');
            }
          }}
        />
      </View>
    );
  }
}

module.exports = PhoneScreen;
