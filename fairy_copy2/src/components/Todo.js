import React, { Component } from 'react';
import TodoListTemplate from './/TodoListTemplate';

class Todo extends Component {
  render() {
    return (
      <TodoListTemplate>
        	<div className="card-content">템플릿</div>
      </TodoListTemplate>
    );
  }
}

export default Todo;