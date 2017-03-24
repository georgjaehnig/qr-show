'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
  Button,
  Picker,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

import EditScreen from './EditScreen.js';

class WifiScreen extends EditScreen {

  state = {
    description: '',
    ssid: '',
    password: '',
    type: '',
    hidden: false,
  };
  
  static navigationOptions = {
    title: 'Wifi network',
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
      value: `WIFI:S:${this.state.ssid};T:${this.state.type};P:${this.state.password};H:${this.state.hidden}`,
      type:  'Wifi',
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
          ref='SsidInput'
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="SSID"
          onChangeText={(ssid) => this.setState({ssid})}
          value={this.state.ssid}
          onSubmitEditing={() => this.refs.PasswordInput.focus() }
        />
        <Picker
          style={styles.picker}
          selectedValue={this.state.type}
          onValueChange={(type) => this.setState({type})}
        >
          <Picker.Item key="1" label="WPA/WPA2" value="WPA" />
          <Picker.Item key="2" label="WEP" value="WEP" />
          <Picker.Item key="3" label="No password" value="nopass" />
        </Picker>
        { this.state.type != 'nopass' &&
          <TextInput
            ref='PasswordInput'
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            onSubmitEditing={() => this.submit() }
          />
        }
        <Picker
          style={styles.picker}
          selectedValue={this.state.hidden}
          onValueChange={(hidden) => this.setState({hidden})}
        >
          <Picker.Item key="1" label="Network is not hidden" value="false" />
          <Picker.Item key="2" label="Network is hidden" value="true" />
        </Picker>
        <Button
          title="Save"
          onPress={() => this.submit()}
        />
      </ScrollView>
    );
  };

}

module.exports = WifiScreen;
