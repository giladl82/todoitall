import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo } from '../../state/actions';

class AddTodo extends Component {
  state = { values: {} };
  handleSubmit = event => {
    event.preventDefault();
    this.props.addTodo(this.state.values);
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addTodo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);
