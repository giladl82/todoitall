import React, { Component } from 'react';

class TodoList extends Component {
  render() {
    const { todos, onDeleteItem } = this.props;

    if (!todos || !todos.length) return null;

    return (
      <ul data-testid="todo-list" className="App-todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.label}{' '}
            <button data-testid="todo-delete" data-id={todo.id} onClick={onDeleteItem}>
              X
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default TodoList;
