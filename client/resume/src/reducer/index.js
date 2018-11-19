import { combineReducers } from 'redux';
import characters from './characters';
import projects from './projects';
import experiences from './experiences.js';
import skills from './skills.js';
import todos from './todos.js';

export default combineReducers({
    projects,
    experiences,
    skills,
    todos,
    characters
});