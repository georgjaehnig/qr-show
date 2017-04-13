'use strict';

import React, { Component } from 'react'
import styles from './styles.js';
import { connect } from 'react-redux'; 

import {
  Button,
  ScrollView,
  TextInput,
} from 'react-native';

import EditScreen from './EditScreen.js';

class LocationScreen extends EditScreen {

  state = {
    description: '',
    lat: '',
    lon: '',
  };
  
  static navigationOptions = {
    title: 'Location',
  };

  createCode = () => {
		this.state.lat = this.state.lat.replace(',', '.');
		this.state.lon = this.state.lon.replace(',', '.');
		var value = 'geo:' + this.state.lat  + ',' + this.state.lon;
    var code = {
			value: value, 
      type:  'Location',
      fields: this.state,
    };
    return code;
  };

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <TextInput
          ref='DescriptionInput'
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Description, e.g.: My home"
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
          onSubmitEditing={() => this.refs.LatInput.focus() }
        />
        <TextInput
          ref='LatInput'
          style={styles.textInput}
          autoCapitalize="none"
          keyboardType="numeric"
          placeholder="Latitude"
          onChangeText={(lat) => this.setState({lat})}
          value={this.state.lat}
          onSubmitEditing={() => this.refs.LonInput.focus()}
        />
        <TextInput
          ref='LonInput'
          style={styles.textInput}
          autoCapitalize="none"
          keyboardType="numeric"
          placeholder="Longitude"
          onChangeText={(lon) => this.setState({lon})}
          value={this.state.lon}
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

export default connect()(LocationScreen);
