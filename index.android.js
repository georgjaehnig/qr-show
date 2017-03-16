'use strict';
 
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
 
import {
    AppRegistry,
    StyleSheet,
    View,
    Picker,
    Text
} from 'react-native';
 
class QrShow extends Component {

  codes = [
    {
      key: 1,
      label: 'Wifi QR poster',
      value: 'https://georgjaehnig.github.io/wifi-qr-poster/'
    },
    {
      key: 2,
      label: 'FFit',
      value: 'https://www.findfind.it/'
    }
  ];

  state = {
    text: this.codes[0].value,
  };
 
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.apptitle}>QR Show</Text>
        </View>
        <View style={styles.content}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.text}
            onValueChange={(text) => this.setState({text: text})} 
          >

            {this.codes.map((code) => <Picker.Item key={code.key} label={code.label} value={code.value} />)}

          </Picker>
          <QRCode
            value={this.state.text}
            size={200} />
        </View>
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flex: 1,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center'
  },  
  apptitle: {
    color: 'white',
    fontSize: 20,
  },
  content: {
    flex: 10,
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
