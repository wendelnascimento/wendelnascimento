import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import ScrollOnClick from './assets/lib/ScrollOnClick';
//import fontAwesome from '../../node_modules/font-awesome/scss/font-awesome.scss';
import canvasLines from './assets/lib/canvasLines';

let introCanvas = new canvasLines(window.innerWidth, window.innerHeight, '#intro', '#canvas-lines', '2d', null, true);

// canvasLines();
introCanvas.initContainer();
introCanvas.initAnimation();
introCanvas.addListeners();

let scroller = new ScrollOnClick('.scroll');
scroller.init();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
