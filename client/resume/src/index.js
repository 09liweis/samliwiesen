import React from 'react';
import {render} from 'react-dom';
import Main from './Main.jsx';
import './backgroundCanvas.js';

const root = document.getElementById('root');
render(<Main />,root);
root.classList.remove('root');