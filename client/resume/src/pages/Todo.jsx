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
			newTodo: {
				name: '',
				status: 'pending',
				steps:[]
			},
			step:{name:'',status:'pending'},
			filter: 'all',
			loading: false,
			api: API,
			admin: window.localStorage.getItem('admin') || false,
			showForm:false
		};
		this.submitTodo = this.submitTodo.bind(this);
		this.submitStep = this.submitStep.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.toggleForm = this.toggleForm.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}
	componentDidMount() {
		this.getTodos();
	}
	getTodos() {
		let {api,loading} = this.state;
		loading = true;
		this.setState({loading});
		axios.get(api).then((res) => {
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
		newTodo.steps.push(step);
		step = {name:'',status:'pending'};
		this.setState({newTodo,step});
	}
	submitTodo() {
		let {newTodo,api,todos} = this.state;
		axios.post(api, newTodo).then((res) => {
			if (res.status == 200) {
				const todo = res.data;
				todos.unshift(todo);
				this.setEmptyTodo()
				this.setState({todos});
				this.toggleForm();
			}
		});
	}
	updateTodo(todo) {
		axios.put(this.state.api + todo._id, todo).then((res) => {
			if (res.status == 200) {
				this.getTodos();
			}
		});
	}
	// handleKeyPress(todo, e) {
	// 	if (e.key === 'Enter') {
	// 		if (e.target.value == 'go to admin mode') {
	// 			window.localStorage.setItem('admin', true);
	// 			this.setState({
	// 				admin: true,
	// 				newTodo: {
	// 					name: '',
	// 					status: 'pending'
	// 				},
	// 			});
	// 			return false;
	// 		}
	// 		if (e.target.value == 'exit admin mode') {
	// 			window.localStorage.setItem('admin', '');
	// 			this.setState({
	// 				admin: false,
	// 				newTodo: {
	// 					name: '',
	// 					status: 'pending'
	// 				},
	// 			});
	// 			return false;
	// 		}
	// 		if (todo != 'add') {
	// 			this.updateTodo(todo);
	// 		} else {
	// 			this.submitTodo();
	// 		}
	// 	}
	// }
	setEmptyTodo() {
		this.setState({newTodo:{name:'',steps:[],status:'pending'}});
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
		if (name == 'name') {
			this.setState({
				newTodo: {
					steps:[],
					name: value,
					status: 'pending'
				}
			});
		} else {
			this.setState({step:{name:value,status:'pending'}});
		}
	}
	handleUpdate(idx, e) {
		const newTodos = this.state.todos.map((todo, i) => {
			if (i !== idx) {
				return todo;
			} else {
				todo.name = e.target.value;
				return todo;
			}
		});
		this.setState({todos: newTodos});
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
		this.setState({filter});
	}
	getStatus(todo) {
		return 'todo ' + todo.status;
	}
	toggleForm() {
		const {showForm} = this.state;
		this.setState({showForm:!showForm});
	}
	renderForm() {
		const {newTodo,step} = this.state;
		const steps = newTodo.steps.map((s,i)=>
			<div key={i}>{s.name}</div>
		);
		return (
			<div className="todo__form">
				<input autoComplete="off" className="todo__name" placeholder="Title" name="name" value={newTodo.name} onChange={this.handleChange} />
				<h4>Steps</h4>
				<input autoComplete="off" className="todo__name-step" name="step" value={step.name} onChange={this.handleChange}/>
				<span className="fa fa-plus" onClick={this.submitStep}></span>
				{steps}
				<a className="todo__button" onClick={this.submitTodo}>Submit</a>
			</div>
		);
	}
	render() {
		const {admin, todos, newTodo, loading, filter,error,showForm} = this.state;
		let todosFilter = todos,errorMsg,form;
		if (showForm) {
			form = this.renderForm();
		}
		if (error) {
			errorMsg = <div className="todos_error">{error}</div>;
		}
		if (filter != 'all') {
			todosFilter = todos.filter(todo => todo.status == filter);
		}
		const todoList = todosFilter.map((todo, idx) => 
			<CSSTransition key={todo._id} timeout={500} classNames="todoAnimation">
				<div className={this.getStatus(todo)}>
					{admin ?
					<input className="todo__title" value={todo.name} onChange={this.handleUpdate.bind(this, idx)} />
					:
					<div className="todo__title">{todo.name}</div>
					}
					{todo.status != 'done'?
					<div className="todo__actions">
						<div className="todo__edit" onClick={this.handleEdit.bind(this,idx)}>Edit</div>
						<div className="todo__complete" onClick={this.handleComplete.bind(this, idx)}>{todo.status == 'pending' ? 'Working' : 'Done'}</div>
						<div className="todo__remove" onClick={this.handleRemove.bind(this, idx, todo._id)}>Remove</div>
					</div>
					:null}
				</div>
			</CSSTransition>
		);
		return (
			<div className="container">
				{form}
				<h2 className="todos__title">Todo List</h2>
				<div className="todos__container">
					<a className="todo__button" onClick={this.handleAdd}>Add New</a>
					{/* <input placeholder="Add New Todo" id="todoName" value={newTodo.name} onChange={this.handleChange} onKeyPress={this.handleKeyPress.bind(this, 'add')} /> */}
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