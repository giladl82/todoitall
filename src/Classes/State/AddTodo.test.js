import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import AddTodo from './AddTodo';

describe('Classes', () => {
  afterEach(cleanup);

  describe('State', () => {
    describe('TodoApp', () => {
      it('Should change input value', () => {
        const mock = jest.fn();
        const { getByTestId } = render(<AddTodo onAddTodo={mock} />);
        const value = 'write this test';
        const input = getByTestId('todo-input');
        const button = getByTestId('submit-button');

        fireEvent.change(input, { target: { value } });
        button.click();

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toBeCalledWith({ todo: value });
      });
    });
  });
});
