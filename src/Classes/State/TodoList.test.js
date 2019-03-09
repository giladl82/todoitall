import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import TodoList from './TodoList';

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

describe('Classes', () => {
  afterEach(cleanup);

  const mock = jest.fn();

  describe('State', () => {
    describe('TodoList', () => {
      it('Should return null', () => {
        const { queryByTestId } = render(<TodoList onDeleteItem={mock} todos={[]} />);
        const list = queryByTestId('todo-list');
        expect(list).toBeFalsy();
      });

      it('Should return a todo list', () => {
        const { queryByTestId } = render(<TodoList onDeleteItem={mock} todos={todos} />);
        const list = queryByTestId('todo-list');
        expect(list.children.length).toBe(2);
      });

      it('Should remove one todo and return a one item todo list', () => {
        const { queryByTestId } = render(<TodoList onDeleteItem={mock} todos={todos} />);
        const list = queryByTestId('todo-list');
        const button = queryByTestId('todo-delete');

        fireEvent.click(button);
        expect(mock.mock.calls.length).toBe(1);
      });
    });
  });
});
