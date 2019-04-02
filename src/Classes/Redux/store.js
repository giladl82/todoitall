import { createStore, compose } from 'redux';

import reducer from '../../state/reducer';

// Using compose for redux devtools
export const configureStore = state => {
  return createStore(
    reducer,
    state,
    // compose(
    //   typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    //     ? window.devToolsExtension()
    //     : f => f
    // )
  );
};
