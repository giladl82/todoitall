import React from 'react';
import { renderHook, cleanup } from 'react-hooks-testing-library';
import { renderWithStore } from './renderWithStore';
import { useStoreCreator, combineReducers, Provider, useStore } from './store';

afterEach(cleanup);

describe('store', () => {
  describe('combineReducers', () => {
    it('Should throw an error if reducers is null', () => {
      expect(() => {
        combineReducers(null);
      }).toThrowError();
    });

    it('Should throw an error if reducers is an empty object', () => {
      expect(() => {
        combineReducers({});
      }).toThrowError();
    });

    it('Should throw an error if a reducer value is not a function', () => {
      expect(() => {
        combineReducers({
          test: null
        });
      }).toThrowError();
    });

    it('Should return a combined function and dispatch all reducers on call', () => {
      const rd1 = jest.fn();
      const rd2 = jest.fn();

      const reducers = combineReducers({
        rd1,
        rd2
      });

      const state = {};
      const action = 'TEST';

      expect(typeof reducers).toBe('function');

      reducers(state, action);

      expect(rd1).toHaveBeenCalledTimes(1);
      expect(rd1).toHaveBeenCalledWith(state, action);
      expect(rd2).toHaveBeenCalledTimes(1);
      expect(rd2).toHaveBeenCalledWith(state, action);
    });
  });

  describe('useStoreCreator', () => {
    it('Should throw an error if reducers is an undefined object', () => {
      expect(() => {
        useStoreCreator({});
      }).toThrowError();
    });

    it('Should throw an error if a reducer value is not a function', () => {
      expect(() => {
        useStoreCreator(undefined, {});
      }).toThrowError();
    });

    it('Should return a store object', () => {
      const initialStore = {
        data: 'data'
      };

      const reducer = (state, action) => initialStore;

      const { result } = renderHook(() => useStoreCreator(undefined, reducer));

      expect(result.current).toBe(initialStore);
      expect(typeof result.current.__dispatch).toBe('function');
    });
  });

  describe('useStore abilities', () => {
    it('Should get full store state', () => {
      const initialState = {
        data: 'data'
      };

      const reducer = (state, action) => ({ ...initialState });

      let resultedState;
      const Child = () => {
        const [state, dispatch] = useStore();
        resultedState = state;
        return <div />;
      };

      renderWithStore(<Child />, { initialState, reducer });

      expect(resultedState).toEqual(initialState);
    });

    it('Should get only the data from store state', () => {
      const initialState = {
        data: 'data'
      };

      const reducer = (state, action) => ({ ...initialState });

      let resultedState;
      const Child = () => {
        const [data, dispatch] = useStore(s => s.data);
        resultedState = data;
        return <div />;
      };

      renderWithStore(<Child />, { initialState, reducer });

      expect(resultedState).toEqual(initialState.data);
    });

    it('Should get only the data from store state + the action from the reducer', () => {
      const initialState = {
        data: 'data'
      };

      const st1Action = () => ({type: 'ACTION'});

      const reducer = (state, action) => ({ ...initialState });

      let resultedState, resultedDispatch;
      const Child = () => {
        const [data, actions] = useStore(s => s.data, {
          st1: st1Action
        });

        resultedState = data;
        resultedDispatch = actions;
        return <div />;
      };

      renderWithStore(<Child />, { initialState, reducer });

      expect(resultedState).toEqual(initialState.data);
      expect(typeof resultedDispatch.st1).toBe('function');
    });
  });
});
