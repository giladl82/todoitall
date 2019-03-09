import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
const store = configureStore(undefined);

class TodoApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <h1>Todo Class Redux</h1>
        <AddTodo />
        <TodoList />
      </Provider>
    );
  }
}

export default TodoApp;
