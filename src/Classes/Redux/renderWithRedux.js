import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';

import { configureStore } from './store';

export const renderWithRedux = (ui, { initialState, store = configureStore(initialState) } = {}) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
};
