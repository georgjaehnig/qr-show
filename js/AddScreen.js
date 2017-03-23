'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
	Button,
  View,
} from 'react-native';

class AddScreen extends Component {
  static navigationOptions = {
    title: 'Add QR Code',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          title="Phone number"
          onPress={() => navigate('Phone') }
        />
      </View>
    );
  }
}

module.exports = AddScreen;
