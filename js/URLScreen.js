'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
  Button,
  ScrollView,
  TextInput,
} from 'react-native';

import EditScreen from './EditScreen.js';

class URLScreen extends EditScreen {

  state = {
    description: '',
    url: '',
  };
  
  static navigationOptions = {
    title: 'URL',
  };

  validate = () => {
    if (this.state.description == '') {
      this.showError('Description must not be empty.');
      return false;
    }
    return true;
  };

  createCode = () => {
    var code = {
      value: this.state.url,
      type:  'URL',
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
          onSubmitEditing={() => this.refs.URLInput.focus() }
        />
        <TextInput
          ref='URLInput'
          style={styles.textInput}
          autoCapitalize="none"
          keyboardType="url"
          placeholder="URL"
          onChangeText={(url) => this.setState({url})}
          value={this.state.url}
          onSubmitEditing={() => this.submit()}
        />
        <Button
          title="Save"
          onPress={() => this.submit()}
        />
      </ScrollView>
    );
  };

}

module.exports = URLScreen;
