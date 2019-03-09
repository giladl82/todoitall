import React, { Component } from 'react';

class AddTodo extends Component {
  state = { values: {} };
  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddTodo(this.state.values);
    this.setState({ values: {} });
  };

  handleInputChange = event => {
    if (event.target.value) {
      this.setState({
        values: { ...this.state.values, [event.target.name]: event.target.value }
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          data-testid="todo-input"
          name="todo"
          className="App-todo-input"
          value={this.state.values.todo || ''}
          onChange={this.handleInputChange}
          required
        />
        <button data-testid="submit-button" className="App-todo-button">
          Add
        </button>
      </form>
    );
  }
}

export default AddTodo;
