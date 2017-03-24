'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
  Button,
  TextInput,
  View,
} from 'react-native';

import EditScreen from './EditScreen.js';

class PhoneScreen extends EditScreen {

  state = {
    description: '',
    number: '',
  };
  
  static navigationOptions = {
    title: 'Phone Number',
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
      value: 'tel:' + this.state.number,
      type:  'Phone',
      fields: this.state,
    };
    return code;
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

}

module.exports = PhoneScreen;
