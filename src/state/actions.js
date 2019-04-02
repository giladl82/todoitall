import { ADD_TODO, DELETE_TODO } from './action-types';

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve(), ms));
};

export const addTodo = async ({ todo }) => {
  const action = {
    type: ADD_TODO,
    label: todo
  };

  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(action);
  //   }, 500);
  // });

  await timeout(500);
  return action;
};

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id
});
