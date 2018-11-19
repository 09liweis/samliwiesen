import React from 'react';
import '../css/header.css';
import Clock from './Clock.jsx';
import Weather from './Weather.jsx';

export default class Header extends React.Component {
    render() {
        return (
            <header id="header">
                <section>
                    Hello I am Sam Li
                </section>
                <Clock />
                <Weather />
            </header>
        );
    }
}