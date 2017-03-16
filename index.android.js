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

  codes = [
    {
      label: 'Wifi QR poster2',
      key: 'https://georgjaehnig.github.io/wifi-qr-poster/'
    },
    {
      label: 'FFit',
      value: 'https://www.findfind.it/'
    }
  ];
 
  render() {
    return (
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={this.state.text}
          onValueChange={(text) => this.setState({text: text})} 
        >

          {this.codes.map((code) => <Picker.Item label={code.label} value={code.value} />)}

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
