import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteToto } from '../../state/actions';

class TodoList extends Component {
  handleDeleteItem = event => {
    event.preventDefault();
    this.props.deleteToto(event.target.dataset.id);
  };

  render() {
    const { todos } = this.props;

    if (!todos || !todos.length) return null;

    return (
      <ul data-testid="todo-list" className="App-todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.label}{' '}
            <button data-testid="todo-delete" data-id={todo.id} onClick={this.handleDeleteItem}>
              X
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteToto
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
