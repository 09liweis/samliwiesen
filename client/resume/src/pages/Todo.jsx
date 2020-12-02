import React, {useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

import {getTodos} from '../actions/todo';

import '../css/todo.css';

const Todo = () => {
  const [showForm,setShowForm] = useState(false);
  const dispatch = useDispatch();
  const loading = false;//if use loading from useSelector, no render animation
  const {items} = useSelector(state => state.todos);
  useEffect(() => {
    dispatch(getTodos());
  },[]);
  if (items && items.length === 0) {
  }
  var form,errorMsg;
  const handleEdit = (idx) => {

  }
  const handleComplete = (idx) => {

  }
  const handleRemove = (idx) => {

  }
  const todoList = items.map((todo, idx) => 
    <CSSTransition key={todo._id} timeout={500} classNames="todoAnimation">
      <div className={`todo ${todo.status}`}>
        <div className="todo__title">{todo.name}</div>
        {todo.status != 'done'?
        <div className="todo__actions">
          <div className="todo__edit" onClick={handleEdit(idx)}>Edit</div>
          <div className="todo__complete" onClick={handleComplete(idx)}>{todo.status == 'pending' ? 'Working' : 'Done'}</div>
          <div className="todo__remove" onClick={handleRemove(idx, todo._id)}>Remove</div>
        </div>
        :null}
        {todo.steps.map((s,i)=>
          <div key={i}>{s.name} - {s.status}</div>
        )}
      </div>
    </CSSTransition>
  );
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