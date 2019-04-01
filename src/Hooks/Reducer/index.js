import React from 'react';
import { Provider } from 'use-hooks-store';
import reducer, { initialState } from '../../state/reducer';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const TodoApp = () => {
  return (
    <Provider state={initialState} reducer={reducer} enableDebug={true}>
      <h1>Todo Hooks Reducer</h1>
      <AddTodo />
      <TodoList />
    </Provider>
  );
};

export default TodoApp;
