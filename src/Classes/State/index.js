import React, { Component } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

class TodoApp extends Component {
  state = { todos: [], count: 1 };
  handleAddTodo = ({ todo }) => {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: this.state.count,
          label: todo
        }
      ],
      count: this.state.count + 1
    });
  };

  handleDeleteItem = event => {
    this.setState({
      todos: this.state.todos.filter(t => t.id.toString() !== event.target.dataset.id)
    });
  };

  render() {
    return (
      <>
        <h1>Todo Class State</h1>
        <AddTodo onAddTodo={this.handleAddTodo} />
        <TodoList todos={this.state.todos} onDeleteItem={this.handleDeleteItem} />
      </>
    );
  }
}

export default TodoApp;
