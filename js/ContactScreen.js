'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
  Button,
  ScrollView,
  TextInput,
} from 'react-native';

import EditScreen from './EditScreen.js';

class ContactScreen extends EditScreen {

  state = {
    description: '',
    firstName: '',
    lastName: '',
    number: '',
    email: '',
  };
  
  static navigationOptions = {
    title: 'Contact',
  };

  validateNumber = (number) => {
    var re = /^[0-9+]*$/;
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
      value: `BEGIN:VCARD
VERSION:2.1
N:${this.state.lastName};${this.state.firstName}
TEL:${this.state.number}
EMAIL:${this.state.email}
END:VCARD`,
      type:  'Contact',
      fields: this.state,
    };
    return code;
  };

  render() {
    return (
      <ScrollView>
        <TextInput
          ref='DescriptionInput'
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Description, e.g.: My contact"
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
          onSubmitEditing={() => this.refs.FirstNameInput.focus() }
        />
        <TextInput
          ref='FirstNameInput'
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="First Name"
          onChangeText={(firstName) => this.setState({firstName})}
          value={this.state.firstName}
          onSubmitEditing={() => this.refs.LastNameInput.focus() }
        />
        <TextInput
          ref='LastNameInput'
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Last Name"
          onChangeText={(lastName) => this.setState({lastName})}
          value={this.state.lastName}
          onSubmitEditing={() => this.refs.NumberInput.focus() }
        />
        <TextInput
          ref='NumberInput'
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Contact number, e.g. +123456789"
          autoCorrect={false}
          keyboardType="phone-pad"
          onChangeText={(number) => this.setState({number})}
          value={this.state.number}
          onSubmitEditing={() => this.refs.EmailInput.focus() }
        />
        <TextInput
          ref='EmailInput'
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email address, e.g. john@example.com"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          onSubmitEditing={() => this.submit() }
        />
        <Button
          title="Save"
          onPress={() => this.submit()}
        />
      </ScrollView>
    );
  };

}

module.exports = ContactScreen;
