import React from 'react';
import useFrom from '../useForm';
const AddTodo = ({ onAddTodo }) => {
  const { values, handleChange, reset } = useFrom();

  const handleSubmit = event => {
    event.preventDefault();
    onAddTodo(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="todo-input"
        name="todo"
        className="App-todo-input"
        value={values.todo || ''}
        onChange={handleChange}
        required
      />
      <button data-testid="submit-button" className="App-todo-button">
        Add
      </button>
    </form>
  );
};

export default AddTodo;
