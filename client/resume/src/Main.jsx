import React,{ Suspense, lazy } from 'react';
import { HashRouter, Switch, Route, browserHistory  } from 'react-router-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { getCharacters } from './reducer/characters/actions';


import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';

// import Transactions from './pages/Transactions.jsx';
// import Clock from './pages/Clock.jsx';
// import MusicPlayer from './pages/MusicPlayer.jsx';
import Home from './pages/Home.jsx';
import Todo from './pages/Todo.jsx';
import Movies from './pages/Movies.jsx';
import Movie from './pages/Movie.jsx';
import Blogs from './pages/Blogs.jsx';
import Comments from './pages/Comments.jsx';
// const Home = lazy(() => require('./pages/Home.jsx'));
// const Movies = lazy(() => require('./pages/Movies.jsx'));
// const Todo = lazy(() => require('./pages/Todo.jsx'));
// const Blogs = lazy(() => require('./pages/Blogs.jsx'));
// const Comments = lazy(() => require('./pages/Comments.jsx'));

const store = createStore(reducer, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.dispatch(getCharacters());

export default class Main extends React.Component {
	render() {
		return ([
			<Header key="header" />,
			<Provider store={store} key="provider">
				<HashRouter key="page">
					<Suspense fallback={<div>Loading...</div>}>
					<div>
						<Nav key="nav" />
						<Route exact path='/' component={Home} />
						<Route path='/todo' component={Todo} />
						<Route path='/movies' component={Movies} />
						<Route path='/movie/:id' component={Movie} />
						<Route path='/blogs' component={Blogs} />
						<Route path='/comments' component={Comments} />
					</div>
					</Suspense>
				</HashRouter>
			</Provider>,
			<Footer key="footer" />
		]);
	}
}