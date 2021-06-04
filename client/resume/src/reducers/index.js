import { combineReducers } from 'redux';
import characters from './characters';
import projects from './projects';
import experiences from './experiences.js';
import blogs from './blogs.js';
import skills from './skills.js';
import todos from './todos.js';
import movies from './movies.js';
import videos from './videos.js';

export default combineReducers({
  blogs,
  projects,
  experiences,
  skills,
  todos,
  characters,
  movies,
  videos
});