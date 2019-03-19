import { ADD_TODO, DELETE_TODO } from "./action-types";
import { addTodo, deleteTodo } from "./actions";

describe('Redux actions', () => {
    it('Should return ADD_TODO action with todo', () => {
        const expected = {
            type: ADD_TODO,
            label: 'todo label'
        }

        expect(addTodo({todo: 'todo label'})).toEqual(expected);
    })

    it('Should return DELETE_TODO action with todo id', () => {
        const expected = {
            type: DELETE_TODO,
            id: 1
        }

        expect(deleteTodo(1)).toEqual(expected);
    })
})