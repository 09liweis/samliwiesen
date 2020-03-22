import React from 'react';
import { connect,useSelector,useDispatch } from 'react-redux';

import Experiences from '../components/home/Experiences.jsx';
import Skills from '../components/home/Skills.jsx';
import Projects from '../components/home/Projects.jsx';

import '../css/resume.css';
// const Home  = ({characters}) => 
const Home = () => {
	const dispatch = useDispatch();
	return (
		<div className="home">
			<Experiences />
			<Projects />
			<Skills />
		</div>
	);
};
export default Home;
// const mapStateToProps = ({characters}) => ({
//   characters
// });

// export default connect(mapStateToProps)(Home);