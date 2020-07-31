import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';

import {CSSTransition,TransitionGroup} from 'react-transition-group';

import '../css/todo.css';
const API = '/api/todos/';

const Todo = () => {
  var form,todoList,errorMsg,loading;
  return (
    <div className="container">
      {form}
      <h2 className="todos__title">Todo List</h2>
      <div className="todos__container">
        <a className="todo__btn">Add New</a>
        <div className="todo__statics">
          <span className="done">Done</span>
          <span className="working">In Progress</span>
          <span className="pending">Pending</span>
        </div>
        {loading ? 
        <div className="todos__loader"></div>
        :
        <TransitionGroup>
        {todoList}
        </TransitionGroup>
        }
        {errorMsg}
      </div>
    </div>
  )
}
export default Todo;