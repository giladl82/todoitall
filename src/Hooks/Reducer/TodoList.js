import React from 'react';

import { useStore } from './store';
import { deleteTodo } from '../../state/actions';

const TodoList = () => {
  const [state, dispatch] = useStore();
  const handleDeleteItem = event => {
    event.preventDefault();
    dispatch(deleteTodo(event.target.dataset.id));
  };
  console.log(state);
  if (!state.todos || !state.todos.length) return null;

  return (
    <ul data-testid="todo-list" className="App-todo-list">
      {state.todos.map(todo => (
        <li key={todo.id}>
          {todo.label}{' '}
          <button data-testid="todo-delete" data-id={todo.id} onClick={handleDeleteItem}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
