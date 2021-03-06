'use strict';

import React, { Component } from 'react'
import styles from './styles.js';
import { connect } from 'react-redux'; 

import { 
  setCurrentCodeIndex,
  deleteCurrentCode
} from './codes.js';

import {
  Alert,
  Button,
  Dimensions,
  Linking,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import QRCode from 'react-native-qrcode';
import URL from 'url-parse';
import { decode as decodeGe0 } from 'mapsme-ge0';

import ShareMenu from 'react-native-share-menu';
 
class MainScreen extends Component {

  static navigationOptions = {
    title: 'QR Show',
  };

  qrCodeSize = 0;

  // Custom:

  deleteCode = () => {
    if (this.props.codeSettings.codes.length < 2) {
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
      'Delete ' + this.props.codeSettings.codes[this.props.codeSettings.currentCodeIndex].fields.description + '?',
      [
        {
          text: 'Cancel', 
          onPress: () => { },
          style: 'cancel'
        },
        {
          text: 'OK', 
          onPress: () => {
            this.props.deleteCurrentCode();
            return this.forceUpdate();
          },
        },
      ],
    );
  }

  isInt = (value) => {
    var isInt = typeof value === 'number' && (value % 1) === 0;
    return isInt;
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
      var parsedGe0Url = URL(ge0Url);
      var pathElements = parsedGe0Url.pathname.split('/');
      var ge0Code = pathElements[1];
      var ge0CodeDecoded = decodeGe0(ge0Code);
      // Open LocationScreen.
      this.props.navigation.navigate(
        'Location', 
        {
          isNew: true, 
          fields: {
            description: description,
            lat: String(ge0CodeDecoded.lat),
            lon: String(ge0CodeDecoded.lon),
          }
        } 
      );
      ShareMenu.clearSharedText();
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

  componentWillMount() {
    ShareMenu.getSharedText((text) => this.handleIncomingText(text));
  }

  componentDidMount() {
    console.log('componentDidMount');
    Linking.addEventListener('url', this.handleIncomingUrl);
  } 

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleIncomingUrl);
  } 

  render() {

    console.log('render');
    //console.log('codeSettings', this.props.codeSettings);
    //console.log('codes', this.props.codeSettings.codes);

    if (this.props.codeSettings.loading) {
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
    this.qrCodeSize = Math.min(height,width);

    // Add some margin.
    this.qrCodeSize = this.qrCodeSize - 40;

    const {codeSettings} = this.props;

    return (
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={codeSettings.currentCodeIndex}
          onValueChange={(currentCodeIndex) => { 
            console.log('Picker onValueChange ==================================================', currentCodeIndex);
            this.props.setCurrentCodeIndex(currentCodeIndex);
          }}
        >

          {this.props.codeSettings.codes.map((code, index) => <Picker.Item key={index} label={code.type + ': ' +code.fields.description} value={index} />)}

        </Picker>
        <View style={styles.codeOperations}>
          <Button
            style={styles.codeOperation}
            title="Edit"
            onPress={() => { 
              navigate(
                this.props.codeSettings.codes[this.props.codeSettings.currentCodeIndex].type,
                {
                  fields: this.props.codeSettings.codes[this.props.codeSettings.currentCodeIndex].fields,
                  currentCodeIndex: this.props.codeSettings.currentCodeIndex,
                  isNew: false,
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
        <ScrollView 
            ref={(scrollView) => {
              var scrollToX = (this.qrCodeSize + 40) * this.props.codeSettings.currentCodeIndex;
              //console.log('scrollView', scrollView);
              //console.log('scrollToX', scrollToX);
              if (scrollView) {
                // Remove setTimeout wrapper when https://github.com/facebook/react-native/issues/6849 is resolved.
                setTimeout(() => scrollView.scrollTo({x: scrollToX, animated: false}), 0);
              }
            }}
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false} 
            pagingEnabled={true}
            style={styles.qrcodes} 
            contentContainerStyle={{flex: 0}}
            onScroll={(event) => {
              //console.log('scrolled to', event.nativeEvent.contentOffset.x);
              var currentCodeIndex = event.nativeEvent.contentOffset.x / (this.qrCodeSize + 40);
              if (this.isInt(currentCodeIndex)) {
                // Without the if, the setCurrentCodeIndex will trigger a new render
                // even if the value remains the same.
                // This is odd, since a new render should be only triggered
                // if previous and new state are different.
                if (currentCodeIndex != this.props.codeSettings.currentCodeIndex) {
                  //console.log('offset', event.nativeEvent.contentOffset.x);
                  console.log('set currentCodeIndex from scroll', currentCodeIndex );
                  this.props.setCurrentCodeIndex(currentCodeIndex);
                }
              }
            }}
            scrollEventThrottle={500} // TODO: Seems to be ignored. Why?
          >

          {this.props.codeSettings.codes.map((code, index) => 
            <View key={index} style={styles.qrcode} >
              <QRCode
                value={code.value}
                size={this.qrCodeSize} />
            </View>
          )}


        </ScrollView>
        <Picker
          style={styles.picker}
          onValueChange={(screen) => navigate(screen, {isNew: true, fields: {description: ''}} ) }
        >
          <Picker.Item key="new"      value=""         label="Create new QR code ..." />
          <Picker.Item key="Contact"  value="Contact"  label="Contact" />
          <Picker.Item key="Location" value="Location" label="Location"  />
          <Picker.Item key="Phone"    value="Phone"    label="Phone number" />
          <Picker.Item key="Text"     value="Text"     label="Text" />
          <Picker.Item key="URL"      value="URL"      label="URL" />
          <Picker.Item key="Wifi"     value="Wifi"     label="Wifi network"  />
        </Picker>
      </View>
    );
  };

  componentDidUpdate() {
    console.log('componentDidUpdate');
    //console.log('codes', this.props.codeSettings);
  } 
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  setCurrentCodeIndex,
  deleteCurrentCode,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
