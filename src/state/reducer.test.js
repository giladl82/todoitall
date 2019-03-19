import reducer from './reducer';

describe('Redux Reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      todos: [
        {
          id: 1,
          label: 'first todo'
        }
      ],
      count: 2
    };
  });

  it('Should add a new todo to the list', () => {
    const action = {
      type: 'ADD_TODO',
      label: 'New todo'
    };
    const state = reducer(initialState, action);
    const expected = {
      todos: [
        ...initialState.todos,
        { id: initialState.todos.length + 1, label: action.label }
      ],
      count: 3
    };
    expect(state).toEqual(expected);
  });

  it('Should remove a todo from the list', () => {
    const action = {
      type: 'DELETE_TODO',
      id: '1'
    };
    const state = reducer(initialState, action);
    const expected = {
      todos: [
      ],
      count: 2
    };
    expect(state).toEqual(expected);
  });
});
