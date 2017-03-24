'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
	Button,
  View,
} from 'react-native';

class AddScreen extends Component {
  static navigationOptions = {
    title: 'Add new QR code',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          title="Phone number"
          onPress={() => navigate('Phone') }
        />
        <Button
          title="Text"
          onPress={() => navigate('Text') }
        />
        <Button
          title="Contact"
          onPress={() => navigate('Contact') }
        />
        <Button
          title="Wifi network"
          onPress={() => navigate('Wifi') }
        />
        <Button
          title="URL"
          onPress={() => navigate('URL') }
        />
      </View>
    );
  }
}

module.exports = AddScreen;
