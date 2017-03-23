'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
	Button,
	StyleSheet,
  TextInput,
  View,
} from 'react-native';

class PhoneScreen extends Component {
  static navigationOptions = {
    title: 'Phone Number',
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
          onSubmitEditing={() => this.refs.NumberInput.focus() }
        />
        <TextInput
          ref='NumberInput'
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Phone number, e.g. +123456789"
          autoCorrect={false}
          keyboardType="phone-pad"
        />
        <Button
          title="Save"
          onPress={() => navigate('Main') }
        />
      </View>
    );
  }
}

module.exports = PhoneScreen;
