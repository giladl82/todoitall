import React, { useContext, useReducer, useEffect, useState, error } from 'react';
import { struct } from 'superstruct';
import PropTypes from 'prop-types';

const validateSoreCreatorStruct = struct({
  initialState: 'any?',
  reducer: 'function'
});

const validateCombineReducersStruct = struct({
  reducers: struct.dict(['string', 'function'])
});

const validateUseStoreStruct = struct({
  mapStateAs: 'function?'
});

const Context = React.createContext();

export const Provider = ({ children, state, reducer, enableDebug }) => {
  const store = useStoreCreator(state, reducer, enableDebug);
  store.__enableDebug = enableDebug;

  useEffect(() => {
    if (enableDebug) {
      console.log(
        `%cAction: %c${JSON.stringify(store.__action)} |  %cState: %c${JSON.stringify(getClearState(store))}`,
        'font-weight:bold; color: green; font-size: 15px;',
        'color: black; font-size: 15px;',
        'font-weight:bold; color: blue; font-size: 15px;',
        'color: black; font-size: 15px;'
      );
    }
  }, [store]);

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

Provider.propTypes = {
  reducer: PropTypes.func.isRequired,
  state: PropTypes.object,
  enableDebug: PropTypes.bool
};

Provider.defaultProps = {
  state: undefined,
  enableDebug: false
};

export const useStoreCreator = (initialState, reducer) => {
  validateSoreCreatorStruct({
    initialState,
    reducer
  });
  const ACTION_TYPE = '@@INIT_STATE';
  const [store, dispatch] = useReducer(reducer, reducer(initialState, { ACTION_TYPE }));
  const [action, setAction] = useState(ACTION_TYPE);

  store.__dispatch = dispatch;
  store.__action = action;
  store.__setAction = setAction;

  return store;
};

export const combineReducers = reducers => {
  validateCombineReducersStruct({ reducers });
  return (state, action) => {
    let resultedState = {};

    Object.keys(reducers).forEach(key => {
      resultedState[key] = reducers[key](state, action);
    });

    return resultedState;
  };
};

const getClearState = store => {
  const state = { ...store };
  Object.keys(state).forEach(key => {
    if (key.startsWith('__')) {
      delete state[key];
    }
  });

  return state;
};

export const useStore = mapStateAs => {
  validateUseStoreStruct({
    mapStateAs
  });

  const store = useContext(Context);
  const { __dispatch, __enableDebug, __setAction } = store;
  let state;

  if (mapStateAs) {
    if (typeof mapStateAs === 'function') {
      state = mapStateAs(getClearState(store));
    } else {
      error('mapStateAs, if supplied, must be a function!');
    }
  } else {
    state = getClearState(store);
  }

  if (__enableDebug) {
    const dispatcher = action => {
      __setAction(action);
      __dispatch(action);
    };
    return [state, dispatcher];
  } else {
    return [state, __dispatch];
  }
};
