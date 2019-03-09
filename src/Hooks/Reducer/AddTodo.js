import React from 'react';

import useFrom from '../useForm';
import { useStore } from './store';
import { addTodo } from '../../state/actions';

const AddTodo = () => {
  const dispatch = useStore()[1];

  const { values, handleChange, reset } = useFrom();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addTodo(values));
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
