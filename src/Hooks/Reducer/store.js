import React, { useContext, useReducer, useEffect, useState } from 'react';
const Context = React.createContext();

export const Provider = ({ children, initialState, reducer, enableDebug }) => {
  const store = createStore(initialState, reducer, enableDebug);
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export const createStore = (initialState, reducer, enableDebug = false) => {
  const [store, dispatch] = useReducer(reducer, reducer(initialState, {}));
  store.__dispatch = dispatch;
  store.__enableDebug = enableDebug;

  return store;
};

export const useStore = () => {
  const store = useContext(Context);
  const { __dispatch, __enableDebug } = store;

  const [action, setAction] = useState('@@INIT__STORE');

  useEffect(() => {
    if (__enableDebug) {
      console.log(
        `%cAction: %c${JSON.stringify(action)} |  %cState: %c${JSON.stringify(store)}`,
        'font-weight:bold; color: green; font-size: 15px;',
        'color: black; font-size: 15px;',
        'font-weight:bold; color: blue; font-size: 15px;',
        'color: black; font-size: 15px;'
      );
    }
  }, [store, action]);

  const state = { ...store };

  delete state.__dispatch;
  delete state.__enableDebug;

  if (__enableDebug) {
    const dispatcher = action => {
      setAction(action);
      __dispatch(action);
    };
    return [state, dispatcher];
  } else {
    return [state, __dispatch];
  }
};
