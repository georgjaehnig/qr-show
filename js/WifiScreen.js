'use strict';

import React, { Component } from 'react'
import styles from './styles.js';
import { connect } from 'react-redux'; 

import {
  Button,
  Picker,
  ScrollView,
  TextInput,
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

  createCode = () => {
    var code = {
      value: `WIFI:S:${this.state.ssid};T:${this.state.type};P:${this.state.password};H:${this.state.hidden}`,
      type:  'Wifi',
      fields: this.state,
    };
    return code;
  };

  render() {

		//console.log('render');
		//console.log(this);
		//console.log('this wifi');
		//console.log(this.store.getState());

    return (
      <ScrollView style={styles.scrollView}>
        <TextInput
          ref='DescriptionInput'
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Description, e.g.: My home wifi"
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
          onSubmitEditing={() => this.refs.SsidInput.focus() }
        />
        <TextInput
          ref='SsidInput'
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="SSID"
          onChangeText={(ssid) => this.setState({ssid})}
          value={this.state.ssid}
          onSubmitEditing={() => { 
            // Focus to Password only if not nopass.
            if (this.state.type != 'nopass') {
              this.refs.PasswordInput.focus();
            }
          }}
        />
        <Picker
          ref='TypeInput'
          style={styles.picker}
          selectedValue={this.state.type}
          onValueChange={(type) => { 
            // Clear password if set nopass.
            if (type == 'nopass') {
              this.setState({password: ''})
            }
            this.setState({type})
          }}
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
            autoCorrect={false}
            placeholder="Password"
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
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

export default connect()(WifiScreen);
