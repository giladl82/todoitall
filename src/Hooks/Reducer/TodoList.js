import React from 'react';

import { useStore } from './store';
import { deleteTodo } from '../../state/actions';

const TodoList = () => {
  const [todos, dispatch] = useStore(({todos}) => todos);
  const handleDeleteItem = event => {
    event.preventDefault();
    dispatch(deleteTodo(event.target.dataset.id));
  };

  if (!todos || !todos.length) return null;

  return (
    <ul data-testid="todo-list" className="App-todo-list">
      {todos.map(todo => (
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
