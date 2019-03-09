import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import TodoApp from './';

describe('Classes', () => {
  afterEach(cleanup);

  describe('State', () => {
    describe('TodoApp', () => {
      it('Should with an add todo form and an empty todo list', () => {
        const { getByTestId, container } = render(<TodoApp />);
        expect(container.querySelectorAll('h1').length).toBe(1);
        const value = 'write this test';
        const input = getByTestId('todo-input');
        const button = getByTestId('submit-button');

        fireEvent.change(input, { target: { value } });
        button.click();

        const list = getByTestId('todo-list');

        expect(list).toBeTruthy();
        expect(list.children.length).toBe(1);
      });
    });
  });
});
