import React from 'react';
import { fireEvent, cleanup } from 'react-testing-library';
import { renderWithStore } from './renderWithStore';
import TodoList from './TodoList';
import reducer from '../../state/reducer';

const todos = [
  {
    id: 1,
    label: 'todo number 1'
  },
  {
    id: 2,
    label: 'todo number 2'
  }
];

describe('Hooks', () => {
  afterEach(cleanup);

  describe('Reducer', () => {
    describe('TodoList', () => {
      it('Should return null', () => {
        const { queryByTestId } = renderWithStore(<TodoList />, {
          initialState: undefined,
          reducer
        });
        const list = queryByTestId('todo-list');
        expect(list).toBeFalsy();
      });

      it('Should return a todo list', () => {
        const { queryByTestId } = renderWithStore(<TodoList />, {
          initialState: {
            todos,
            count: 3
          },
          reducer
        });
        const list = queryByTestId('todo-list');
        expect(list.children.length).toBe(2);
      });

      it('Should remove one todo and return a one item todo list', () => {
        const { queryByTestId } = renderWithStore(<TodoList />, {
          initialState: {
            todos,
            count: 3
          },
          reducer
        });
        const list = queryByTestId('todo-list');
        const button = queryByTestId('todo-delete');

        fireEvent.click(button);
        expect(list.children.length).toBe(1);
      });
    });
  });
});
