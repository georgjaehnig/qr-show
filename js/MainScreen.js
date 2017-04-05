'use strict';

import React, { Component } from 'react'
import styles from './styles.js';

import {
  Alert,
  AsyncStorage,
  Button,
  Dimensions,
  Linking,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import QRCode from 'react-native-qrcode';
import URL from 'url-parse';

import ShareMenu from 'react-native-share-menu';
 
class MainScreen extends Component {

  static navigationOptions = {
    title: 'QR Show',
  };

  // Default codes.
  codes = [
    {
      value: 'https://github.com/georgjaehnig/qr-show',
      type:  'URL',
      fields: {
        description: 'QR Show on Github',
        url: 'https://github.com/georgjaehnig/qr-show',
      }
    },
  ];

  state = {
    isLoading: true,
    currentCodeIndex: 0,
  };

  // Custom:

  saveCodeSettings = () => {
    var codeSettings = {
      codes: this.codes,
      currentCodeIndex: this.state.currentCodeIndex,
    }
    AsyncStorage.setItem('codeSettings', JSON.stringify(codeSettings));
  };

  deleteCode = () => {
    if (this.codes.length < 2) {
      Alert.alert(
        'Error',
        'At least 1 code has to remain always.',
        [
          {
            text: 'OK', 
            onPress: () => { },
          },
        ],
      );
      return;
    }
    Alert.alert(
      'Warning',
      'Delete ' + this.codes[this.state.currentCodeIndex].fields.description + '?',
      [
        {
          text: 'Cancel', 
          onPress: () => { },
          style: 'cancel'
        },
        {
          text: 'OK', 
          onPress: () => {
            this.codes.splice(this.state.currentCodeIndex, 1);
            // Limit index to array length.  
            this.state.currentCodeIndex = Math.min(this.state.currentCodeIndex, this.codes.length - 1);
            this.saveCodeSettings();
            return this.forceUpdate();
          },
        },
      ],
    );
  }

  handleIncomingUrl = (event) => {
    this.props.navigation.navigate(
      'URL', 
      {
        isNew: true, 
        fields: {
          description: '',
          url: event.url,
        }
      } 
    );
  }

  handleIncomingText = (text) => {

    // Only if the text is set.
    if (text == null) {
      return;
    }
    // Check if Maps.me share.
    // Get description and ge0 url from shared text.
    var matches = text.match(/(Check out\n([^]*)\n(ge0:[^]*))\n(http[^]*)\n/);
    if (matches) {
      // Build description.
      var description = matches[2];
      // Replace linebreaks.
      description = description.replace(/(\n)+/g, ' ');
      var ge0Url = matches[4];
      // Fetch the ge0 url and read its whole HTML.
      fetch(ge0Url).then((response) => {
        response.text().then((ge0Text) => {
          // Find coordinates in the HTML body.
          var ge0Matches = ge0Text.match(/<div class="ge0coordBox">(.*)<\/div>/mg);
          var lat = ge0Matches[0].match(/<div class="ge0coordBox">(.*)<\/div>/)[1];
          var lon = ge0Matches[1].match(/<div class="ge0coordBox">(.*)<\/div>/)[1];
          // Open LocationScreen.
          this.props.navigation.navigate(
            'Location', 
            {
              isNew: true, 
              fields: {
                description: description,
                lat: lat,
                lon: lon,
              }
            } 
          );
        });
      });
      return;
    }
    // Default: Treat as text.
    this.props.navigation.navigate(
      'Text', 
      {
        isNew: true, 
        fields: {
          description: description,
          text: text,
        }
      } 
    );
    // Clear Text after handling.
    ShareMenu.clearSharedText();
  }

  // Overrides:

  constructor(props) {
    super(props);
    //console.log('constructor');
    AsyncStorage.getItem('codeSettings').then((data) => {
      if (data !== null) {
        var codeSettings = JSON.parse(data);
        this.codes = codeSettings.codes;
        this.state.currentCodeIndex = codeSettings.currentCodeIndex;
      }
      // Save defaults.
      else {
        this.saveCodeSettings();
      }
      this.setState({ isLoading: false });
    });
  }

  componentWillMount() {
    ShareMenu.getSharedText((text) => this.handleIncomingText(text));
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleIncomingUrl);
  } 

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleIncomingUrl);
  } 


  render() {

    console.log("index: " + this.state.currentCodeIndex);

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
    
    const { navigate } = this.props.navigation;

    // Get Dimensions for current window.
    var {height, width} = Dimensions.get('window');

    // Get the lower value.
    var qrCodeSize = Math.min(height,width);

    // Add some margin.
    qrCodeSize = qrCodeSize - 40;

    return (
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={this.state.currentCodeIndex}
          onValueChange={(currentCodeIndex) => this.setState({ currentCodeIndex }) }
        >

          {this.codes.map((code, index) => <Picker.Item key={index} label={code.type + ': ' +code.fields.description} value={index} />)}

        </Picker>
        <View style={styles.codeOperations}>
          <Button
            style={styles.codeOperation}
            title="Edit"
            onPress={() => { 
              navigate(
                this.codes[this.state.currentCodeIndex].type,
                {
                  fields: this.codes[this.state.currentCodeIndex].fields,
                  currentCodeIndex: this.state.currentCodeIndex,
                  parent: this,
                }
              ) 
            }}
          />
          <Button
            style={styles.codeOperation}
            title="Delete"
            onPress={() => this.deleteCode() }
          />
        </View>
        <View style={styles.qrcode}>
          <QRCode
            value={this.codes[this.state.currentCodeIndex].value}
            size={qrCodeSize} />
        </View>
        <Picker
          style={styles.picker}
          onValueChange={(screen) => navigate(screen, {isNew: true, fields: {description: ''}} ) }
        >
          <Picker.Item key="new"     value=""        label="Create new QR code ..." />
          <Picker.Item key="URL"     value="URL"     label="URL" />
          <Picker.Item key="Text"    value="Text"    label="Text" />
          <Picker.Item key="Phone"   value="Phone"   label="Phone number" />
          <Picker.Item key="Contact" value="Contact" label="Contact" />
          <Picker.Item key="Wifi"    value="Wifi"    label="Wifi network"  />
          <Picker.Item key="Location" value="Location" label="Location"  />
        </Picker>
      </View>
    );
  };

  componentDidUpdate() {
    this.saveCodeSettings();
  }

}

module.exports = MainScreen;
