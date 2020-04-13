// @flow
import React from 'react';
import axios from 'axios';

import {CSSTransition,TransitionGroup} from 'react-transition-group';

import '../css/todo.css';
const API = '/api/todos/';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error:'',
      todos: [],
      step:{name:'',status:'pending'},
      filter: 'all',
      loading: false,
      api: API,
      admin: window.localStorage.getItem('admin') || false,
      showForm:false,
      form:'todo',
      transation:{
        title:'',price:'',date:''
      }
    };
    this.submitTodo = this.submitTodo.bind(this);
    this.submitStep = this.submitStep.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.toggleTransactionForm = this.toggleTransactionForm.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount() {
    this.setEmptyTodo();
    this.getTodos();
  }
  getTodos() {
    let {api,loading,filter} = this.state;
    let opt = {};
    loading = true;
    this.setState({loading});
    if (filter != 'all') {
      opt.status = filter;
    }
    axios.get(api,{params:opt}).then((res) => {
      if (res.status == 200) {
        const todos = res.data;
        loading = false;
        this.setState({loading,todos});
      }
    },(res)=>{
      loading = false;
      this.setState({loading,error:'Network Error'});
    });
  }
  submitStep() {
    let {newTodo,step} = this.state;
    if (step._id) {
      for (let i in newTodo.steps) {
        if (step._id = newTodo.steps[i]._id) {
          newTodo.steps[i] = step
        }
      }
    } else {
      newTodo.steps.push(step);
    }
    step = {name:'',status:'pending'};
    this.setState({newTodo,step});
  }
  editStep(i) {
    let {step,newTodo} = this.state;
    step = newTodo.steps[i]
    this.setState({step});
  }
  deleteStep(i) {
    let {newTodo} = this.state;
    newTodo.steps.splice(i,1);
    this.setState({newTodo});
  }
  submitTodo() {
    let {newTodo,api,todos} = this.state;
    let url = api,method = 'post';
    if (newTodo._id) {
      url += newTodo._id;
      method = 'put';
    }
    axios[method](url, newTodo).then((res) => {
      if (res.status == 200) {
        const todo = res.data;
        if (newTodo._id) {
          for (let i in todos) {
            if (todos[i]._id == newTodo._id) {
              todos[i] = newTodo;
            }
          }
        } else {
          todos.unshift(todo);
        }
        this.setEmptyTodo()
        this.setState({todos});
        this.toggleForm();
      }
    });
  }
  setEmptyTodo() {
    this.setState({newTodo:{date:'',name:'',steps:[],status:'pending'}});
  }
  handleAdd() {
    this.setEmptyTodo();
    this.toggleForm();
  }
  handleEdit(idx) {
    let {todos} = this.state;
    const newTodo = todos[idx];
    this.setState({newTodo});
    this.toggleForm();
  }
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    let {newTodo,step} = this.state;
    switch (name) {
      case 'name':
        newTodo[name] = value;
        this.setState({newTodo});
        break;
      case 'date':
        newTodo[name] = value;
        this.setState({newTodo});
        break;
      case 'step':
        step.name = value;
        this.setState({step});
        break;
      default:
        break;
    }
  }
  handleComplete(idx) {
    let todos = this.state.todos;
    let status = todos[idx].status;
    todos[idx].status = status == 'pending' ? 'working' : 'done';
    let todo = todos[idx];
    axios.put(this.state.api + todo._id, todo).then((res) => {
      if (res.status == 200) {
        this.setState({todos});
      }
    });
  }
  handleRemove(idx, id) {
    let todos = this.state.todos;
    todos.splice(idx, 1);
    axios.delete(this.state.api + id).then((res) => {
      if (res.status == 200) {
        this.setState({todos});
      }
    });
  }
  setFilter(filter) {
    this.setState(
      {filter},
      ()=>{
        this.getTodos();
      }
    );
  }
  getStatus(todo) {
    return 'todo ' + todo.status;
  }
  toggleForm() {
    const {showForm} = this.state;
    this.setState({showForm:!showForm},
      ()=>{
        if (!this.map) {
          this.setupMap();
        } else {
          delete this.map;
        }
      }
    );
  }
  setupMap() {
    this.map = new AMap.Map('map', {
      zoom:11,//级别
      center: [116.397428, 39.90923],//中心点坐标
      viewMode:'3D'//使用3D视图
    });
  }
  showTransationForm(stpIdx) {
    this.setState({form:'transation',stpIdx});
  }
  toggleTransactionForm() {
    let {form} = this.state;
    form = form == 'todo' ? 'transation' : 'todo';
    this.setState({form});
  }
  renderForm() {
    const {newTodo,step,form,transation} = this.state;
    const steps = newTodo.steps.map((s,i)=>
      <div key={i}>
        <span>{s.name}</span>
        <span className="fa fa-pencil" onClick={this.editStep.bind(this,i)}></span>
        <span className="fa fa-times" onClick={this.deleteStep.bind(this,i)}></span>
        <span className="fa fa-plus" onClick={this.showTransationForm.bind(this,i)}></span>
      </div>
    );
    return (
      <div className="todo__form">
        <div id="form">
          {form == 'todo'?
          <div>
            <input autoComplete="off" className="todo__name" placeholder="Name" name="name" value={newTodo.name} onChange={this.handleChange} />
            <input autoComplete="off" className="todo__date" placeholder="Date" name="date" value={newTodo.date} onChange={this.handleChange} />
            <h4>Steps</h4>
            <input autoComplete="off" className="todo__name-step" name="step" value={step.name} onChange={this.handleChange}/>
            <span className="fa fa-plus" onClick={this.submitStep}></span>
            {steps}
            <div className="">
              <a className="todo__btn" onClick={this.submitTodo}>Submit</a>
              <a className="todo__btn" onClick={this.toggleForm}>Cancel</a>
            </div>
          </div>
          :
          <div>
            <input placeholder="Title" autoComplete="off" value={transaction.title}/>
            <input placeholder="Price" autoComplete="off" value={transation.price}/>
            <input placeholder="Search location" autoComplete="off" ref="search" />
            <div className="">
              <a className="todo__btn">Submit</a>
              <a className="todo__btn" onClick={this.toggleTransactionForm}>Cancel</a>
            </div>
          </div>
          }
        </div>
        <div id="map"></div>
      </div>
    );
  }
  render() {
    const {admin, todos, newTodo, loading, filter,error,showForm} = this.state;
    let errorMsg,form;
    if (showForm) {
      form = this.renderForm();
    }
    if (error) {
      errorMsg = <div className="todos_error">{error}</div>;
    }
    const todoList = todos.map((todo, idx) => 
      <CSSTransition key={todo._id} timeout={500} classNames="todoAnimation">
        <div className={this.getStatus(todo)}>
          <div className="todo__title">{todo.name}</div>
          {todo.status != 'done'?
          <div className="todo__actions">
            <div className="todo__edit" onClick={this.handleEdit.bind(this,idx)}>Edit</div>
            <div className="todo__complete" onClick={this.handleComplete.bind(this, idx)}>{todo.status == 'pending' ? 'Working' : 'Done'}</div>
            <div className="todo__remove" onClick={this.handleRemove.bind(this, idx, todo._id)}>Remove</div>
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
          <a className="todo__btn" onClick={this.handleAdd}>Add New</a>
          <div className="todo__statics">
            <span className="done" onClick={this.setFilter.bind(this, 'done')}>Done</span>
            <span className="working" onClick={this.setFilter.bind(this, 'working')}>In Progress</span>
            <span className="pending" onClick={this.setFilter.bind(this, 'pending')}>Pending</span>
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
    );
  }
}