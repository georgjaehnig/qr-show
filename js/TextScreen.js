'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
  Button,
  ScrollView,
  TextInput,
} from 'react-native';

import EditScreen from './EditScreen.js';

class TextScreen extends EditScreen {

  state = {
    description: '',
    text: '',
  };
  
  static navigationOptions = {
    title: 'Text',
  };

  createCode = () => {
    var code = {
      value: this.state.text,
      type:  'Text',
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
          placeholder="Description, e.g. My free text"
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
          onSubmitEditing={() => this.refs.TextInput.focus() }
        />
        <TextInput
          ref='TextInput'
          style={styles.textInputMultiline}
          autoCapitalize="none"
          placeholder="Text, e.g. Hello World"
          multiline={true}
          autoCorrect={false}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
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

module.exports = TextScreen;
