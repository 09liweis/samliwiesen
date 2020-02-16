import React from 'react';
import { connect } from 'react-redux';

import Experiences from '../components/home/Experiences.jsx';
import Skills from '../components/home/Skills.jsx';
import Projects from '../components/home/Projects.jsx';
import Clock from '../components/Clock.jsx';
import Weather from '../components/Weather.jsx';

import '../css/resume.css';

const Home  = ({characters}) => 
	<div className="container home">
		<aside id="aside">
			<Clock/>
			<Weather/>
		</aside>
		<main id="main">
			<Experiences />
			<Projects />
			<Skills />
		</main>
	</div>;
    
const mapStateToProps = ({characters}) => ({
  characters
});

export default connect(mapStateToProps)(Home);