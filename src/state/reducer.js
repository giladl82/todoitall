import { ADD_TODO, DELETE_TODO } from './action-types';

const initialState = {
  todos: [],
  count: 1
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [
          ...state.todos,
          {
            id: state.count,
            label: action.label
          }
        ],
        count: state.count + 1
      };
    case DELETE_TODO:
      return { ...state, todos: state.todos.filter(t => t.id.toString() !== action.id) };
    default:
      return state;
  }
}
