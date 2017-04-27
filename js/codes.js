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
  loading: true,
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
        ...state.codes.slice(0, state.currentCodeIndex),
        ...state.codes.slice(state.currentCodeIndex + 1),
      ];
      // Limit index to array length.  
      nextState.currentCodeIndex = Math.min(state.currentCodeIndex, state.codes.length - 1);
      return nextState;
    case 'setCurrentCodeIndex':
      nextState = {
        ...state  
      };
      nextState.currentCodeIndex = action.currentCodeIndex;
      //console.log('setCurrentCodeIndex', nextState.currentCodeIndex);
      return nextState;
    case 'setLoading':
      nextState = {
        ...state  
      };
      nextState.loading = action.loading;
      return nextState;
    default:
      return state;
  }
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
