'use strict';

import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    backgroundColor: 'white',
  },
  apptitle: {
    color: 'white',
    fontSize: 20,
  },
  picker: {
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
  },
  codeOperations: {
    flexDirection: 'row',
    margin: 10,
  },
  // TODO: find a way to style buttons.
  codeOperation: {
    margin: 30,
    color: 'black',
  },
  qrcode: {
    marginLeft: 20,
    marginRight: 20,
  },
  qrcodes: {
    margin: 0,
  },
  textInput: {
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
  },
  textInputMultiline: {
    alignSelf: 'stretch',
    margin: 10,
    height: 150,
  },
});

module.exports = styles;
