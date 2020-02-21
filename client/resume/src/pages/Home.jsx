import React from 'react';
import { connect } from 'react-redux';

import Experiences from '../components/home/Experiences.jsx';
import Skills from '../components/home/Skills.jsx';
import Projects from '../components/home/Projects.jsx';

import '../css/resume.css';

const Home  = ({characters}) => 
	<div className="home">
		<Experiences />
		<Projects />
		<Skills />
	</div>;
    
const mapStateToProps = ({characters}) => ({
  characters
});

export default connect(mapStateToProps)(Home);