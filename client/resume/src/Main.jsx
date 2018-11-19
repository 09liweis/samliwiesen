import React from 'react';
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

import Home from './pages/Home.jsx';
import MusicPlayer from './pages/MusicPlayer.jsx';
import Todo from './pages/Todo.jsx';
import Transaction from './pages/Transaction.jsx';
import Clock from './pages/Clock.jsx';
import Movies from './pages/Movies.jsx';
import Blogs from './pages/Blogs.jsx';
import Comments from './pages/Comments.jsx';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.dispatch(getCharacters());

export default class Main extends React.Component {
    render() {
        return ([
                <Header key="header" />,
                <Nav key="nav" />,
                <Provider store={store} key="provider">
                    <HashRouter key="page">
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/todo' component={Todo} />
                            <Route path='/movies' component={Movies} />
                            <Route path='/blogs' component={Blogs} />
                            <Route path='/comments' component={Comments} />
                            <Route path='/clock' component={Clock} />
                            <Route path='/transactions' component={Transaction} />
                            <Route path='/musicplayer' component={MusicPlayer} />
                        </Switch>
                    </HashRouter>
                </Provider>,
                <Footer key="footer" />
            ]
        );
    }
}