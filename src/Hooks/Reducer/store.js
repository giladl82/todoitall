import React, { useContext, useReducer, useEffect, useState, error } from 'react';
import { struct } from 'superstruct';
import PropTypes from 'prop-types';

const validateStoreCreatorStruct = struct({
  initialState: 'any?',
  reducer: 'function'
});

const validateCombineReducersStruct = struct({
  reducers: struct.dict(['string', 'function'])
});

const validateUseStoreStruct = struct({
  mapStateAs: 'function?',
  mapActionsAs: 'object?'
});

const validateMapActionsAs = struct({
  actions: struct.dict(['string', 'function'])
});

const Context = React.createContext();

export const Provider = ({ children, state, reducer, enableDebug }) => {
  const store = useStoreCreator(state, reducer, enableDebug);
  const [devTools, setDevTools] = useState();
  store.__enableDebug = enableDebug;

  useEffect(() => {
    if (enableDebug) {
      if (
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__.connect &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION__.connect === 'function'
      ) {
        if (!devTools) {
          const tools = window.__REDUX_DEVTOOLS_EXTENSION__.connect();
          setDevTools(tools);
          tools.init();
        } else {
          devTools.send(store.__action, getClearState(store));
        }
      } else {
        console.log(
          `%cAction: %c${JSON.stringify(store.__action)} |  %cState: %c${JSON.stringify(getClearState(store))}`,
          'font-weight:bold; color: green; font-size: 15px;',
          'color: black; font-size: 15px;',
          'font-weight:bold; color: blue; font-size: 15px;',
          'color: black; font-size: 15px;'
        );
      }
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
  validateStoreCreatorStruct({
    initialState,
    reducer
  });
  const ACTION_TYPE = '';
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

export const useStore = (...maps) => {
  const [mapStateAs, mapActionsAs] = maps;
  validateUseStoreStruct({
    mapStateAs,
    mapActionsAs
  });

  const store = useContext(Context);
  const { __dispatch, __enableDebug, __setAction } = store;
  let state, dispatcher;

  if (mapStateAs) {
    if (typeof mapStateAs === 'function') {
      state = mapStateAs(getClearState(store));
    } else {
      error('mapStateAs, if supplied, must be a function!');
    }
  } else {
    state = getClearState(store);
  }

  dispatcher = actionCreator => {
    if (actionCreator instanceof Promise) {
      Promise.all([actionCreator]).then(([action]) => {
        if (__enableDebug) {
          __setAction(action);
        }
        __dispatch(action);
      });
    } else {
      __dispatch(actionCreator);
      if (__enableDebug) {
        __setAction(actionCreator);
      }
    }
  };

  if (mapActionsAs) {
    validateMapActionsAs({
      actions: maps[1]
    });

    const actions = Object.keys(mapActionsAs).reduce((result, key) => {
      result[key] = function() {
        return dispatcher(mapActionsAs[key].apply(this, arguments));
      };

      return result;
    }, {});

    return [state, actions];
  }

  return [state, dispatcher];
};
