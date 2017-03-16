'use strict';
 
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
 
import {
    AppRegistry,
    StyleSheet,
    View,
    Picker
} from 'react-native';
 
class QrShow extends Component {
  state = {
    text: 'http://facebook.github.io/react-native/',
  };
 
  render() {
    return (
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={this.state.text}
          onValueChange={(text) => this.setState({text: text})} 
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <QRCode
          value={this.state.text}
          size={200} />
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    picker: {
      width: 200,
      marginBottom: 20,
    }
});
 
AppRegistry.registerComponent('QrShow', () => QrShow);
 
module.exports = QrShow;
