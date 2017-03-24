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
  apptitle: {
    color: 'white',
    fontSize: 20,
  },
  picker: {
    alignSelf: 'stretch',
    margin: 10,
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
    margin: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    margin: 10,
  },
  textInputMultiline: {
    alignSelf: 'stretch',
    margin: 10,
    height: 200,
  },
});

module.exports = styles;
