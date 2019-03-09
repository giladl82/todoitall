import React, { useState } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(1);

  const handleAddTodo = ({ todo }) => {
    setTodos([
      ...todos,
      {
        id: count,
        label: todo
      }
    ]);

    setCount(count + 1);
  };

  const handleDeleteItem = event => {
    setTodos(todos.filter(t => t.id.toString() !== event.target.dataset.id));
  };

  return (
    <>
      <h1>Todo Hooks State</h1>
      <AddTodo onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onDeleteItem={handleDeleteItem} />
    </>
  );
};

export default TodoApp;
