import React from 'react';

import useForm from '../useForm';
import { useStore } from 'use-hooks-store';
import { addTodo } from '../../state/actions';

const AddTodo = () => {
  const actionCreators = useStore(undefined, {
    addTodo
  })[1];

  const { values, handleChange, reset } = useForm();

  const handleSubmit = event => {
    event.preventDefault();
    // dispatch(addTodo(values));
    actionCreators.addTodo(values);
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
