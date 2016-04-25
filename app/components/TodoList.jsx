import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions/index';
import Todo from 'components/Todo';
import TodoAPI from 'api/TodoAPI';

export var TodoList = React.createClass({
  componentDidMount: function () {
    var {dispatch} = this.props;
    
    dispatch(actions.populateTodos());
  },
  render: function () {
    var {todos, showCompleted, searchText} = this.props;
    var renderTodos = () => {
      var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
      if (filteredTodos.length === 0) {
        return (
          <p className="container__message">Nothing To Do</p>
        );
      }

      return filteredTodos.map((todo) => {
        return (
          <Todo key={todo.id} {...todo}/>
        );
      });
    };

    return (
      <div>
        {renderTodos()}
      </div>
    )
  }
});

export default connect(
  (state) => {
    return state;
  }
)(TodoList);
