const l = function(msg, obj) {
  var parsedObj = JSON.parse(JSON.stringify(obj));
  console.log(msg, parsedObj);
}

initialState = {
  // Defaults.
  codes: [],
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
    case 'addInitialCode':
      nextState = {
        ...state  
      };
      nextState.loading = false;
      if (state.codes.length > 0) {
        return nextState;
      }
      var defaultCode = {
        value: 'https://github.com/georgjaehnig/qr-show',
        type:  'URL',
        fields: {
          description: 'QR Show on Github',
          url: 'https://github.com/georgjaehnig/qr-show',
        }
      };
      nextState.codes = [
        ...state.codes,
        defaultCode,
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

      l('before slice', nextState.codes);

      nextState.codes = state.codes.filter((value, index) => index != nextState.currentCodeIndex );
      //nextState.codes[2].fields.description = 'new3';

      l('after slice', nextState.codes);
      // Limit index to array length.  
      nextState.currentCodeIndex = Math.min(nextState.currentCodeIndex, nextState.codes.length - 1);
      //nextState.currentCodeIndex = 1;
      l('state', state);
      l('nextState', nextState);
      return nextState;
    case 'setCurrentCodeIndex':
      nextState = {
        ...state  
      };
      nextState.currentCodeIndex = action.currentCodeIndex;
      nextState.test = { bar: 2 };
      console.log('setCurrentCodeIndex', nextState.currentCodeIndex);
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
