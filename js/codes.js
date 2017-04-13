initialState = {
  // Default codes.
  codes: [
    {
      value: 'https://github.com/georgjaehnig/qr-show',
      type:  'URL',
      fields: {
        description: 'QR Show on Github',
        url: 'https://github.com/georgjaehnig/qr-show',
      }
    },
    {
      value: 'wifi:something',
      type:  'Wifi',
      fields: {
        description: 'my-wifi',
        ssid: 'ciferamondo',
        password: 'somepass',
        type: 'WPA',
        hidden: false,
      }
    },
  ],
  currentCodeIndex: 0,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'addCode':
      nextState = {
        ...state  
      };
      nextState.codes = [
        ...state.codes,
        action.code,
      ];
      nextState.currentCodeIndex = nextState.codes.length - 1;
      return nextState;
    case 'updateCurrentCode':
      nextState = {
        ...state  
      };
      nextState.codes = [
        ...state.codes.slice(0, nextState.currentCodeIndex),
        action.code,
        ...state.codes.slice(nextState.currentCodeIndex + 1),
      ];
      return nextState;
    case 'deleteCurrentCode':
      nextState = {
        ...state  
      };
      nextState.codes = [
        ...state.codes.slice(0, nextState.currentCodeIndex),
        ...state.codes.slice(nextState.currentCodeIndex + 1),
      ];
      // Limit index to array length.  
      nextState.currentCodeIndex = Math.min(nextState.currentCodeIndex, nextState.codes.length - 1);
      return nextState;
    case 'setCurrentCodeIndex':
      nextState = {
        ...state  
      };
      nextState.currentCodeIndex = action.currentCodeIndex;
      return nextState;
  }
  return state;
}

export function setCurrentCodeIndex(currentCodeIndex) {
  return { 
    type: 'setCurrentCodeIndex',
    currentCodeIndex: currentCodeIndex,
  } 
}
export function deleteCurrentCode() {
  return { 
    type: 'deleteCurrentCode',
  } 
}
