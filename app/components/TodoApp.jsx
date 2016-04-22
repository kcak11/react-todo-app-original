import React from 'react';
import uuid from 'node-uuid';
import moment from 'moment';

import TodoList from 'components/TodoList'
import AddTodo from 'components/AddTodo';
import TodoSearch from 'components/TodoSearch';
import Profile from 'components/Profile';

var TodoApp = React.createClass({
  render: function () {
    return (
      <div>
        <Profile/>

        <h1 className="page-title">Todo App</h1>

        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
              <TodoSearch/>
              <TodoList/>
              <AddTodo/>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = TodoApp;
