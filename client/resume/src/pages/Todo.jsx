// @flow
import React from 'react';
import axios from 'axios';

import {CSSTransition,TransitionGroup} from 'react-transition-group';

import '../css/todo.css';

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newTodo: {
                name: '',
                status: 'pending'
            },
            filter: 'all',
            loading: false,
            api: {
                list: 'https://samliweisen.herokuapp.com/api/todos/',
                add: 'https://samliweisen.herokuapp.com/api/todos/',
                update: 'https://samliweisen.herokuapp.com/api/todos/',
                remove: 'https://samliweisen.herokuapp.com/api/todos/'
            },
            admin: window.localStorage.getItem('admin') || false
        };
        this.submitTodo = this.submitTodo.bind(this);
    }
    componentDidMount() {
        this.getTodos();
    }
    getTodos() {
        this.setState({
            loading: true
        });
        axios.get(this.state.api.list).then((res) => {
            if (res.status == 200) {
                this.setState({
                    loading: false,
                    todos: res.data
                });
            }
        });
    }
    submitTodo() {
        const newTodo = this.state.newTodo;
        axios.post(this.state.api.add, newTodo).then((res) => {
            if (res.status == 200) {
                const todo = res.data;
                let todos = this.state.todos;
                todos.unshift(todo);
                this.setState({
                    newTodo: {
                        name: '',
                        status: 'pending'
                    },
                    todos: todos
                });
            }
        });
    }
    updateTodo(todo) {
        axios.put(this.state.api.update + todo._id, todo).then((res) => {
            if (res.status == 200) {
                this.getTodos();
            }
        });
    }
    handleKeyPress(todo, e) {
        if (e.key === 'Enter') {
            if (e.target.value == 'go to admin mode') {
                window.localStorage.setItem('admin', true);
                this.setState({
                    admin: true,
                    newTodo: {
                        name: '',
                        status: 'pending'
                    },
                });
                return false;
            }
            if (e.target.value == 'exit admin mode') {
                window.localStorage.setItem('admin', '');
                this.setState({
                    admin: false,
                    newTodo: {
                        name: '',
                        status: 'pending'
                    },
                });
                return false;
            }
            if (todo != 'add') {
                this.updateTodo(todo);
            } else {
                this.submitTodo();
            }
        }
    }
    handleChange(e) {
        this.setState({
            newTodo: {
                name: e.target.value,
                status: 'pending'
            }
        });  
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
        axios.put(this.state.api.update + todo._id, todo).then((res) => {
            if (res.status == 200) {
                this.setState({
                    todos: todos
                });
            }
        });
    }
    handleRemove(idx, id) {
        let todos = this.state.todos;
        todos.splice(idx, 1);
        axios.delete(this.state.api.remove + id).then((res) => {
            if (res.status == 200) {
                this.setState({
                    todos: todos
                });
            }
        });
    }
    setFilter(filter) {
        this.setState({
            filter: filter
        });
    }
    getStatus(todo) {
        return 'todo ' + todo.status;
    }
    render() {
        const {admin, todos, newTodo, loading, filter} = this.state;
        let todosFilter = todos;
        if (filter != 'all') {
            todosFilter = todos.filter(todo => todo.status == filter);
        }
        const todoList = todosFilter.map((todo, idx) => 
                        <CSSTransition key={todo._id} timeout={500} classNames="todoAnimation">
                        <div className={this.getStatus(todo)}>
                            {admin ?
                            <input className="todo__title" value={todo.name} onChange={this.handleUpdate.bind(this, idx)} onKeyPress={this.handleKeyPress.bind(this, todo)} />
                            :
                                <div className="todo__title">{todo.name}</div>
                            }
                            {todo.status != 'done' && admin ?
                            <div className="todo__actions">
                                <div className="todo__complete" onClick={this.handleComplete.bind(this, idx)}>{todo.status == 'pending' ? 'Working' : 'Done'}</div>
                                <div className="todo__remove" onClick={this.handleRemove.bind(this, idx, todo._id)}>Remove</div>
                            </div>
                            :null}
                        </div>
                        </CSSTransition>
                    );
        return (
            <div className="container">
                <h2 className="todos__title">Todo List</h2>
                <div className="todos__container">
                    <input placeholder="Add New Todo" id="todoName" value={newTodo.name} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this, 'add')} />
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
                </div>
            </div>
        );
    }
}